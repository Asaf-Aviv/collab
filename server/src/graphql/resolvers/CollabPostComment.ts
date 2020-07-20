import { Reaction } from '../types'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'
import { Sequelize } from 'sequelize-typescript'
import { formatNotification } from '../helpers/formatNotification'

export const collabPostCommentResolver: Resolvers = {
  Mutation: {
    createComment: async (
      root,
      { content, postId },
      { user, models, pubsub },
    ) => {
      const { CollabPostComment, Notification, CollabPost } = models
      const comment = await CollabPostComment.createComment(
        content,
        user!.id,
        postId,
      )
      const post = await CollabPost.findByPk(postId, {
        attributes: ['ownerId'],
      })

      if (post!.ownerId !== user!.id) {
        Notification.newCollabPostCommentNotification(
          post!.ownerId,
          postId,
          comment.id,
        )
          .then(formatNotification)
          .then(newNotification => {
            pubsub.publish('NEW_NOTIFICATION', {
              newNotification,
            })
          })
          .catch(console.error)
      }

      return comment
    },
    deleteComment: (root, { commentId }, { user, models }) =>
      models.CollabPostComment.deleteComment(commentId, user.id),
  },
  CollabPostComment: {
    author: async ({ authorId }, args, { loaders }) => {
      const user = await loaders.userLoader.load(authorId)
      return user!
    },
    isAuthor: ({ authorId }, args, { user }) => user?.id === authorId,
    reactions: ({ id }, args, { models, user }) =>
      (models.CollabPostCommentReaction.findAll({
        where: { commentId: id },
        group: ['emojiId'],
        attributes: [
          'emojiId',
          [Sequelize.fn('COUNT', '*'), 'count'],
          Sequelize.literal(
            `'${user?.id}' = ANY(array_agg(user_id)) as "isLiked"`,
          ) as any,
        ],
        order: [['count', 'DESC']],
        raw: true,
      }) as unknown) as Reaction[],
  },
}

export const collabPostCommentMiddleware = {
  Mutation: {
    createComment: and(isAuthenticated),
    deleteComment: and(isAuthenticated),
  },
}
