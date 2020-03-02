import { isAuthenticated } from './../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Collab } from '../../db/models/Collab'
import { Resolvers } from '../types'
import { CollabTask } from '../../db/models/CollabTask'

export const collabTaskListResolver: Resolvers = {
  Mutation: {
    createTaskList: (root, { collabId, name, order }, { user }) =>
      Collab.createTaskList(collabId, name, order, user.id),
    deleteTaskList: (root, { taskListId }, { user }) =>
      Collab.deleteTaskList(taskListId, user.id),
  },
  TaskList: {
    tasks: ({ id }) => CollabTask.findAll({ where: { taskListId: id } }),
  },
}

export const collabTaskListMiddleware = {
  Mutation: {
    createTaskList: and(isAuthenticated),
    deleteTaskList: and(isAuthenticated),
  },
}
