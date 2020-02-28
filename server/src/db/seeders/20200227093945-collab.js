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

module.exports = {
  up: queryInterface =>
    queryInterface
      .bulkInsert({ tableName: 'collabs' }, seededCollabs)
      .catch(err => {
        console.log(err.message)
      }),
  down: queryInterface => queryInterface.bulkDelete('collabs', null, {}),
}
