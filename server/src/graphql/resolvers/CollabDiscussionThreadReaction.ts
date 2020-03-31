import { Resolvers } from '../types'

export const collabDiscussionThreadReactionResolver: Resolvers = {
  Mutation: {
    addCollabDiscussionThreadReaction: (root, { reaction }, { user, models }) =>
      models.CollabDiscussionThreadReaction.addReaction({
        ...reaction,
        userId: user!.id,
      }),
    removeCollabDiscussionThreadReaction: async (
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
