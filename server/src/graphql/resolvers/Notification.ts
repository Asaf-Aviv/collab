import { Resolvers } from '../types'
import { PubSub, withFilter } from 'apollo-server-express'

const NEW_NOTIFICATION = 'NEW_NOTIFICATION'
const pubsub = new PubSub()

setInterval(
  () =>
    pubsub.publish(NEW_NOTIFICATION, {
      newNotification: {
        userId: '6d480813-c854-40fc-a3cf-cea0944854ab',
        id: '1',
        body: 'body',
        type: 'NEW_FRIEND',
        url: 'url',
        isRead: false,
      },
    }),
  5000,
)

export const notificationResolver: Resolvers = {
  Mutation: {},
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
    notifications: async ({ id }, args, { models, loaders }) => {
      const notifications = await models.Notification.findAll({
        where: { userId: id },
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
}
