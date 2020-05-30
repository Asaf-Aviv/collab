import { models } from '../../db/models'

const formatNewFriendNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  const friend = await models.User.findByPk(notification.friendId)

  if (!friend) {
    throw new Error('Friend not found')
  }

  return {
    ...notification,
    url: `/user/${friend.id}`,
    body: `You and ${friend.username} are now friends!`,
    title: 'New Friend',
  }
}

export const formatNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  switch (notification.type) {
    case 'NEW_FRIEND':
      return formatNewFriendNotification(notification)
    default:
      throw new Error(`Unknown notification type ${notification.type}`)
  }
}
