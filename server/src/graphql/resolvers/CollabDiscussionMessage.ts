import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'

export const collabDiscussionMessageResolver: Resolvers = {
  Mutation: {
    createCollabDiscussionMessage: (
      root,
      { content, collabId },
      { user, models }
    ) =>
      models.CollabDiscussionMessage.createMessage(content, user.id, collabId),
    deleteCollabDiscussionMessage: (root, { messageId }, { user, models }) =>
      models.CollabDiscussionMessage.deleteMessage(messageId, user.id),
  },
  CollabDiscussionMessage: {
    author: ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
  },
}

export const collabDiscussionMessageMiddleware = {
  Mutation: {
    createCollabDiscussionMessage: and(isAuthenticated),
    deleteCollabDiscussionMessage: and(isAuthenticated),
  },
}
