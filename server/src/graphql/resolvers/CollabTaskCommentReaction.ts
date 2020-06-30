import { Resolvers } from '../types'
import { and } from 'graphql-shield'
import { isAuthenticated } from '../middleware/isAuthenticated'

export const collabTaskCommentReactionResolver: Resolvers = {
  Mutation: {
    addCollabTaskCommentReaction: (root, { reaction }, { user, models }) =>
      models.CollabTaskCommentReaction.addReaction({
        ...reaction,
        userId: user!.id,
      }),
    removeCollabTaskCommentReaction: async (
      root,
      { reaction },
      { user, models },
    ) =>
      models.CollabTaskCommentReaction.deleteReaction({
        ...reaction,
        userId: user!.id,
      }),
  },
}

export const collabTaskCommentReactionMiddleware = {
  Mutation: {
    addCollabTaskCommentReaction: and(isAuthenticated),
    removeCollabTaskCommentReaction: and(isAuthenticated),
  },
}
