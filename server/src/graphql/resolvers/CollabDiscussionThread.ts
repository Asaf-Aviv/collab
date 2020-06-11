import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers, Reaction } from '../types'
import { Sequelize } from 'sequelize-typescript'

export const collabDiscussionThreadResolver: Resolvers = {
  Query: {
    thread: (root, { threadId }, { models }) =>
      models.CollabDiscussionThread.findByPk(threadId),
  },
  Mutation: {
    createCollabDiscussionThread: (root, { thread }, { user, models }) =>
      models.CollabDiscussionThread.createThread(thread, user!.id),
    deleteCollabDiscussionThread: (root, { threadId }, { user, models }) =>
      models.CollabDiscussionThread.deleteThread(threadId, user!.id),
  },
  CollabDiscussionThread: {
    author: ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
    collab: ({ collabId }, args, { loaders }) =>
      loaders.collabLoader.load(collabId),
    comments: ({ id }, args, { models }) =>
      models.CollabDiscussionThreadComment.findAll({
        where: { threadId: id },
        order: [['createdAt', 'DESC']],
      }),
    commentsCount: ({ id }, args, { models }) =>
      models.CollabDiscussionThreadComment.count({ where: { threadId: id } }),
    reactions: ({ id }, args, { models, user }) =>
      (models.CollabDiscussionThreadReaction.findAll({
        where: { threadId: id },
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
    reactionsCount: ({ id }, args, { models }) =>
      models.CollabDiscussionThreadReaction.count({ where: { threadId: id } }),
  },
}

export const collabDiscussionThreadMiddleware = {
  Mutation: {
    createCollabDiscussionThread: and(isAuthenticated),
    deleteCollabDiscussionThread: and(isAuthenticated),
  },
}
