import { and } from 'graphql-shield'
import { Resolvers } from '../types'
import { formatNotification } from '../helpers/formatNotification'
import { isAuthenticated } from '../middleware/isAuthenticated'

export const collabPostReactionResolver: Resolvers = {
  Mutation: {
    addCollabPostReaction: async (
      root,
      { reaction },
      { user, models, pubsub },
    ) => {
      const { CollabPost, CollabPostReaction, Notification } = models
      const postReaction = await CollabPostReaction.addReaction({
        ...reaction,
        userId: user!.id,
      })

      const post = await CollabPost.findByPk(postReaction.postId, {
        attributes: ['id', 'ownerId'],
      })

      if (!post) {
        throw new Error('Post not found')
      }

      if (post.ownerId !== user!.id) {
        Notification.newCollabPostReactionNotification(
          post.ownerId,
          post.id,
          postReaction.id,
        )
          .then(formatNotification)
          .then(newNotification => {
            pubsub.publish('NEW_NOTIFICATION', {
              newNotification,
            })
          })
      }

      return post!
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

export const collabPostReactionMiddleware = {
  Mutation: {
    addCollabPostReaction: and(isAuthenticated),
    removeCollabPostReaction: and(isAuthenticated),
  },
}
