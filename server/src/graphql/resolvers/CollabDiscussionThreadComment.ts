import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers, Reaction } from '../types'
import { Sequelize } from 'sequelize-typescript'

export const collabDiscussionThreadCommentResolver: Resolvers = {
  Mutation: {
    createCollabDiscussionThreadComment: (root, { input }, { user, models }) =>
      models.CollabDiscussionThreadComment.createComment(input, user!.id),
    deleteCollabDiscussionThreadComment: (
      root,
      { commentId },
      { user, models },
    ) =>
      models.CollabDiscussionThreadComment.deleteComment(commentId, user!.id),
  },
  CollabDiscussionThreadComment: {
    author: ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
    isAuthor: ({ authorId }, args, { user }) => user?.id === authorId,
    thread: ({ threadId }, args, { models }) =>
      models.CollabDiscussionThread.findByPk(threadId),
    collab: async ({ collabId }, args, { loaders }) => {
      const collab = await loaders.collabLoader.load(collabId)
      return collab!
    },
    reactions: ({ id }, args, { models, user }) =>
      (models.CollabDiscussionThreadCommentReaction.findAll({
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

export const collabDiscussionThreadCommentMiddleware = {
  Mutation: {
    createCollabDiscussionThreadComment: and(isAuthenticated),
    deleteCollabDiscussionThreadComment: and(isAuthenticated),
  },
}
