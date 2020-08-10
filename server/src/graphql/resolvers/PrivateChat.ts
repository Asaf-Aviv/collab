import IORedis from 'ioredis'
import { and } from 'graphql-shield'
import { v1 as uuid } from 'uuid'
import { withFilter } from 'apollo-server-express'
import { pubsub } from '../helpers/pubsub'
import { Resolvers, UserChatStatus } from '../types.d'
import { isNotNull, withCancel } from '../../helpers/helpers'
import { REDIS_CHAT_USERS } from '../../redis/redis'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { User } from '../../db/models/User'

const NEW_PRIVATE_CHAT_MESSAGE = 'NEW_PRIVATE_CHAT_MESSAGE'
const FRIEND_STATUS_CHANGE = 'FRIEND_STATUS_CHANGE'

const notifyChatUsersOnStatusChange = (
  user: User,
  status: UserChatStatus,
  redis: IORedis.Redis,
) => {
  User.getAllUserFriends(user.id).then(friends => {
    friends.forEach(async friend => {
      const friendStatus = await redis.hget(REDIS_CHAT_USERS, friend.id)

      if (friendStatus === null) return

      pubsub.publish(FRIEND_STATUS_CHANGE, {
        recipientId: friend.id,
        friendStatusChange: {
          user,
          status,
        },
      })
    })
  })
}

export const privateChatResolver: Resolvers = {
  Query: {
    onlineChatFriends: async (root, args, { user, models, redis }) => {
      await redis.hset(REDIS_CHAT_USERS, user!.id, 'ONLINE')

      const allFriends = await models.User.getAllUserFriends(user!.id)

      const allFriendStatuses = await Promise.all(
        allFriends.map(async friend => {
          const friendStatus = await redis.hget(REDIS_CHAT_USERS, friend.id)

          if (!friendStatus) return null

          pubsub.publish(FRIEND_STATUS_CHANGE, {
            recipientId: friend.id,
            friendStatusChange: {
              user,
              status: 'ONLINE',
            },
          })

          return friendStatus === 'OFFLINE'
            ? null
            : { user: friend, status: friendStatus as UserChatStatus }
        }),
      )

      const users = allFriendStatuses.filter(isNotNull)
      return { users }
    },
  },
  Mutation: {
    updateStatus: async (root, { status }, { models, redis, user }) => {
      await redis.hset(REDIS_CHAT_USERS, user!.id, status)

      models.User.getAllUserFriends(user!.id).then(friends => {
        friends.map(async friend => {
          const friendStatus = await redis.hget(REDIS_CHAT_USERS, friend.id)

          if (friendStatus && friendStatus !== 'OFFLINE') {
            pubsub.publish(FRIEND_STATUS_CHANGE, {
              recipientId: friend.id,
              friendStatusChange: {
                user,
                status,
              },
            })
          }
        })
      })

      return true
    },
    sendPrivateChatMessage: (root, { input }, { user }) => {
      const { recipientId, content } = input

      const message = {
        id: uuid(),
        authorId: user!.id,
        content,
        creationDate: new Date(),
      }

      pubsub.publish(NEW_PRIVATE_CHAT_MESSAGE, {
        recipientId,
        newPrivateChatMessage: message,
      })

      return message
    },
  },
  Subscription: {
    newPrivateChatMessage: {
      subscribe: (root, args, { redis, user }) => {
        const subscriptionFilter = withFilter(
          () => pubsub.asyncIterator(NEW_PRIVATE_CHAT_MESSAGE),
          ({ recipientId }) => recipientId === user!.id,
        )

        return withCancel(subscriptionFilter(), () => {
          redis
            .hdel(REDIS_CHAT_USERS, user!.id)
            .catch(err => {
              console.error('Deleting connected chat user error', err)
            })
            .finally(() => {
              notifyChatUsersOnStatusChange(user!, 'OFFLINE', redis)
            })
        })
      },
    },
    friendStatusChange: {
      subscribe: (root, args, { user }) =>
        withFilter(
          () => pubsub.asyncIterator(FRIEND_STATUS_CHANGE),
          ({ recipientId }) => recipientId === user!.id,
        )(),
    },
  },
}

export const privateChatMiddleware = {
  Query: {
    onlineChatFriends: and(isAuthenticated),
  },
  Mutation: {
    updateStatus: and(isAuthenticated),
    sendPrivateChatMessage: and(isAuthenticated),
  },
  Subscription: {
    newPrivateChatMessage: and(isAuthenticated),
    friendStatusChange: and(isAuthenticated),
  },
}
