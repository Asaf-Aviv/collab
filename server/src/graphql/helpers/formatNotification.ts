import { models } from '../../db/models'
import { Notification } from '../types'

const formatNewFriendNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  const friend = await models.User.findByPk(notification.newFriendId)

  if (!friend) {
    throw new Error('Friend not found')
  }

  return {
    ...notification,
    title: 'New Friend',
    url: `/user/${friend.id}`,
    message: `You and ${friend.username} are now friends!`,
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
    title: 'New Friend Request',
    url: `/user/${friendRequester.id}`,
    message: `${friendRequester.username} sent you a friend request!`,
  }
}

const formatCollabPostReactionNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  const post = await models.CollabPost.findByPk(notification.postId, {
    attributes: ['title'],
  })

  if (!post) {
    throw new Error('Post not found')
  }

  const reaction = await models.CollabPostReaction.findByPk(
    notification.reactionId,
    {
      include: [models.User],
    },
  )

  if (!reaction) {
    throw new Error('Reaction not found')
  }

  return {
    ...notification,
    title: 'New Post Reaction',
    url: `/post/${post.id}`,
    message: `${reaction.user.username} reacted to your post ${post.title}`,
  }
}

const formatCollabPostCommentNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  const post = await models.CollabPost.findByPk(notification.postId, {
    attributes: ['title'],
  })

  if (!post) {
    throw new Error('Post not found')
  }

  const reaction = await models.CollabPostReaction.findByPk(
    notification.reactionId,
    {
      include: [models.User],
    },
  )

  if (!reaction) {
    throw new Error('Reaction not found')
  }

  return {
    ...notification,
    title: 'New Post Reaction',
    url: `/post/${post.id}`,
    message: `${reaction.user.username} reacted to your post ${post.title}`,
  }
}

export const formatNotification = async (
  notification: InstanceType<typeof models.Notification>,
): Promise<Notification> => {
  switch (notification.type) {
    case 'NEW_FRIEND':
      return formatNewFriendNotification(notification)
    case 'NEW_FRIEND_REQUEST':
      return formatFriendRequestNotification(notification)
    case 'COLLAB_POST_REACTION':
      return formatCollabPostReactionNotification(notification)
    case 'COLLAB_POST_COMMENT':
      return formatCollabPostCommentNotification(notification)
    default:
      throw new Error(`Unknown notification type ${notification.type}`)
  }
}
