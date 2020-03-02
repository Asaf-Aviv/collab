import { isAuthenticated } from './../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'
import { replaceErrorWithNull } from '../helpers/replaceErrorWithNull'

export const collabResolver: Resolvers = {
  Query: {
    collabs: (root, args, { models }) => models.Collab.findAll(),
    collab: (root, { collabId }, { models }) =>
      models.Collab.getCollab(collabId),
  },
  Mutation: {
    createCollab: async (root, { collab }, { user, models }) =>
      models.Collab.createCollab(collab, user.id),
    deleteCollab: (root, { collabId }, { models }) =>
      models.Collab.deleteCollab(collabId),
    addMember: (root, { collabId, memberId }, { user, models }) =>
      models.Collab.addMember(collabId, user.id, memberId),
    removeMember: (root, { collabId, memberId }, { user, models }) =>
      models.Collab.removeMember(collabId, user.id, memberId),
    inviteMember: (root, { collabId, memberId }, { user, models }) =>
      models.Collab.inviteMember(user.id, memberId, collabId),
    requestToJoin: (root, { collabId }, { user, models }) =>
      models.Collab.requestToJoin(collabId, user.id),
    toggleAcceptInvites: (root, { collabId }, { user, models }) =>
      models.Collab.toggleAcceptInvites(collabId, user.id),
    declineMemberRequest: (root, { collabId, memberId }, { user, models }) =>
      models.Collab.declineMemberRequest(collabId, memberId, user.id),
    createTaskList: (root, { collabId, name, order }, { user, models }) =>
      models.Collab.createTaskList(collabId, name, order, user.id),
    deleteTaskList: (root, { taskListId }, { user, models }) =>
      models.Collab.deleteTaskList(taskListId, user.id),
    createTaskComment: (
      root,
      { collabId, content, taskId },
      { user, models }
    ) =>
      models.CollabTaskComment.createComment(
        collabId,
        content,
        user.id,
        taskId
      ),
    deleteTaskComment: (root, { commentId }, { user, models }) =>
      models.CollabTaskComment.deleteComment(commentId, user.id),
  },
  Collab: {
    owner: async ({ ownerId }, args, { loaders }) =>
      loaders.userLoader.load(ownerId),
    members: async ({ id }, args, { loaders, models }) => {
      const members = await models.CollabMember.findAll({
        where: { collabId: id },
        attributes: ['memberId'],
      })

      const memberIds = members.map(({ memberId }) => memberId)
      const users = await loaders.userLoader.loadMany(memberIds)
      return users.map(replaceErrorWithNull)
    },
    comments: ({ id }, args, { models }) =>
      models.CollabComment.findAll({ where: { collabId: id } }),
    pendingInvites: async ({ id }, args, { models, loaders }) => {
      const pendingInviteMembers = await models.CollabMemberRequest.findAll({
        where: { collabId: id, type: 'invitation' },
        attributes: ['memberId'],
      })

      const memberIds = pendingInviteMembers.map(({ memberId }) => memberId)
      const users = await loaders.userLoader.loadMany(memberIds)
      return users.map(replaceErrorWithNull)
    },
    pendingRequests: async ({ id }, args, { loaders, models }) => {
      const pendingInviteMembers = await models.CollabMemberRequest.findAll({
        where: { collabId: id, type: 'request' },
        attributes: ['memberId'],
      })
      const memberIds = pendingInviteMembers.map(({ memberId }) => memberId)
      const users = await loaders.userLoader.loadMany(memberIds)

      return users.map(replaceErrorWithNull)
    },
    discussionMessages: ({ id }, args, { models }) =>
      models.CollabDiscussionMessage.findAll({ where: { collabId: id } }),
    taskList: ({ id }, args, { models }) =>
      models.CollabTaskList.findAll({ where: { collabId: id } }),
  },
  TaskList: {
    tasks: ({ id }, args, { models }) =>
      models.CollabTask.findAll({ where: { taskListId: id } }),
  },
  CollabComment: {
    author: async ({ authorId }, args, { loaders }) =>
      loaders.userLoader.load(authorId),
    collab: async ({ collabId }, args, { loaders }) =>
      loaders.collabLoader.load(collabId),
  },
}

export const collabMiddleware = {
  Mutation: {
    createCollab: and(isAuthenticated),
    deleteCollab: and(isAuthenticated),
    addMember: and(isAuthenticated),
    removeMember: and(isAuthenticated),
    inviteMember: and(isAuthenticated),
    requestToJoin: and(isAuthenticated),
    toggleAcceptInvites: and(isAuthenticated),
    declineMemberRequest: and(isAuthenticated),
    createTaskList: and(isAuthenticated),
    deleteTaskList: and(isAuthenticated),
  },
}
