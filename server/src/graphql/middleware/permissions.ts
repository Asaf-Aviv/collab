import { shield } from 'graphql-shield'
import { collabMiddleware } from './../resolvers/Collab'
import { userMiddleware } from './../resolvers/User'

export const permissions = shield({
  ...userMiddleware,
  ...collabMiddleware,
})
