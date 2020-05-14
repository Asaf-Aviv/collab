import { Resolvers } from '../types'
import { Op } from 'sequelize'

export const privateMessageResolver: Resolvers = {
  Query: {
    getConversation: async (
      root,
      { userId, offset, limit },
      { models, user },
    ) => {
      const messages = await models.PrivateMessage.findAll({
        where: {
          [Op.or]: [
            { authorId: userId, recipientId: user!.id },
            { authorId: user!.id, recipientId: userId },
          ],
        },
        offset,
        limit: limit + 1,
      })

      return {
        hasNextPage: messages.length > limit,
        messages: messages.slice(0, limit),
      }
    },
  },
  Mutation: {
    sendPrivateMessage: (root, { input }, { user, models }) =>
      models.PrivateMessage.createMessage(input, user!.id),
    markPrivateMessageAsRead: (root, { messageId }, { user, models }) =>
      models.PrivateMessage.markAsRead(messageId, user!.id),
    deletePrivateMessage: (root, { messageId }, { user, models }) =>
      models.PrivateMessage.deleteMessage(messageId, user!.id),
  },
  PrivateMessage: {
    author: ({ authorId }, args, { loaders }) =>
      authorId ? loaders.userLoader.load(authorId) : null,
    recipient: ({ recipientId }, args, { loaders }) =>
      recipientId ? loaders.userLoader.load(recipientId) : null,
  },
}
