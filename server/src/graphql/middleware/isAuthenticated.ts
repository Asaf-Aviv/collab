import { CollabContext } from './../context/CollabContext'
import { rule } from 'graphql-shield'

export const isAuthenticated = rule({
  cache: 'contextual',
})((root, args, { user }: CollabContext) => Boolean(user))
