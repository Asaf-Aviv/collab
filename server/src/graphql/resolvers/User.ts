import { and } from 'graphql-shield'
import { generateToken } from '../../utils/index'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { Resolvers } from '../types'

export const userResolver: Resolvers = {
  Query: {
    users: (root, args, { models }) => models.User.findAll(),
    user: (root, { id }, { loaders }) => loaders.userLoader.load(id),
    currentUser: async (root, args, { user }) => user,
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
    updateUserInfo: (root, { input }, { user }) => user.update(input),
    sendFriendRequest: (root, { friendId }, { models, user }) =>
      models.UserFriendRequest.createFriendRequest(friendId, user!.id),
    acceptFriendRequest: (root, { friendId }, { models, user }) =>
      models.UserFriend.createFriendship(friendId, user!.id),
    declineFriendRequest: (root, { senderId }, { models, user }) =>
      models.UserFriendRequest.deleteFriendRequest(senderId, user!.id),
    removeFriend: (root, { friendId }, { models, user }) =>
      models.UserFriend.deleteFriendship(friendId, user!.id),
  },
  CurrentUser: {
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
    collabRequests: async ({ id }, args, { models }) =>
      models.CollabMemberRequest.findAll({
        where: { type: 'request' },
        include: [
          { model: models.User },
          { model: models.Collab, where: { ownerId: id } },
        ],
      }),
    tasks: ({ id }, args, { models }) =>
      models.CollabTask.findAll({ where: { assigneeId: id } }),
  },
  User: {
    collabs: ({ id }, args, { models }) =>
      models.Collab.findAll({ where: { ownerId: id } }),
  },
}

export const userMiddleware = {
  Mutation: {
    deleteUser: and(isAuthenticated),
    acceptCollabInvitation: and(isAuthenticated),
    declineCollabInvitation: and(isAuthenticated),
  },
}
