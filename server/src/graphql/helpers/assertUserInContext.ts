import { CollabContext } from './../context/CollabContext'
import { AuthenticationError } from 'apollo-server-express'
import { User } from '../../db/models/User'

type UserInContext<C> = C & { user: User }

export function assertUserInContext(
  context: CollabContext
): asserts context is UserInContext<CollabContext> {
  if (!context.user) {
    throw new AuthenticationError('Unauthorized')
  }
}
