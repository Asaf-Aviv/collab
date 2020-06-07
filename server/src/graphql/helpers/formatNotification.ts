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
    notification.collabPostReactionId,
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
    url: `/collabs/posts/${post.id}`,
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

  const comment = await models.CollabPostComment.findByPk(
    notification.collabPostCommentId,
    {
      include: [models.User],
    },
  )

  if (!comment) {
    throw new Error('Comment not found')
  }

  return {
    ...notification,
    title: 'New Post Comment',
    url: `/collabs/posts/${post.id}`,
    message: `${comment.author.username} commented on your post ${post.title}`,
  }
}

const formatCollabPostCommentReactionNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  const reaction = await models.CollabPostCommentReaction.findByPk(
    notification.collabPostCommentReactionId,
    {
      include: [{ all: true }],
      raw: true,
      nest: true,
    },
  )

  if (!reaction) {
    throw new Error('CollabPostCommentReaction not found')
  }

  return {
    ...notification,
    title: 'New Comment Reaction',
    url: ``,
    message: `${
      reaction.user.username
    } reacted on your comment ${reaction.comment.content.slice(0, 30)}`,
  }
}

const formatPrivateMessageNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  const message = await models.PrivateMessage.findByPk(
    notification.privateMessageId,
    { include: [{ model: models.User, as: 'author' }] },
  )

  if (!message) {
    throw new Error('Message not found')
  }

  return {
    ...notification,
    title: 'New Private Message',
    url: ``,
    message: `${message.author.username} sent you a message`,
  }
}

const formatCollabMemberRequestNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  const request = await models.CollabMemberRequest.findByPk(
    notification.collabMemberRequestId,
    { include: [{ all: true }] },
  )

  if (!request) {
    throw new Error('Collab Member Request not found')
  }

  return {
    ...notification,
    title: 'New Collab Member Request',
    url: ``,
    message: `${request.member.username} wants to join ${request.collab.name}`,
  }
}

const formatNewCollabMemberNotification = async (
  notification: InstanceType<typeof models.Notification>,
) => {
  const collabMember = await models.CollabMember.findByPk(
    notification.collabMemberId,
    { include: [{ all: true }] },
  )

  if (!collabMember) {
    throw new Error('Collab member not found')
  }

  return {
    ...notification,
    title: 'New Collab Member',
    url: ``,
    message: `${collabMember.member.username} joined ${collabMember.collab.name}`,
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
    case 'COLLAB_POST_COMMENT_REACTION':
      return formatCollabPostCommentReactionNotification(notification)
    case 'PRIVATE_MESSAGE':
      return formatPrivateMessageNotification(notification)
    case 'COLLAB_MEMBER_REQUEST':
      return formatCollabMemberRequestNotification(notification)
    case 'NEW_COLLAB_MEMBER':
      return formatNewCollabMemberNotification(notification)

    default:
      throw new Error(`Unknown notification type ${notification.type}`)
  }
}
