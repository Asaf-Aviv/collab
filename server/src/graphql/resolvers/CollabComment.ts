import { isAuthenticated } from './../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'

export const collabCommentResolver: Resolvers = {
  Mutation: {
    addComment: (root, { content, collabId }, { user, models }) =>
      models.CollabComment.addComment(content, user.id, collabId),
    deleteComment: (root, { commentId }, { user, models }) =>
      models.CollabComment.deleteComment(commentId, user.id),
  },
  CollabComment: {
    author: ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
    collab: ({ collabId }, args, { loaders }) =>
      loaders.collabLoader.load(collabId),
  },
}

export const collabCommentMiddleware = {
  Mutation: {
    addComment: and(isAuthenticated),
    deleteComment: and(isAuthenticated),
  },
}
