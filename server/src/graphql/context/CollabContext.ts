import { decodeToken } from './../../utils/index'
import { ApolloServerExpressConfig } from 'apollo-server-express'
import { createLoaders } from '../loaders/loaders'
import { User } from '../../db/models/User'

type Loaders = ReturnType<typeof createLoaders>

export type CollabContext = Loaders & {
  user: User | null
}

export type CollabContextWithUser = Loaders & {
  user: User
}

export const apolloContext: ApolloServerExpressConfig['context'] = async ({ req }) => {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '')
    const { userId } = await decodeToken(token)
    const user = await User.findByPk(userId, { raw: true })
    return {
      ...createLoaders(),
      user,
    }
  } catch (err) {
    return {
      ...createLoaders(),
      user: null,
    }
  }
}
