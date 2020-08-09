import { and } from 'graphql-shield'
import { Resolvers } from '../types'
import { isAuthenticated } from '../middleware/isAuthenticated'

export const collabDiscussionThreadReactionResolver: Resolvers = {
  Mutation: {
    addCollabDiscussionThreadReaction: (root, { reaction }, { user, models }) =>
      models.CollabDiscussionThreadReaction.addReaction({
        ...reaction,
        userId: user!.id,
      }),
    removeCollabDiscussionThreadReaction: (
      root,
      { reaction },
      { user, models },
    ) =>
      models.CollabDiscussionThreadReaction.deleteReaction({
        ...reaction,
        userId: user!.id,
      }),
  },
}

export const collabDiscussionThreadReactionMiddleware = {
  Mutation: {
    addCollabDiscussionThreadReaction: and(isAuthenticated),
    removeCollabDiscussionThreadReaction: and(isAuthenticated),
  },
}
