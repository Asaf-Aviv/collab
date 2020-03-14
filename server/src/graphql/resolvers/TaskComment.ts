import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'

export const taskCommentResolver: Resolvers = {
  Mutation: {
    createTaskComment: (
      root,
      { collabId, content, taskId },
      { user, models },
    ) =>
      models.CollabTaskComment.createComment(
        collabId,
        content,
        user.id,
        taskId,
      ),
    deleteTaskComment: (root, { commentId }, { user, models }) =>
      models.CollabTaskComment.deleteComment(commentId, user.id),
  },
  TaskComment: {
    author: ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
    task: ({ taskId }, args, { models }) => models.CollabTask.findByPk(taskId),
  },
}

export const collabTaskCommentMiddleware = {
  Mutation: {
    createTaskComment: and(isAuthenticated),
    deleteTaskComment: and(isAuthenticated),
  },
}
