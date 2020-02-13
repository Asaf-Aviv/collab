import { Collab } from '../../db/models/Collab'
import { Resolvers } from '../types'
import { User } from '../../db/models/User'

const collabResolver: Resolvers = {
  Query: {
    collabs: () => Collab.findAll(),
  },
  Mutation: {
    createCollab: async (root, { collab, userId }) => Collab.createCollab(collab, userId),
    deleteCollab: (root, { id }) => Collab.deleteCollab(id),
  },
  Collab: {
    owner: ({ ownerId }) => User.findByPk(ownerId, { raw: true }) as Promise<User>,
  },
}

export default collabResolver
