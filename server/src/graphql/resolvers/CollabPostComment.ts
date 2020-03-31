import { Reaction } from '../types'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'
import { Sequelize } from 'sequelize-typescript'

export const collabPostCommentResolver: Resolvers = {
  Mutation: {
    createComment: (root, { content, postId }, { user, models }) =>
      models.CollabPostComment.createComment(content, user!.id, postId),
    deleteComment: (root, { commentId }, { user, models }) =>
      models.CollabPostComment.deleteComment(commentId, user.id),
  },
  CollabPostComment: {
    author: ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
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
