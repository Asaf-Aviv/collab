import { isAuthenticated } from './../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'

export const collabTaskResolver: Resolvers = {
  Query: {
    task: (root, { taskId }, { models }) => models.CollabTask.findByPk(taskId),
  },
  Mutation: {
    createTask: (root, { input }, { user, models }) =>
      models.CollabTask.createTask(input, user.id),
    updateTaskPosition: (root, { input }, { models, user }) =>
      models.CollabTask.updateTaskPosition(input, user!.id),
    moveTaskToList: (root, { input }, { models, user }) =>
      models.CollabTask.moveTaskToList(input, user!.id),
    deleteTask: (root, { taskId }, { user, models }) =>
      models.CollabTask.deleteTask(taskId, user.id),
  },
  Task: {
    author: ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
    comments: ({ id }, args, { models }) =>
      models.CollabTaskComment.findAll({ where: { taskId: id } }),
    commentsCount: ({ id }, args, { models }) =>
      models.CollabTaskComment.count({ where: { taskId: id } }),
  },
}

export const collabTaskMiddleware = {
  Mutation: {
    // createTask: and(isAuthenticated),
    // deleteTask: and(isAuthenticated),
  },
}
