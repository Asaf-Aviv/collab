import { CollabContext } from './../context/CollabContext'
import { rule } from 'graphql-shield'

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (root, args, ctx: CollabContext) => {
    return ctx.user !== null
  }
)
