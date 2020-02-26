import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import { decodeToken } from './utils'
import { User } from './db/models/User'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      const token = (req.headers.authorization || '').replace('Bearer ', '')
      console.log(token)
      const { userId } = await decodeToken(token)
      const user = await User.findByPk(userId)
      return { user }
    } catch (err) {
      return { user: null }
    }
  },
})

server.applyMiddleware({ app })
