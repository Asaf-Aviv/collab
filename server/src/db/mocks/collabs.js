const { v4: uuid } = require('uuid')
const faker = require('faker')
const { seededUsers } = require('../mocks/users')
const _ = require('lodash')

const generageCollab = owner_id => ({
  id: uuid(),
  name: faker.lorem.words(3),
  accepts_invites: true,
  owner_id,
  updated_at: new Date(),
  created_at: new Date(),
  collab_post_id: null,
})

const seededCollabs = seededUsers.map(user => generageCollab(user.id))

exports.seededCollabs = seededCollabs

const collabOwners = seededCollabs.map(({ id, owner_id }) => ({
  collab_id: id,
  is_owner: true,
  member_id: owner_id,
  updated_at: new Date(),
  created_at: new Date(),
}))

exports.collabOwners = collabOwners

const memberInvitations = _.flatten(
  seededCollabs.map(({ id, owner_id }) =>
    _.filter(seededUsers, ({ id }) => id !== owner_id).map(
      ({ id: userId }) => ({
        id: uuid(),
        collab_id: id,
        type: 'invitation',
        member_id: userId,
        updated_at: new Date(),
        created_at: new Date(),
      }),
    ),
  ),
)

const memberRequests = _.flatten(
  seededCollabs.map(({ id: collab_id, owner_id }) =>
    _.take(
      _.filter(
        seededUsers,
        ({ id }) =>
          id !== owner_id &&
          !memberInvitations.find(
            invite => invite.collab_id === collab_id && invite.member_id === id,
          ),
      ),
      _.random(2, 7),
    ).map(({ id: userId }) => ({
      id: uuid(),
      collab_id,
      type: 'request',
      member_id: userId,
      updated_at: new Date(),
      created_at: new Date(),
    })),
  ),
)

const allInvites = memberInvitations.concat(memberRequests)
exports.allInvites = allInvites

const createDiscussionThread = (author_id, collab_id) => ({
  id: uuid(),
  title: faker.random.words(_.random(3, 7)),
  author_id,
  collab_id,
  content: faker.random.words(_.random(10, 20)),
  updated_at: new Date(),
  created_at: new Date(),
})

const collabThreads = _.flatten(
  seededCollabs.map(({ id, owner_id }) =>
    _.take([...Array(_.random(2, 10))]).map(() =>
      createDiscussionThread(owner_id, id),
    ),
  ),
)

exports.collabThreads = collabThreads

const createThreadComment = (thread_id, author_id, collab_id) => ({
  id: uuid(),
  content: faker.random.words(_.random(3, 12)),
  collab_id,
  author_id,
  thread_id,
  updated_at: new Date(),
  created_at: new Date(),
})

const threadComments = _.flatten(
  collabThreads.map(({ id, author_id, collab_id }) =>
    createThreadComment(id, author_id, collab_id),
  ),
)

exports.threadComments = threadComments
