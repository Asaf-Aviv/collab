import { Resolvers } from '../types'

export const collabPostReactionResolver: Resolvers = {
  Mutation: {
    addCollabPostReaction: (root, { reaction }, { user, models }) =>
      models.CollabPostReaction.addReaction({ ...reaction, userId: user!.id }),
    removeCollabPostReaction: (root, { reactionId }, { user, models }) =>
      models.CollabPostReaction.deleteReaction(reactionId, user!.id),
  },
}
