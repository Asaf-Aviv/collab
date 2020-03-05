import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'

export const collabDiscussionThreadResolver: Resolvers = {
  Mutation: {
    createCollabDiscussionThread: (
      root,
      { title, collabId },
      { user, models }
    ) => models.CollabDiscussionThread.createThread(title, user!.id, collabId),
    deleteCollabDiscussionThread: (root, { threadId }, { user, models }) =>
      models.CollabDiscussionThread.deleteThread(threadId, user!.id),
  },
  CollabDiscussionThread: {
    author: ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
    collab: ({ collabId }, args, { loaders }) =>
      loaders.collabLoader.load(collabId),
    comments: ({ id }, args, { models }) =>
      models.CollabDiscussionThreadComment.findAll({ where: { threadId: id } }),
  },
}

export const collabDiscussionThreadMiddleware = {
  Mutation: {
    createCollabDiscussionThread: and(isAuthenticated),
    deleteCollabDiscussionThread: and(isAuthenticated),
  },
}
