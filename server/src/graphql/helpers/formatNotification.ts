import { models } from '../../db/models'

const formatNewFriendNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  const friend = await models.User.findByPk(notification.newFriendId)

  if (!friend) {
    throw new Error('Friend not found')
  }

  return {
    ...notification,
    url: `/user/${friend.id}`,
    message: `You and ${friend.username} are now friends!`,
    title: 'New Friend',
  }
}

const formatFriendRequestNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  const friendRequester = await models.User.findByPk(
    notification.friendRequesterId,
  )

  if (!friendRequester) {
    throw new Error('Friend requester not found')
  }

  return {
    ...notification,
    url: `/user/${friendRequester.id}`,
    message: `${friendRequester.username} sent you a friend request!`,
    title: 'New Friend Request',
  }
}

export const formatNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  switch (notification.type) {
    case 'NEW_FRIEND':
      return formatNewFriendNotification(notification)
    case 'FRIEND_REQUEST':
      return formatFriendRequestNotification(notification)
    default:
      throw new Error(`Unknown notification type ${notification.type}`)
  }
}
