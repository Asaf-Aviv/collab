import { ApolloServerExpressConfig } from 'apollo-server-express'
import { models, Models } from '../../db/models/index'
import { decodeToken } from '../../utils/index'
import { createLoaders, Loaders } from '../loaders/loaders'
import { User } from '../../db/models/User'

export type CollabContext = {
  loaders: Loaders
  models: Models
  user: User | null
}

export type CollabContextWithUser = CollabContext & {
  user: User
}

export const apolloContext: ApolloServerExpressConfig['context'] = async ({
  req,
}) => {
  let user: User | null = null

  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '')
    const { userId } = await decodeToken(token)
    user = await User.findByPk(userId)
    // eslint-disable-next-line no-empty
  } catch (err) {}

  return {
    loaders: createLoaders(),
    models,
    user,
  }
}
