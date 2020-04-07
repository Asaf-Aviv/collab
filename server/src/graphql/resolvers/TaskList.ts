import { isAuthenticated } from '../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'

export const collabTaskListResolver: Resolvers = {
  Query: {
    taskList: async (root, { collabId }, { models }) =>
      models.CollabTaskList.findAll({ where: { collabId }, order: ['order'] }),
  },
  Mutation: {
    createTaskList: (root, { input }, { user, models }) =>
      models.CollabTaskList.createTaskList(input, user.id),
    updateTaskListName: (root, { input }, { user, models }) =>
      models.CollabTaskList.updateTaskListName(input, user!.id),
    updateTaskListPosition: (root, { input }, { user, models }) =>
      models.CollabTaskList.updateTaskListPosition(input, user!.id),
    deleteTaskList: (root, { taskListId }, { user, models }) =>
      models.CollabTaskList.deleteTaskList(taskListId, user.id),
  },
  TaskList: {
    tasks: ({ id }, args, { models }) =>
      models.CollabTask.findAll({
        where: { taskListId: id },
        order: ['order'],
      }),
    collab: ({ collabId }, args, { loaders }) =>
      loaders.collabLoader.load(collabId),
  },
}

export const collabTaskListMiddleware = {
  Mutation: {
    // createTaskList: and(isAuthenticated),
    // deleteTaskList: and(isAuthenticated),
  },
}
