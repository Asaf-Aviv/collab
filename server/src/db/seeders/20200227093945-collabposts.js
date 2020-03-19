const uuid = require('uuid/v4')
const faker = require('faker')
const { seededUsers } = require('../mocks/users')
const { seededCollabs } = require('../mocks/collabs')

const _ = require('lodash')

const generageCollabPost = (collab_id, owner_id) => {
  return {
    id: uuid(),
    name: faker.lorem.words(3),
    title: faker.lorem.words(7),
    experience: 'JUNIOR',
    has_started: false,
    stack: [...Array(5)].map(faker.lorem.word),
    description: faker.lorem.words(60),
    owner_id,
    collab_id,
    updated_at: new Date(),
    created_at: new Date(),
  }
}

const collabPosts = seededCollabs.map(c => generageCollabPost(c.id, c.owner_id))

const comments = _.flatten(
  collabPosts.map(({ id }) =>
    [...Array(15)].map(() => ({
      id: uuid(),
      post_id: id,
      author_id: _.sample(seededUsers).id,
      content: faker.lorem.words(_.random(5, 14)),
      updated_at: new Date(),
      created_at: new Date(),
    })),
  ),
)

module.exports = {
  up: queryInterface =>
    queryInterface
      .bulkInsert({ tableName: 'collab_posts' }, collabPosts)
      .then(() =>
        queryInterface.bulkInsert(
          { tableName: 'collab_post_comments' },
          comments,
        ),
      )
      .catch(err => {
        console.log(err.message)
      }),
  down: queryInterface => queryInterface.bulkDelete('collab_posts', null, {}),
}
