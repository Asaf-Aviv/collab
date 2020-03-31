import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers, Reaction } from '../types'
import { Sequelize } from 'sequelize-typescript'

export const taskCommentResolver: Resolvers = {
  Mutation: {
    createTaskComment: (
      root,
      { collabId, content, taskId },
      { user, models },
    ) =>
      models.CollabTaskComment.createComment(
        collabId,
        content,
        user.id,
        taskId,
      ),
    deleteTaskComment: (root, { commentId }, { user, models }) =>
      models.CollabTaskComment.deleteComment(commentId, user.id),
  },
  TaskComment: {
    author: ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
    task: ({ taskId }, args, { models }) => models.CollabTask.findByPk(taskId),
    reactions: ({ id }, args, { models, user }) =>
      (models.CollabTaskCommentReaction.findAll({
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

export const collabTaskCommentMiddleware = {
  Mutation: {
    createTaskComment: and(isAuthenticated),
    deleteTaskComment: and(isAuthenticated),
  },
}
