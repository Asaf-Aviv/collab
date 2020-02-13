import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })
