import { Op } from 'sequelize'
import { PubSub, withFilter } from 'apollo-server-express'
import uuid from 'uuid/v1'
import { Resolvers, UserChatStatus } from '../types.d'
import { isNotNull, withCancel } from '../../helpers/helpers'
import { REDIS_CHAT_USERS } from '../../redis/redis'
import _ from 'lodash'

const pubsub = new PubSub()

const NEW_PRIVATE_CHAT_MESSAGE = 'NEW_PRIVATE_CHAT_MESSAGE'
const FRIEND_STATUS_CHANGE = 'FRIEND_STATUS_CHANGE'

export const privateChatResolver: Resolvers = {
  Mutation: {
    connectToChat: async (root, { status }, { user, models, redis }) => {
      await redis.hset(REDIS_CHAT_USERS, user!.id, status)

      const allFriends = await models.User.getAllUserFriends(user!.id)

      const allFriendStatuses = await Promise.all(
        allFriends.map(async friend => {
          const friendStatus = await redis.hget(REDIS_CHAT_USERS, friend.id)

          if (!friendStatus) return null

          pubsub.publish(FRIEND_STATUS_CHANGE, {
            recipientId: friend.id,
            friendStatusChange: {
              user,
              status,
            },
          })

          return friendStatus === 'OFFLINE'
            ? null
            : { user: friend, status: friendStatus as UserChatStatus }
        }),
      )

      const users = allFriendStatuses.filter(isNotNull)

      return {
        users: allFriends.map(f => ({
          user: f,
          status: _.sample(['ONLINE', 'AWAY', 'DND', 'OFFLINE']),
        })),
      }
      return { users }
    },
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
        // console.log(user)

        const subscriptionFilter = withFilter(
          () => pubsub.asyncIterator(NEW_PRIVATE_CHAT_MESSAGE),
          ({ recipientId }) => recipientId === user!.id,
        )

        return withCancel(subscriptionFilter(), () => console.log('cancel'))
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
