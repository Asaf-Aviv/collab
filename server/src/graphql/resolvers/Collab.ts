import { isAuthenticated } from './../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { CollabMemberRequest } from '../../db/models/CollabMemberRequest'
import { CollabMember } from './../../db/models/CollabMember'
import { CollabComment } from './../../db/models/CollabComment'
import { Collab } from '../../db/models/Collab'
import { Resolvers } from '../types'
import { User } from '../../db/models/User'
import { CollabTaskList } from '../../db/models/CollabTaskList'
import { CollabTask } from '../../db/models/CollabTask'
import { CollabTaskComment } from '../../db/models/CollabTaskComment'

const collabResolver: Resolvers = {
  Query: {
    collabs: () => Collab.findAll(),
    collab: (parent, { collabId }) => Collab.getCollab(collabId),
  },
  Mutation: {
    createCollab: async (parent, { collab }, { user }) =>
      Collab.createCollab(collab, user.id),
    deleteCollab: (parent, { collabId }) => Collab.deleteCollab(collabId),
    addMember: (parent, { collabId, memberId }, { user }) =>
      Collab.addMember(collabId, user.id, memberId),
    removeMember: (parent, { collabId, memberId }, { user }) =>
      Collab.removeMember(collabId, user.id, memberId),
    addComment: (parent, { content, collabId }, { user }) =>
      CollabComment.addComment(content, user.id, collabId),
    deleteComment: (parent, { commentId }, { user }) =>
      CollabComment.deleteComment(commentId, user.id),
    inviteMember: (parent, { collabId, memberId }, { user }) =>
      Collab.inviteMember(user.id, memberId, collabId),
    requestToJoin: (parent, { collabId }, { user }) =>
      Collab.requestToJoin(collabId, user.id),
    toggleAcceptInvites: (parent, { collabId }, { user }) =>
      Collab.toggleAcceptInvites(collabId, user.id),
    declineMemberRequest: (parent, { collabId, memberId }, { user }) =>
      Collab.declineMemberRequest(collabId, memberId, user.id),
    createTaskList: (parent, { collabId, name, order }, { user }) =>
      Collab.createTaskList(collabId, name, order, user.id),
    deleteTaskList: (parent, { taskListId }, { user }) =>
      Collab.deleteTaskList(taskListId, user.id),
    createTaskComment: (parent, { collabId, content, taskId }, { user }) =>
      CollabTaskComment.createComment(collabId, content, user.id, taskId),
    deleteTaskComment: (parent, { commentId }, { user }) =>
      CollabTaskComment.deleteComment(commentId, user.id),
  },
  Collab: {
    owner: ({ ownerId }, args, { userLoader }) =>
      userLoader.load(ownerId) as Promise<User>,
    members: async ({ id }, args, { userLoader }) => {
      const members = await CollabMember.findAll({
        where: { collabId: id },
        attributes: ['memberId'],
      })
      const memberIds = members.map(({ memberId }) => memberId)
      return userLoader.loadMany(memberIds) as Promise<User[]>
    },
    comments: ({ id }) => CollabComment.findAll({ where: { collabId: id } }),
    pendingInvites: async ({ id }, args, { userLoader }) => {
      const pendingInviteMembers = await CollabMemberRequest.findAll({
        where: { collabId: id, type: 'invitation' },
        attributes: ['memberId'],
      })
      const memberIds = pendingInviteMembers.map(({ memberId }) => memberId)
      return userLoader.loadMany(memberIds) as Promise<User[]>
    },
    pendingRequests: async ({ id }, args, { userLoader }) => {
      const pendingInviteMembers = await CollabMemberRequest.findAll({
        where: { collabId: id, type: 'request' },
        attributes: ['memberId'],
      })
      const memberIds = pendingInviteMembers.map(({ memberId }) => memberId)
      return userLoader.loadMany(memberIds) as Promise<User[]>
    },
    taskList: ({ id }) => CollabTaskList.findAll({ where: { collabId: id } }),
  },
  TaskList: {
    tasks: ({ id }) => CollabTask.findAll({ where: { taskListId: id } }),
  },
  Task: {
    comments: ({ id }) =>
      CollabTaskComment.findAll({ where: { collabTaskId: id } }),
    author: ({ authorId }, args, { userLoader }) =>
      userLoader.load(authorId) as Promise<User>,
  },
  TaskComment: {
    author: ({ authorId }, args, { userLoader }) =>
      userLoader.load(authorId) as Promise<User>,
  },
  CollabComment: {
    author: ({ authorId }, args, { userLoader }) =>
      userLoader.load(authorId) as Promise<User>,
    collab: ({ collabId }, args, { collabLoader }) =>
      collabLoader.load(collabId) as Promise<Collab>,
  },
}

export const collabMiddleware = {
  Mutation: {
    createCollab: and(isAuthenticated),
    deleteCollab: and(isAuthenticated),
    addMember: and(isAuthenticated),
    removeMember: and(isAuthenticated),
    addComment: and(isAuthenticated),
    deleteComment: and(isAuthenticated),
    inviteMember: and(isAuthenticated),
    requestToJoin: and(isAuthenticated),
    toggleAcceptInvites: and(isAuthenticated),
    declineMemberRequest: and(isAuthenticated),
    createTaskList: and(isAuthenticated),
    deleteTaskList: and(isAuthenticated),
    createTaskComment: and(isAuthenticated),
    deleteTaskComment: and(isAuthenticated),
  },
}

export default collabResolver
