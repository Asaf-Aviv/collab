import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'

export const collabDiscussionThreadCommentResolver: Resolvers = {
  Mutation: {
    createCollabDiscussionThreadComment: (
      root,
      { content, threadId, collabId },
      { user, models }
    ) =>
      models.CollabDiscussionThreadComment.createComment(
        content,
        user!.id,
        collabId,
        threadId
      ),
    deleteCollabDiscussionThreadComment: (
      root,
      { commentId },
      { user, models }
    ) =>
      models.CollabDiscussionThreadComment.deleteComment(commentId, user!.id),
  },
  CollabDiscussionThreadComment: {
    author: ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
    thread: ({ threadId }, args, { models }) =>
      models.CollabDiscussionThread.findByPk(threadId),
    collab: ({ collabId }, args, { loaders }) =>
      loaders.collabLoader.load(collabId),
  },
}

export const collabDiscussionThreadCommentMiddleware = {
  Mutation: {
    createCollabDiscussionThreadComment: and(isAuthenticated),
    deleteCollabDiscussionThreadComment: and(isAuthenticated),
  },
}
