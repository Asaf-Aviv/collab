import { Resolvers } from '../types'
import { formatNotification } from '../helpers/formatNotification'
import { and } from 'graphql-shield'
import { isAuthenticated } from '../middleware/isAuthenticated'

export const collabPostCommentReactionResolver: Resolvers = {
  Mutation: {
    addCollabPostCommentReaction: async (
      root,
      { reaction },
      { user, models, pubsub },
    ) => {
      const {
        CollabPostComment,
        CollabPostCommentReaction,
        Notification,
      } = models
      const commentReaction = await CollabPostCommentReaction.addReaction({
        ...reaction,
        userId: user!.id,
      })
      const comment = await CollabPostComment.findByPk(reaction.commentId, {
        attributes: ['authorId'],
      })

      if (!comment) {
        throw new Error('Comment not found')
      }

      if (comment.authorId === user!.id) {
        Notification.newCollabPostCommentReactionNotification(
          comment.authorId,
          commentReaction.id,
        )
          .then(formatNotification)
          .then(newNotification => {
            pubsub.publish('NEW_NOTIFICATION', {
              newNotification,
            })
          })
          .catch(err => {
            console.log(
              'Could not send CollabPostCommentReactionNotification',
              err,
            )
          })
      }

      return true
    },
    removeCollabPostCommentReaction: async (
      root,
      { reaction },
      { user, models },
    ) =>
      models.CollabPostCommentReaction.deleteReaction({
        ...reaction,
        userId: user!.id,
      }),
  },
}

export const collabPostCommentReactionMiddleware = {
  Mutation: {
    addCollabPostCommentReaction: and(isAuthenticated),
    removeCollabPostCommentReaction: and(isAuthenticated),
  },
}
