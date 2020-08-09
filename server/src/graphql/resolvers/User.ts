import { v4 as uuid } from 'uuid'
import { and } from 'graphql-shield'
import { Op } from 'sequelize'
import { withFilter } from 'apollo-server-express'
import path from 'path'
import { promises as fs , createWriteStream } from 'fs'

import { GQLUser } from './../../db/models/User'
import { generateToken } from '../../utils/index'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { Resolvers, ResolversTypes, Maybe } from '../types'
import { formatNotification } from '../helpers/formatNotification'

export const userResolver: Resolvers = {
  Query: {
    users: (root, args, { models }) => models.User.findAll(),
    user: (root, { id }, { loaders }) => loaders.userLoader.load(id),
    currentUser: (root, args, { user }) =>
      user as Maybe<ResolversTypes['currentUser']>,
    searchFriends: async (root, { input }, { user, models }) => {
      const friends = await models.UserFriend.findAll({
        where: { userId: user!.id },
        attributes: ['friend.id', 'friend.avatar', 'friend.username'],
        include: [
          {
            attributes: [],
            model: models.User,
            as: 'friend',
            where: { username: { [Op.like]: `%${input.username}%` } },
          },
        ],
        raw: true,
        limit: 5,
      })

      return (friends as unknown) as GQLUser[]
    },
    searchUsers: async (root, { input }, { user, models }) => {
      const users = await models.User.findAll({
        where: {
          [Op.and]: {
            username: {
              [Op.like]: `%${input.username}%`,
            },
            id: { [Op.ne]: user?.id },
          },
        },
        raw: true,
        limit: 5,
      })

      return (users as unknown) as GQLUser[]
    },
  },
  Mutation: {
    signUp: async (root, { credentials }, { models }) => {
      const user = await models.User.createUser(credentials)
      const token = await generateToken({ userId: user.id })
      return { token }
    },
    login: async (root, { credentials }, { models }) => {
      const user = await models.User.login(credentials)
      const token = await generateToken({ userId: user.id })
      return { token }
    },
    uploadAvatar: async (root, { avatar }, { user }) => {
      const { createReadStream } = await avatar
      const filename = `${uuid()}.jpg`

      return new Promise(res =>
        createReadStream().pipe(
          createWriteStream(
            path.join(__dirname, '../../public/avatars', filename),
          ).on('close', async () => {
            if (user!.avatar) {
              fs.unlink(
                path.resolve(__dirname, `../../public/avatars/${user!.avatar}`),
              ).catch(err => {
                console.error(
                  `Could not delete old avatar ${user!.avatar}`,
                  err,
                )
              })
            }
            const updatedUser = await user!.update({ avatar: filename })
            res(updatedUser as ResolversTypes['currentUser'])
          }),
        ),
      )
    },
    deleteUser: (root, args, { user, models }) =>
      models.User.deleteUser(user.id),
    acceptCollabInvitation: async (
      root,
      { collabId },
      { user, models, pubsub },
    ) => {
      const { User, Notification } = models
      await User.acceptCollabInvitation(collabId, user.id)

      Notification.newCollabMemberNotification(user.id, collabId)
        .then(notifications =>
          Promise.all(notifications.map(formatNotification)),
        )
        .then(notifications => {
          notifications.forEach(newNotification => {
            pubsub.publish('NEW_NOTIFICATION', {
              newNotification,
            })
          })
        })

      return collabId
    },
    declineCollabInvitation: (root, { collabId }, { user, models }) =>
      models.User.declineCollabInvitation(collabId, user.id),
    updateUserInfo: async (root, { input }, { user }) => {
      const updatedUser = await user!.update(input!)
      return updatedUser as ResolversTypes['currentUser']
    },
    sendFriendRequest: async (root, { friendId }, { models, user, pubsub }) => {
      const { UserFriendRequest, Notification, User } = models
      const request = await UserFriendRequest.createFriendRequest(
        friendId,
        user!.id,
      )

      Notification.newFriendRequestNotification(friendId, user!.id, request.id)
        .then(formatNotification)
        .then(notification => {
          pubsub.publish('NEW_NOTIFICATION', {
            newNotification: notification,
          })
        })
        .catch(err => {
          console.error('Could not send newFriendNotification', err)
        })

      pubsub.publish('NEW_FRIEND_REQUEST', {
        recipientId: friendId,
        newFriendRequest: {
          user,
        },
      })

      const friend = await User.findByPk(friendId)
      return friend!
    },
    acceptFriendRequest: async (
      root,
      { friendId },
      { models, user, pubsub },
    ) => {
      const { UserFriend, Notification } = models
      const friendship = await UserFriend.createFriendship(friendId, user!.id)

      Notification.newFriendNotification(friendId, user!.id, friendship.id)
        .then(formatNotification)
        .then(notification => {
          pubsub.publish('NEW_NOTIFICATION', {
            newNotification: notification,
          })
        })
        .catch(err => {
          console.error('Could not send newFriendNotification', err)
        })

      return friendship
    },
    declineFriendRequest: async (root, { senderId }, { models, user }) => {
      const { UserFriendRequest, User } = models

      await UserFriendRequest.deleteFriendRequest(user!.id, senderId)

      const sender = await User.findByPk(senderId)
      return sender!
    },
    removeFriend: async (root, { friendId }, { models, user }) => {
      const { UserFriend, User } = models

      await UserFriend.deleteFriendship(friendId, user!.id)

      const friend = await User.findByPk(friendId)
      return friend!
    },
  },
  Subscription: {
    newFriendRequest: {
      subscribe: (root, args, { user, pubsub }) =>
        withFilter(
          () => pubsub.asyncIterator('NEW_FRIEND_REQUEST'),
          ({ recipientId }) => recipientId === user!.id,
        )(),
    },
  },
  CurrentUser: {
    avatar: ({ avatar }) => (avatar ? `/static/avatars/${avatar}` : null),
    friends: async ({ id }, args, { models }) => {
      const friends = await models.UserFriend.findAll({
        where: { userId: id },
        include: [{ model: models.User, as: 'friend' }],
      })

      return friends.map(f => f.friend)
    },
    conversationsPreview: async ({ id }, args, { models }) => {
      const { PrivateMessage } = models
      const messagesPreview = await PrivateMessage.getConversationsPreview(id)
      return messagesPreview as ResolversTypes['conversationsPreview']
    },
    notificationsCount: ({ id }, args, { models }) =>
      models.Notification.count({
        where: {
          userId: id,
          isRead: false,
        },
      }),
    friendRequestsCount: ({ id }, args, { models }) =>
      models.UserFriendRequest.count({
        where: { receiverId: id },
      }),
    friendRequests: async ({ id }, args, { models }) => {
      const requests = await models.UserFriendRequest.findAll({
        where: { receiverId: id },
        include: [{ model: models.User, as: 'sender' }],
      })
      return requests.map(request => request.sender)
    },
    collabs: ({ id }, args, { models }) =>
      models.Collab.findAll({
        include: [
          {
            attributes: [],
            model: models.CollabMember,
            where: { memberId: id },
          },
        ],
      }),
    collabInvites: ({ id }, args, { models }) =>
      models.Collab.findAll({
        include: [
          {
            where: { memberId: id, type: 'invitation' },
            attributes: [],
            model: models.CollabMemberRequest,
            as: 'pendingInvites',
          },
        ],
      }),
    collabRequests: async ({ id }, args, { models }) => {
      const requests = await models.CollabMemberRequest.findAll({
        where: { type: 'request' },
        include: [
          { model: models.User },
          { model: models.Collab, where: { ownerId: id } },
        ],
      })

      return requests
    },
    tasks: ({ id }, args, { models }) =>
      models.CollabTask.findAll({ where: { assigneeId: id } }),
  },
  User: {
    avatar: ({ avatar }) => (avatar ? `/static/avatars/${avatar}` : null),
    collabs: ({ id }, args, { models }) =>
      models.Collab.findAll({ where: { ownerId: id } }),
    isFriend: async ({ id }, args, { models, user }) => {
      if (user?.id) {
        const areFriends = await models.UserFriend.count({
          where: { userId: user.id, friendId: id },
        })
        return Boolean(areFriends)
      }
      return false
    },
    isSelf: ({ id }, args, { user }) => user?.id === id,
    canRequestFriendship: async ({ id }, args, { models, user }) => {
      if (!user || user?.id === id) return false

      const friendRequest = await models.UserFriendRequest.findOne({
        where: {
          [Op.or]: [
            { senderId: user.id, receiverId: id },
            { senderId: id, receiverId: user.id },
          ],
        },
      })

      return !friendRequest
    },
  },
}

export const userMiddleware = {
  Mutation: {
    deleteUser: and(isAuthenticated),
    acceptCollabInvitation: and(isAuthenticated),
    declineCollabInvitation: and(isAuthenticated),
  },
}
