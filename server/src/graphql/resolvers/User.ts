import { and } from 'graphql-shield'
import { Op } from 'sequelize'
import { generateToken } from '../../utils/index'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { Resolvers, ResolversTypes, Maybe } from '../types'
import { formatNotification } from '../helpers/formatNotification'
import { pubsub } from '../helpers/pubsub'
import { GQLUser } from '../../db/models/User'
import { withFilter } from 'apollo-server-express'

// setInterval(() => {
//   pubsub.publish('NEW_NOTIFICATION', {
//     newNotification: {
//       id: '1',
//       type: 'NEW_FRIEND',
//       userId: '6d480813-c854-40fc-a3cf-cea0944854ab',
//       title: 'New Friend',
//       url: 'h',
//       body: 'You and Him are now friends!',
//       isRead: false,
//       creationDate: '1',
//     },
//   })
// }, 5000)

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
  },
  Mutation: {
    signUp: async (root, { credentials }, { models }) => {
      const user = await models.User.createUser(credentials)
      const token = await generateToken({ userId: user.id })
      return { user, token }
    },
    login: async (root, { credentials }, { models }) => {
      const user = await models.User.login(credentials)
      const token = await generateToken({ userId: user.id })
      return { user, token }
    },
    deleteUser: (root, args, { user, models }) =>
      models.User.deleteUser(user.id),
    acceptCollabInvitation: (root, { collabId }, { user, models }) =>
      models.User.acceptCollabInvitation(collabId, user.id),
    declineCollabInvitation: (root, { collabId }, { user, models }) =>
      models.User.declineCollabInvitation(collabId, user.id),
    updateUserInfo: (root, { input }, { user }) => user!.update(input!),
    sendFriendRequest: async (root, { friendId }, { models, user, pubsub }) => {
      const { UserFriendRequest, Notification } = models
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

      return true
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
    declineFriendRequest: (root, { senderId }, { models, user }) =>
      models.UserFriendRequest.deleteFriendRequest(user!.id, senderId),
    removeFriend: (root, { friendId }, { models, user }) =>
      models.UserFriend.deleteFriendship(friendId, user!.id),
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
    friends: async ({ id }, args, { models }) => {
      const friends = await models.UserFriend.findAll({
        where: { userId: id },
        include: [{ model: models.User, as: 'friend' }],
      })

      console.log(friends)
      return friends.map(f => f.friend)
    },
    conversationsPreview: ({ id }, args, { models }) =>
      models.PrivateMessage.getConversationsPreview(id),
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
    canRequestFriendship: async ({ id }, args, { models, user }) => {
      if (!user) return true
      if (user.id === id) return false

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
  // CollabRequest: {
  //   member: {},
  //   collab:: {}
  // },
}

export const userMiddleware = {
  Mutation: {
    deleteUser: and(isAuthenticated),
    acceptCollabInvitation: and(isAuthenticated),
    declineCollabInvitation: and(isAuthenticated),
  },
}
