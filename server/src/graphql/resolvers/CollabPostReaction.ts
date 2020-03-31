import { Resolvers } from '../types'

export const collabPostReactionResolver: Resolvers = {
  Mutation: {
    addCollabPostReaction: async (root, { reaction }, { user, models }) => {
      await models.CollabPostReaction.addReaction({
        ...reaction,
        userId: user!.id,
      })

      const collab = await models.CollabPost.findByPk(reaction.postId, {
        attributes: ['id'],
      })

      return collab!
    },
    removeCollabPostReaction: async (root, { reaction }, { user, models }) => {
      await models.CollabPostReaction.deleteReaction({
        ...reaction,
        userId: user!.id,
      })

      const collab = await models.CollabPost.findByPk(reaction.postId, {
        attributes: ['id'],
      })

      return collab!
    },
  },
}
