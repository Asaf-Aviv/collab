import { CollabMemberRequest } from '../../db/models/CollabMemberRequest'
import { generateToken } from '../../utils/index'
import { User as UserModel } from '../../db/models/User'
import { Collab } from '../../db/models/Collab'
import { Resolvers } from '../types'

const userResolver: Resolvers = {
  Query: {
    users: () => UserModel.findAll(),
    user: (parent, { id }, { userLoader }) => userLoader.load(id),
  },
  Mutation: {
    signUp: (root, { credentials }) => UserModel.createUser(credentials),
    login: async (root, { credentials }) => {
      const user = await UserModel.login(credentials)
      const token = await generateToken({ userId: user.id })
      return { user, token }
    },
    deleteUser: (root, { id }) => UserModel.deleteUser(id),
    acceptCollabInvite: (root, { collabId }, context) =>
      UserModel.acceptCollabInvite(collabId, context.get('id')),
    declineCollabInvite: (root, { collabId }, context) =>
      UserModel.declineCollabInvite(collabId, context.get('id')),
  },
  User: {
    collabs: ({ id }) => Collab.findAll({ where: { ownerId: id } }),
    collabInvites: async ({ id }) => {
      const collabs = await CollabMemberRequest.findAll({
        where: { memberId: id },
        attributes: [],
        include: [Collab],
      })
      return collabs.map(({ collab }) => collab)
    },
    collabRequests: async ({ id }) => {
      const collabRequests = await CollabMemberRequest.findAll({
        where: { type: 'request' },
        include: [
          { model: UserModel }, //
          { model: Collab, where: { ownerId: id } },
        ],
      })

      return collabRequests
    },
  },
}

export default userResolver
