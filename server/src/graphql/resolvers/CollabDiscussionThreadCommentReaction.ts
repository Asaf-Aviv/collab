import { Resolvers } from '../types'

export const collabDiscussionThreadCommentReactionResolver: Resolvers = {
  Mutation: {
    addCollabDiscussionThreadCommentReaction: async (
      root,
      { reaction },
      { user, models },
    ) =>
      models.CollabDiscussionThreadCommentReaction.addReaction({
        ...reaction,
        userId: user!.id,
      }),
    removeCollabDiscussionThreadCommentReaction: async (
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
