import express from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'
import typeDefs from './graphql/typeDefs'
import { apolloContext } from './graphql/context/CollabContext'
import { permissions } from './graphql/middleware/permissions'
import resolvers from './graphql/resolvers'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions,
)

const server = new ApolloServer({
  schema,
  context: apolloContext,
})

server.applyMiddleware({ app })
