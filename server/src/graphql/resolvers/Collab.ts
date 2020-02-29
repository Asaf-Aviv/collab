import { CollabMemberRequest } from '../../db/models/CollabMemberRequest'
import { CollabMember } from './../../db/models/CollabMember'
import { CollabComment } from './../../db/models/CollabComment'
import { Collab } from '../../db/models/Collab'
import { Resolvers } from '../types'
import { User } from '../../db/models/User'
import { assertUserInContext } from '../helpers/assertUserInContext'
import { AuthenticationError } from 'apollo-server-express'

const isAuthenticared = (...args: any[]) => {
  const context = args[2]
  if (!context.user) {
    throw new AuthenticationError('Unauthorized')
  }
  return
}

const collabResolver: Resolvers = {
  Query: {
    collabs: () => Collab.findAll(),
    collab: (parent, { collabId }) => Collab.getCollab(collabId),
  },
  Mutation: {
    createCollab: async (parent, { collab }, context) => {
      assertUserInContext(context)
      return Collab.createCollab(collab, context.user.get('id'))
    },
    deleteCollab: (parent, { collabId }) => Collab.deleteCollab(collabId),
    addMember: (parent, { collabId, memberId }, context) =>
      Collab.addMember(collabId, context.user.get('id'), memberId),
    removeMember: (parent, { collabId, memberId }, context) =>
      Collab.removeMember(collabId, context.user.get('id'), memberId),
    addComment: (parent, { content, collabId }, context) =>
      CollabComment.addComment(content, context.user.get('id'), collabId),
    deleteComment: (parent, { commentId }, context) =>
      CollabComment.deleteComment(commentId, context.user.get('id')),
    inviteMember: (parent, { collabId, memberId }, context) =>
      Collab.inviteMember(context.user.get('id'), memberId, collabId),
    requestToJoin: (parent, { collabId }, context) =>
      Collab.requestToJoin(collabId, context.user.get('id')),
  },
  Collab: {
    owner: ({ ownerId }, args, { userLoader }) =>
      userLoader.load(ownerId) as Promise<User>,
    members: async ({ id }) => {
      const members = await CollabMember.findAll({
        where: { collabId: id },
        attributes: [],
        include: [User],
      })
      return members.map(({ member }) => member)
    },
    comments: ({ id }) => CollabComment.findAll({ where: { collabId: id } }),
    pendingInvites: async ({ id }) => {
      const pendingInviteMembers = await CollabMemberRequest.findAll({
        where: { collabId: id },
        attributes: [],
        include: [User],
      })
      console.log(pendingInviteMembers)
      return pendingInviteMembers.map(({ member }) => member)
    },
  },
  CollabComment: {
    author: ({ authorId }) => User.findByPk(authorId) as Promise<User>,
    collab: ({ collabId }) => Collab.findByPk(collabId) as Promise<Collab>,
  },
}

export default collabResolver
