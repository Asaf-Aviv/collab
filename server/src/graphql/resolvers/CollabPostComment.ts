import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'

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
  },
}

export const collabPostCommentMiddleware = {
  Mutation: {
    createComment: and(isAuthenticated),
    deleteComment: and(isAuthenticated),
  },
}
