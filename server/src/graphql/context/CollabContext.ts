import { createLoaders } from '../loaders/loaders'
import { User } from '../../db/models/User'

type Loaders = ReturnType<typeof createLoaders>

export type CollabContext = Loaders & {
  user: User | null
}

export type CollabContextWithUser = Loaders & {
  user: User
}
