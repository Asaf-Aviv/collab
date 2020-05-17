import { and } from 'graphql-shield'
import { Op } from 'sequelize'
import { generateToken } from '../../utils/index'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { Resolvers, ResolversTypes, Maybe } from '../types'

export const userResolver: Resolvers = {
  Query: {
    users: (root, args, { models }) => models.User.findAll(),
    user: (root, { id }, { loaders }) => loaders.userLoader.load(id),
    currentUser: (root, args, { user }) =>
      user as Maybe<ResolversTypes['currentUser']>,
  },
  Mutation: {
    signUp: async (root, { credentials }, { models }) => {
      const user = await models.User.createUser(credentials)
      console.log(user)
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
    updateUserInfo: (root, { input }, { user }) => user.update(input),
    sendFriendRequest: (root, { friendId }, { models, user }) =>
      models.UserFriendRequest.createFriendRequest(friendId, user!.id),
    acceptFriendRequest: (root, { friendId }, { models, user }) =>
      models.UserFriend.createFriendship(friendId, user!.id),
    declineFriendRequest: (root, { senderId }, { models, user }) =>
      models.UserFriendRequest.deleteFriendRequest(user!.id, senderId),
    removeFriend: (root, { friendId }, { models, user }) =>
      models.UserFriend.deleteFriendship(friendId, user!.id),
  },
  CurrentUser: {
    friends: async ({ id }, args, { models, user }) => {
      const friends = await models.UserFriend.findAll({
        where: { userId: user!.id },
        include: [{ model: models.User, as: 'friend' }],
      })

      console.log(friends)
      return friends.map(f => f.friend)
    },
    conversationsPreview: ({ id }, args, { models }) =>
      models.PrivateMessage.getConversationsPreview(id),
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
    collabRequests: async ({ id }, args, { models, loaders }) => {
      const requests = await models.CollabMemberRequest.findAll({
        where: { type: 'request' },
        include: [
          { model: models.User },
          { model: models.Collab, where: { ownerId: id } },
        ],
        raw: true,
      })

      console.log(requests)
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
