import { Resolvers } from '../types'

export const collabPostCommentReactionResolver: Resolvers = {
  Mutation: {
    addCollabPostCommentReaction: (root, { reaction }, { user, models }) =>
      models.CollabPostCommentReaction.addReaction({
        ...reaction,
        userId: user!.id,
      }),
    removeCollabPostCommentReaction: async (
      root,
      { reaction },
      { user, models },
    ) =>
      models.CollabPostCommentReaction.deleteReaction({
        ...reaction,
        userId: user!.id,
      }),
  },
}
