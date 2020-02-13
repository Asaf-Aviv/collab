import { generateToken, decodeToken } from '../../utils/index'
import { User as UserModel } from '../../db/models/User'
import { Collab } from '../../db/models/Collab'
import { Resolvers } from '../types'

const userResolver: Resolvers = {
  Query: {
    users: () => UserModel.findAll(),
  },
  Mutation: {
    signUp: (root, { credentials }) => UserModel.createUser(credentials),
    login: async (root, { credentials }) => {
      const user = await UserModel.login(credentials)
      const token = await generateToken({ userId: user.id })
      const decoded = await decodeToken(token)
      console.log(token)
      console.log(decoded)
      return { user, token }
    },
    deleteUser: (root, { id }) => UserModel.deleteUser(id),
  },
  User: {
    collabs: ({ id }) => Collab.findAll({ where: { ownerId: id } }),
  },
}

export default userResolver
