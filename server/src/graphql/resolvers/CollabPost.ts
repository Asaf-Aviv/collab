import { isAuthenticated } from './../middleware/isAuthenticated'
import { and } from 'graphql-shield'
import { Op } from 'sequelize'
import { Resolvers, Reaction } from '../types'
import { replaceErrorWithNull } from '../helpers/replaceErrorWithNull'
import { differenceInDays } from 'date-fns'
import { Sequelize } from 'sequelize-typescript'
import { GQLCollabPost } from '../../db/models/CollabPost'

export const collabPostResolver: Resolvers = {
  Query: {
    collabPosts: async (root, { offset, limit }, { models }) => {
      console.log(offset, limit)
      const posts = await models.CollabPost.findAll({
        order: [
          ['created_at', 'desc'],
          ['id', 'desc'],
        ],
        offset,
        limit: limit + 1,
      })

      return {
        posts: posts.slice(0, limit) as GQLCollabPost[],
        hasNextPage: posts.length > limit,
      }
    },
    collabPost: (root, { postId }, { models }) =>
      models.CollabPost.findByPk(postId),
    languages: (root, args, { models }) =>
      models.Language.findAll().then(languages =>
        languages.map(({ name }) => name),
      ),
    collabPostsByStack: async (
      root,
      { stack: requestedStack, offset, limit },
      { models },
    ) => {
      const stack = await models.Stack.findOne({
        where: { name: requestedStack },
      })

      if (!stack) {
        throw new Error('Stack not found')
      }

      const postsByStack = await models.CollabPostStack.findAll({
        where: { stackId: stack.id },
        attributes: ['postId'],
        include: [{ model: models.CollabPost }],
        order: [
          [{ model: models.CollabPost, as: 'post' }, 'createdAt', 'DESC'],
        ],
        offset,
        limit: limit + 1,
      })

      const posts = postsByStack.map(stack => stack.post)

      return {
        posts: posts.slice(0, limit),
        hasNextPage: posts.length > limit,
      }
    },
    searchPostsByTitle: async (root, { input }, { models }) => {
      const { title, limit, offset } = input
      const posts = await models.CollabPost.findAll({
        where: {
          title: {
            [Op.iLike]: `%${title}%`,
          },
        },
        offset,
        limit: limit + 1,
      })

      return {
        posts: posts.slice(0, limit),
        hasNextPage: posts.length > limit,
      }
    },
    advancedPostsSearch: (root, { input }, { models }) =>
      models.CollabPost.search(input),
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
    languages: async ({ id }, args, { models }) => {
      const languages = await models.CollabPostLanguage.findAll({
        where: { postId: id },
      })
      return languages.map(({ languageName }) => languageName)
    },
    membersCount: ({ collabId }, args, { models }) =>
      models.CollabMember.count({ where: { collabId } }),
    stack: async ({ id }, args, { models }) => {
      const postStack = await models.CollabPostStack.findAll({
        where: { postId: id },
        attributes: [],
        include: [{ model: models.Stack, attributes: ['name'] }],
      })
      return postStack.map(({ stack }) => stack.name)
    },
    reactions: ({ id }, args, { models, user }) =>
      (models.CollabPostReaction.findAll({
        where: { postId: id },
        group: ['emojiId'],
        attributes: [
          'emojiId',
          [Sequelize.fn('COUNT', '*'), 'count'],
          Sequelize.literal(
            `'${user?.id}' = ANY(array_agg(user_id)) as "isLiked"`,
          ) as any,
        ],
        order: [['count', 'DESC']],
        raw: true,
      }) as unknown) as Reaction[],
    reactionsCount: ({ id }, args, { models }) =>
      models.CollabPostReaction.count({ where: { postId: id } }),
    acceptsInvites: async ({ collabId }, args, { loaders }) => {
      const collab = await loaders.collabLoader.load(collabId)
      return collab!.acceptsInvites
    },
    commentsCount: ({ id }, args, { models }) =>
      models.CollabPostComment.count({ where: { postId: id } }),
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
    isNew: ({ createdAt }) => differenceInDays(new Date(), createdAt) <= 7,
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
  },
}
