import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import { decodeToken } from './utils'
import { User } from './db/models/User'
import { createLoaders } from './graphql/loaders/loaders'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      const token = (req.headers.authorization || '').replace('Bearer ', '')
      const { userId } = await decodeToken(token)
      const user = await User.findByPk(userId)
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
  },
})

server.applyMiddleware({ app })
