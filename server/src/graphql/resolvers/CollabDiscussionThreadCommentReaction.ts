import { and } from 'graphql-shield'
import { Resolvers } from '../types'
import { isAuthenticated } from '../middleware/isAuthenticated'

export const collabDiscussionThreadCommentReactionResolver: Resolvers = {
  Mutation: {
    addCollabDiscussionThreadCommentReaction: (
      root,
      { reaction },
      { user, models },
    ) =>
      models.CollabDiscussionThreadCommentReaction.addReaction({
        ...reaction,
        userId: user!.id,
      }),
    removeCollabDiscussionThreadCommentReaction: (
      root,
      { reaction },
      { user, models },
    ) =>
      models.CollabDiscussionThreadCommentReaction.deleteReaction({
        ...reaction,
        userId: user!.id,
      }),
  },
}

export const collabDiscussionThreadCommentReactionMiddleware = {
  Mutation: {
    addCollabDiscussionThreadCommentReaction: and(isAuthenticated),
    removeCollabDiscussionThreadCommentReaction: and(isAuthenticated),
  },
}
