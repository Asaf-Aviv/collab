import { Resolvers } from '../types'

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
