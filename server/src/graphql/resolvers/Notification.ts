import { Resolvers } from '../types'

export const notificationResolver: Resolvers = {
  Mutation: {},
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
