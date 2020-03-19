import { isAuthenticated } from './../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'
import { replaceErrorWithNull } from '../helpers/replaceErrorWithNull'
import { differenceInDays } from 'date-fns'

export const collabPostResolver: Resolvers = {
  Query: {
    collabPosts: (root, args, { models }) => models.CollabPost.findAll(),
    collabPost: (root, { postId }, { models }) =>
      models.CollabPost.findByPk(postId),
  },
  Mutation: {
    createCollabPost: async (root, { post }, { user, models }) =>
      models.CollabPost.createPost(post, user!.id),
    deleteCollabPost: (root, { postId }, { models, user }) =>
      models.CollabPost.deletePost(postId, user!.id),
  },
  CollabPost: {
    owner: async ({ ownerId }, args, { loaders }) =>
      loaders.userLoader.load(ownerId),
    isOwner: ({ ownerId }, args, { user }) => user?.id === ownerId,
    isMember: async ({ collabId }, args, { user, models }) => {
      if (!user?.id) {
        return false
      }

      const isMember = await models.CollabMember.findOne({
        where: { collabId, memberId: user.id },
      })

      return Boolean(isMember)
    },
    acceptsInvites: async ({ collabId }, args, { loaders }) => {
      const collab = await loaders.collabLoader.load(collabId)
      return collab!.acceptsInvites
    },
    invitationPending: async ({ collabId }, args, { user, models }) => {
      if (!user?.id) {
        return false
      }

      const invitation = await models.CollabMemberRequest.findOne({
        where: { collabId, memberId: user.id, type: 'invitation' },
      })

      return Boolean(invitation)
    },
    requestToJoinPending: async ({ collabId }, args, { user, models }) => {
      if (!user?.id) {
        return false
      }

      const invitation = await models.CollabMemberRequest.findOne({
        where: { collabId, memberId: user.id, type: 'request' },
      })

      return Boolean(invitation)
    },
    members: async ({ collabId }, args, { loaders, models }) => {
      const members = await models.CollabMember.findAll({
        where: { collabId },
        attributes: ['memberId'],
      })

      const memberIds = members.map(({ memberId }) => memberId)
      const users = await loaders.userLoader.loadMany(memberIds)
      return users.map(replaceErrorWithNull)
    },
    isNew: ({ createdAt }) => differenceInDays(createdAt, new Date()) <= 4,
    comments: ({ id }, args, { models }) =>
      models.CollabPostComment.findAll({ where: { postId: id } }),
    pendingInvites: async ({ collabId }, args, { models, loaders }) => {
      const pendingInviteMembers = await models.CollabMemberRequest.findAll({
        where: { collabId, type: 'invitation' },
        attributes: ['memberId'],
      })

      const memberIds = pendingInviteMembers.map(({ memberId }) => memberId)
      const users = await loaders.userLoader.loadMany(memberIds)
      return users.map(replaceErrorWithNull)
    },
    pendingRequests: async ({ collabId }, args, { loaders, models }) => {
      const pendingInviteMembers = await models.CollabMemberRequest.findAll({
        where: { collabId, type: 'request' },
        attributes: ['memberId'],
      })
      const memberIds = pendingInviteMembers.map(({ memberId }) => memberId)
      const users = await loaders.userLoader.loadMany(memberIds)

      return users.map(replaceErrorWithNull)
    },
  },
}

export const collabMiddleware = {
  Mutation: {
    createCollab: and(isAuthenticated),
    deleteCollab: and(isAuthenticated),
    removeMember: and(isAuthenticated),
    inviteMember: and(isAuthenticated),
    requestToJoin: and(isAuthenticated),
    toggleAcceptInvites: and(isAuthenticated),
    declineMemberRequest: and(isAuthenticated),
    createTaskList: and(isAuthenticated),
    deleteTaskList: and(isAuthenticated),
  },
}
