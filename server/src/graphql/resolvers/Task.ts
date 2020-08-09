import { and } from 'graphql-shield'
import { isAuthenticated } from './../middleware/isAuthenticated'
import { Resolvers } from '../types'
import { GQLCollab } from '../../db/models/Collab'

export const collabTaskResolver: Resolvers = {
  Query: {
    task: (root, { taskId }, { models }) => models.CollabTask.findByPk(taskId),
  },
  Mutation: {
    createTask: (root, { input }, { user, models }) =>
      models.CollabTask.createTask(input, user.id),
    updateTask: (root, { input }, { models, user }) =>
      models.CollabTask.updateTask(input, user!.id),
    updateTaskAssignee: (root, { input }, { models, user }) =>
      models.CollabTask.updateTaskAssignee(input, user!.id),
    updateTaskPosition: (root, { input }, { models, user }) =>
      models.CollabTask.updateTaskPosition(input, user!.id),
    moveTaskToList: (root, { input }, { models, user }) =>
      models.CollabTask.moveTaskToList(input, user!.id),
    deleteTask: (root, { taskId }, { user, models }) =>
      models.CollabTask.deleteTask(taskId, user.id),
  },
  Task: {
    author: async ({ authorId }, args, { loaders }) => {
      const author = await loaders.userLoader.load(authorId)
      return author!
    },
    assignedBy: ({ assignedById }, args, { loaders }) =>
      assignedById ? loaders.userLoader.load(assignedById) : null,
    assignee: ({ assigneeId }, args, { loaders }) =>
      assigneeId ? loaders.userLoader.load(assigneeId) : null,
    comments: ({ id }, args, { models }) =>
      models.CollabTaskComment.findAll({ where: { taskId: id } }),
    commentsCount: ({ id }, args, { models }) =>
      models.CollabTaskComment.count({ where: { taskId: id } }),
    collab: (parent, args, { loaders }) =>
      (loaders.collabLoader.load(parent.collabId) as unknown) as GQLCollab,
  },
}

export const collabTaskMiddleware = {
  Mutation: {
    createTask: and(isAuthenticated),
    updateTask: and(isAuthenticated),
    updateTaskAssignee: and(isAuthenticated),
    updateTaskPosition: and(isAuthenticated),
    moveTaskToList: and(isAuthenticated),
    deleteTask: and(isAuthenticated),
  },
}
