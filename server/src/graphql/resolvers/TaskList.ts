import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'

export const collabTaskListResolver: Resolvers = {
  Query: {
    taskList: async (root, { collabId }, { models }) =>
      models.CollabTaskList.findAll({ where: { collabId } }),
  },
  Mutation: {
    createTaskList: (root, { collabId, name, order }, { user, models }) =>
      models.Collab.createTaskList(collabId, name, order, user.id),
    deleteTaskList: (root, { taskListId }, { user, models }) =>
      models.Collab.deleteTaskList(taskListId, user.id),
  },
  TaskList: {
    tasks: ({ id }, args, { models }) =>
      models.CollabTask.findAll({ where: { taskListId: id } }),
    collab: ({ collabId }, args, { loaders }) =>
      loaders.collabLoader.load(collabId),
  },
}

export const collabTaskListMiddleware = {
  Mutation: {
    createTaskList: and(isAuthenticated),
    deleteTaskList: and(isAuthenticated),
  },
}
