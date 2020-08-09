import { rule } from 'graphql-shield'
import { CollabContext } from './../context/CollabContext'

export const isAuthenticated = rule({
  cache: 'contextual',
})((root, args, { user }: CollabContext) => Boolean(user))
