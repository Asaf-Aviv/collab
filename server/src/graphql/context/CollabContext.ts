import { redis } from '../../redis/redis'
import { ApolloServerExpressConfig } from 'apollo-server-express'
import { models, Models } from '../../db/models/index'
import { decodeToken } from '../../utils/index'
import { createLoaders, Loaders } from '../loaders/loaders'
import { User } from '../../db/models/User'
import { pubsub } from '../helpers/pubsub'

export type CollabContext = {
  loaders: Loaders
  models: Models
  user: User | null
  redis: typeof redis
  pubsub: typeof pubsub
}

export type CollabContextWithRedis = CollabContext & {
  redis: typeof redis
}

export type CollabContextWithUser = CollabContext & {
  user: User
}

export const createContext = () => ({
  models,
  redis,
  loaders: createLoaders(),
  pubsub,
})

export const apolloContext: ApolloServerExpressConfig['context'] = async ({
  req,
  connection,
}) => {
  if (connection) {
    return connection.context
  }

  let user: User | null = null

  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '')
    const { userId } = await decodeToken(token)
    user = await User.findByPk(userId)
    // eslint-disable-next-line no-empty
  } catch (err) {}

  return {
    ...createContext(),
    user,
  }
}
