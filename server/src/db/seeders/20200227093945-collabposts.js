const { v4: uuid } = require('uuid')
const _ = require('lodash')
const faker = require('faker')
const { seededUsers } = require('../mocks/users')
const { seededCollabs } = require('../mocks/collabs')
const { stacks } = require('../mocks/stacks')

const generageCollabPost = (collab_id, owner_id) => {
  return {
    id: uuid(),
    name: faker.lorem.words(3),
    title: faker.lorem.words(7),
    experience: 'JUNIOR',
    has_started: false,
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

const postLanguages = _.flatten(
  collabPosts.map(({ id, collab_id }) => ({
    post_id: id,
    collab_id,
    language_name: 'English',
  })),
)

const postStacks = _.flatten(
  collabPosts.map(({ id, collab_id }) => ({
    post_id: id,
    collab_id,
    stack_id: stacks[0].id,
  })),
)

module.exports = {
  up: queryInterface =>
    queryInterface
      .bulkInsert({ tableName: 'collab_posts' }, collabPosts)
      .then(() =>
        queryInterface.bulkInsert(
          { tableName: 'collab_post_languages' },
          postLanguages,
        ),
      )
      .then(() =>
        queryInterface.bulkInsert(
          { tableName: 'collab_post_stack' },
          postStacks,
        ),
      )
      .then(() =>
        queryInterface.bulkInsert(
          { tableName: 'collab_post_comments' },
          comments,
        ),
      )
      .catch(err => {
        console.log(err)
      }),
  down: queryInterface => queryInterface.bulkDelete('collab_posts', null, {}),
}
