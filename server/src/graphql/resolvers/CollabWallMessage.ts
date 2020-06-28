import { Resolvers } from '../types'

export const collabWallMessageResolver: Resolvers = {
  Query: {
    collabWallMessages: (root, { input }, { user, models }) =>
      models.CollabWallMessage.getMessages(input, user!.id),
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
