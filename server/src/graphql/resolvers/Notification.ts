import { withFilter } from 'apollo-server-express'
import { Resolvers } from '../types'
import { pubsub } from '../helpers/pubsub'

const NEW_NOTIFICATION = 'NEW_NOTIFICATION'

export const notificationResolver: Resolvers = {
  Mutation: {},
  Subscription: {
    newNotification: {
      subscribe: (root, args, { user }) =>
        withFilter(
          () => pubsub.asyncIterator(NEW_NOTIFICATION),
          ({ newNotification: { userId } }) => {
            console.log('checking', userId, user?.id)
            console.log(userId === user!.id)
            return true
          },
        )(),
    },
  },
  CurrentUser: {
    notifications: async ({ id }, args, { models, loaders }) => {
      const notifications = await models.Notification.findAll({
        where: { userId: id },
        raw: true,
      })

      const formatted = await Promise.all(
        notifications.map(async notification => {
          let body: string
          let url: string

          if (notification.type === 'NEW_FRIEND') {
            const friend = await loaders.userLoader.load(notification.friendId)

            if (!friend) {
              throw new Error('Friend not found')
            }

            body = `${friend.username} accepted your friend request`
            url = `/user/${friend.id}`
          } else {
            throw new Error(`Unhandled notification type ${notification.type}`)
          }

          return {
            ...notification,
            body,
            url,
          }
        }),
      )

      return formatted
    },
  },
  Notification: {
    title: ({ type }) => {
      switch (type) {
        case 'NEW_FRIEND':
          return 'New Friend'
        default:
          throw new Error(`Unknown Notification type ${type}`)
      }
    },
  },
}
