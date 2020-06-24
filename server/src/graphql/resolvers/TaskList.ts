// import { isAuthenticated } from '../middleware/isAuthenticated'
// import { and } from 'graphql-shield'
import { Resolvers } from '../types'

export const collabTaskListResolver: Resolvers = {
  Query: {
    taskList: async (root, { collabId }, { models }) => {
      const taskList = await models.CollabTaskList.findAll({
        where: { collabId },
        order: ['order'],
      })
      return { taskList }
    },
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
    collab: async ({ collabId }, args, { loaders }) => {
      const collab = await loaders.collabLoader.load(collabId)
      return collab!
    },
  },
}

export const collabTaskListMiddleware = {
  Mutation: {
    // createTaskList: and(isAuthenticated),
    // deleteTaskList: and(isAuthenticated),
  },
}
