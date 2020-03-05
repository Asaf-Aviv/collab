import { and } from 'graphql-shield'
import { CollabMemberRequest } from '../../db/models/CollabMemberRequest'
import { generateToken } from '../../utils/index'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { User as UserModel } from '../../db/models/User'
import { Collab } from '../../db/models/Collab'
import { Resolvers } from '../types'

export const userResolver: Resolvers = {
  Query: {
    users: () => UserModel.findAll(),
    user: (root, { id }, { loaders }) => loaders.userLoader.load(id),
    currentUser: async (root, args, { user }) => user,
  },
  Mutation: {
    signUp: async (root, { credentials }) => {
      const user = await UserModel.createUser(credentials)
      const token = await generateToken({ userId: user.id })
      return { user, token }
    },
    login: async (root, { credentials }) => {
      const user = await UserModel.login(credentials)
      const token = await generateToken({ userId: user.id })
      return { user, token }
    },
    deleteUser: (root, args, { user }) => UserModel.deleteUser(user.get('id')),
    acceptCollabInvite: (root, { collabId }, { user }) =>
      UserModel.acceptCollabInvite(collabId, user.get('id')),
    declineCollabInvite: (root, { collabId }, { user }) =>
      UserModel.declineCollabInvite(collabId, user.get('id')),
  },
  CurrentUser: {
    collabs: ({ id }, args, { models }) =>
      models.Collab.findAll({ where: { ownerId: id } }),
    collabInvites: async ({ id }) => {
      const collabs = await CollabMemberRequest.findAll({
        where: { memberId: id, type: 'invitation' },
        attributes: [],
        include: [Collab],
      })
      return collabs.map(({ collab }) => collab)
    },
    collabRequests: async ({ id }, args, { models }) =>
      models.CollabMemberRequest.findAll({
        where: { memberid: id, type: 'request' },
        include: [
          { model: UserModel }, //
          { model: Collab, where: { ownerId: id } },
        ],
      }),
  },
  User: {
    collabs: ({ id }, args, { models }) =>
      models.Collab.findAll({ where: { ownerId: id } }),
  },
}

export const userMiddleware = {
  Mutation: {
    deleteUser: and(isAuthenticated),
    acceptCollabInvite: and(isAuthenticated),
    declineCollabInvite: and(isAuthenticated),
  },
}
