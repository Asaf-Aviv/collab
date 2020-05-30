import { withFilter } from 'apollo-server-express'
import { Resolvers } from '../types'
import { pubsub } from '../helpers/pubsub'
import { formatNotification } from '../helpers/formatNotification'

const NEW_NOTIFICATION = 'NEW_NOTIFICATION'

export const notificationResolver: Resolvers = {
  Mutation: {
    markNotificationAsRead: async (
      root,
      { notificationId },
      { user, models },
    ) => {
      const notification = await models.Notification.markAsRead(
        notificationId,
        user!.id,
      )
      return formatNotification(notification)
    },
    markAllNotificationsAsRead: async (root, args, { user, models }) => {
      await models.Notification.update(
        { isRead: true },
        { where: { userId: user!.id } },
      )
      return true
    },
    deleteNotification: (root, { notificationId }, { user, models }) =>
      models.Notification.deleteNotification(notificationId, user!.id),
    deleteAllNotifications: async (root, args, { user, models }) => {
      await models.Notification.destroy({ where: { userId: user!.id } })
      return true
    },
  },
  Subscription: {
    newNotification: {
      subscribe: (root, args, { user }) =>
        withFilter(
          () => pubsub.asyncIterator(NEW_NOTIFICATION),
          ({ newNotification: { userId } }) => userId === user!.id,
        )(),
    },
  },
  CurrentUser: {
    notifications: async ({ id }, args, { models }) => {
      const notifications = await models.Notification.findAll({
        where: { userId: id },
        raw: true,
      })

      return notifications.map(formatNotification)
    },
  },
}
