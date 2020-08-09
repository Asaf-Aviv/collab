import { and } from 'graphql-shield'
import { Resolvers } from '../types'
import { isAuthenticated } from '../middleware/isAuthenticated'

export const collabWallMessageResolver: Resolvers = {
  Query: {
    collabWallMessages: (root, { input }, { models }) =>
      models.CollabWallMessage.getMessages(input),
  },
  Mutation: {
    createWallMessage: (root, { input }, { user, models }) =>
      models.CollabWallMessage.createMessage(input, user!.id),
    deleteWallMessage: (root, { messageId }, { user, models }) =>
      models.CollabWallMessage.deleteMessage(messageId, user!.id),
  },
  WallMessage: {
    author: async ({ authorId }, args, { loaders }) => {
      const user = await loaders.userLoader.load(authorId)
      return user!
    },
    isAuthor: ({ authorId }, args, { user }) => user?.id === authorId,
  },
}

export const collabWallMessageMiddleware = {
  Mutation: {
    createWallMessage: and(isAuthenticated),
    deleteWallMessage: and(isAuthenticated),
  },
}
