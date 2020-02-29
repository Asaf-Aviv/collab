const uuid = require('uuid/v4')
const faker = require('faker')
const { asaf, seededUsers } = require('../mocks/users')
const _ = require('lodash')

const generageCollab = () => ({
  id: uuid(),
  owner_id: _.sample(seededUsers).id,
  name: faker.lorem.words(3),
  title: faker.lorem.words(7),
  description: faker.lorem.words(3),
  stack: [...Array(5)].map(faker.lorem.word),
  experience: 'JUNIOR',
  updated_at: new Date(),
  created_at: new Date(),
})

const asafCollab = {
  id: uuid(),
  owner_id: asaf.id,
  name: faker.lorem.words(3),
  title: faker.lorem.words(7),
  description: faker.lorem.words(3),
  stack: [...Array(5)].map(faker.lorem.word),
  experience: 'JUNIOR',
  updated_at: new Date(),
  created_at: new Date(),
}

const seededCollabs = [...Array(10)].map(generageCollab).concat(asafCollab)
const owners = seededCollabs.map(({ id, owner_id }) => ({
  collab_id: id,
  is_owner: true,
  member_id: owner_id,
  updated_at: new Date(),
  created_at: new Date(),
}))

const comments = _.flatten(
  seededCollabs.map(({ id }) =>
    [...Array(15)].map(() => ({
      id: uuid(),
      collab_id: id,
      author_id: _.sample(seededUsers).id,
      content: faker.lorem.words(_.random(5, 14)),
      updated_at: new Date(),
      created_at: new Date(),
    })),
  ),
)

const memberInvitations = _.flatten(
  seededCollabs.map(({ id, owner_id }) =>
    _.take(
      _.filter(seededUsers, ({ id }) => id !== owner_id),
      _.random(1, 4),
    ).map(({ id: userId }) => ({
      collab_id: id,
      type: 'invitation',
      member_id: userId,
      updated_at: new Date(),
      created_at: new Date(),
    })),
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
      _.random(1, 4),
    ).map(({ id: userId }) => ({
      collab_id,
      type: 'request',
      member_id: userId,
      updated_at: new Date(),
      created_at: new Date(),
    })),
  ),
)

const allInvites = memberInvitations.concat(memberRequests)

module.exports = {
  up: queryInterface =>
    queryInterface
      .bulkInsert({ tableName: 'collabs' }, seededCollabs)
      .then(() => queryInterface.bulkInsert({ tableName: 'collab_members' }, owners))
      .then(() => queryInterface.bulkInsert({ tableName: 'collab_comments' }, comments))
      .then(() =>
        queryInterface.bulkInsert({ tableName: 'collab_member_requests' }, allInvites),
      )
      .catch(err => {
        console.log(err.message)
      }),
  down: queryInterface => queryInterface.bulkDelete('collabs', null, {}),
}
