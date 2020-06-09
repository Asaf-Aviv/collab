import { isAuthenticated } from './../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Resolvers } from '../types'
import { replaceErrorWithNull } from '../helpers/replaceErrorWithNull'
import { GQLUser } from '../../db/models/User'
import { formatNotification } from '../helpers/formatNotification'

export const collabResolver: Resolvers = {
  Query: {
    collabs: (root, args, { models }) => models.Collab.findAll(),
    collab: (root, { collabId }, { models }) =>
      models.Collab.getCollab(collabId),
  },
  Mutation: {
    deleteCollab: (root, { collabId }, { models }) =>
      models.Collab.deleteCollab(collabId),
    acceptMemberRequest: async (
      root,
      { collabId, memberId },
      { user, models, pubsub },
    ) => {
      const { Collab, Notification } = models
      const requestId = await Collab.acceptMemberRequest(
        collabId,
        user.id,
        memberId,
      )

      Notification.newCollabMemberNotification(memberId, collabId)
        .then(notifications =>
          Promise.all(notifications.map(formatNotification)),
        )
        .then(notifications => {
          notifications.forEach(newNotification => {
            pubsub.publish('NEW_NOTIFICATION', {
              newNotification,
            })
          })
        })

      Notification.newMemberRequestApprovedNotification(memberId, collabId)
        .then(formatNotification)
        .then(newNotification => {
          pubsub.publish('NEW_NOTIFICATION', {
            newNotification,
          })
        })

      return requestId
    },
    removeMember: (root, { collabId, memberId }, { user, models }) =>
      models.Collab.removeMember(collabId, user.id, memberId),
    inviteMember: async (
      root,
      { collabId, memberId },
      { user, models, pubsub },
    ) => {
      const { Collab, Notification } = models
      const member = await Collab.inviteMember(user.id, memberId, collabId)

      Notification.newCollabMemberInvitationNotification(collabId, memberId)
        .then(formatNotification)
        .then(newNotification => {
          pubsub.publish('NEW_NOTIFICATION', {
            newNotification,
          })
        })

      return member
    },
    requestToJoin: async (root, { collabId }, { user, models, pubsub }) => {
      const { Collab, Notification } = models
      const request = await Collab.requestToJoin(collabId, user.id)
      const collab = await Collab.findByPk(request.collabId)

      if (!collab) {
        throw new Error('Collab not found')
      }

      Notification.newCollabMemberRequestNotification(
        collab.ownerId,
        request.id,
      )
        .then(formatNotification)
        .then(newNotification => {
          pubsub.publish('NEW_NOTIFICATION', {
            newNotification,
          })
        })

      return true
    },
    toggleAcceptInvites: (root, { collabId }, { user, models }) =>
      models.Collab.toggleAcceptInvites(collabId, user.id),
    declineMemberRequest: (root, { collabId, memberId }, { user, models }) =>
      models.Collab.declineMemberRequest(collabId, memberId, user.id),
    cancelRequestToJoin: (root, { collabId }, { user, models }) =>
      models.Collab.cancelRequestToJoin(collabId, user!.id),
  },
  Collab: {
    owner: async ({ ownerId }, args, { loaders }) => {
      const collabOwner = await loaders.userLoader.load(ownerId)
      return collabOwner!
    },
    isOwner: ({ ownerId }, args, { user }) => user?.id === ownerId,
    isMember: async ({ id }, args, { user, models }) => {
      if (!user?.id) {
        return false
      }

      const isMember = await models.CollabMember.findOne({
        where: { collabId: id, memberId: user.id },
      })

      return Boolean(isMember)
    },
    invitationPending: async ({ id }, args, { user, models }) => {
      if (!user?.id) {
        return false
      }

      const invitation = await models.CollabMemberRequest.findOne({
        where: { collabId: id, memberId: user.id, type: 'invitation' },
      })

      return Boolean(invitation)
    },
    requestToJoinPending: async ({ id }, args, { user, models }) => {
      if (!user?.id) {
        return false
      }

      const invitation = await models.CollabMemberRequest.findOne({
        where: { collabId: id, memberId: user.id, type: 'request' },
      })

      return Boolean(invitation)
    },
    members: async ({ id }, args, { loaders, models }) => {
      const members = await models.CollabMember.findAll({
        where: { collabId: id },
        attributes: ['memberId'],
      })

      const memberIds = members.map(({ memberId }) => memberId)
      const users = await loaders.userLoader.loadMany(memberIds)
      return users.map(replaceErrorWithNull) as GQLUser[]
    },
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
    discussionThreads: ({ id }, args, { models }) =>
      models.CollabDiscussionThread.findAll({ where: { collabId: id } }),
    taskList: ({ id }, args, { models }) =>
      models.CollabTaskList.findAll({ where: { collabId: id } }),
  },
}

export const collabMiddleware = {
  Mutation: {
    deleteCollab: and(isAuthenticated),
    acceptMemberRequest: and(isAuthenticated),
    removeMember: and(isAuthenticated),
    inviteMember: and(isAuthenticated),
    requestToJoin: and(isAuthenticated),
    toggleAcceptInvites: and(isAuthenticated),
    declineMemberRequest: and(isAuthenticated),
  },
}
