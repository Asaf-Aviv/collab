import { Op } from 'sequelize'
import { Resolvers } from '../types'
import { formatNotification } from '../helpers/formatNotification'

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
    sendPrivateMessage: async (root, { input }, { user, models, pubsub }) => {
      const { PrivateMessage, Notification } = models
      const message = await PrivateMessage.createMessage(input, user!.id)

      Notification.newPrivateMessageNotification(input.recipientId, message.id)
        .then(formatNotification)
        .then(newNotification => {
          pubsub.publish('NEW_NOTIFICATION', {
            newNotification,
          })
        })

      return message
    },
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
