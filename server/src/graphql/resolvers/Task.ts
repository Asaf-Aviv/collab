import { isAuthenticated } from './../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'

export const collabTaskResolver: Resolvers = {
  Mutation: {
    createTask: (
      root,
      { collabId, taskListId, description },
      { user, models }
    ) =>
      models.CollabTask.createTask(collabId, taskListId, description, user.id),
    deleteTask: (root, { taskId }, { user, models }) =>
      models.CollabTask.deleteTask(taskId, user.id),
  },
  Task: {
    comments: ({ id }, args, { models }) =>
      models.CollabTaskComment.findAll({ where: { collabTaskId: id } }),
    author: ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
  },
}

export const collabTaskMiddleware = {
  Mutation: {
    createTask: and(isAuthenticated),
    deleteTask: and(isAuthenticated),
  },
}
