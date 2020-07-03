const { v4: uuid } = require('uuid')
const faker = require('faker')
const {
  seededCollabs,
  collabOwners,
  collabThreads,
  threadComments,
  allInvites,
} = require('../mocks/collabs')
const _ = require('lodash')

const createTaskList = (index, collabId) => ({
  id: uuid(),
  collab_id: collabId,
  name: faker.random.words(_.random(1, 3)),
  order: index,
})

const createRandomTaskListLength = collabId =>
  [...Array(_.random(1, 6)).keys()].map(index =>
    createTaskList(index, collabId),
  )

const collabTaskLists = _.flatten(
  seededCollabs.map(({ id }) => createRandomTaskListLength(id)),
)

const createCollabTask = (listId, collabId, index) => ({
  id: uuid(),
  task_list_id: listId,
  collab_id: collabId,
  author_id: seededCollabs.find(
    x => x.id === collabTaskLists.find(x => x.id === listId).collab_id,
  ).owner_id,
  description: faker.random.words(_.random(5, 15)),
  updated_at: new Date(),
  creation_date: new Date(),
  order: index,
})

const createRandomTaskLength = (listId, collabId) =>
  [...Array(_.random(3, 12))].map((_, i) =>
    createCollabTask(listId, collabId, i),
  )

const collabTasks = _.flatten(
  collabTaskLists.map(({ id, collab_id }) =>
    createRandomTaskLength(id, collab_id),
  ),
)

const createTaskComment = (task_id, author_id) => ({
  id: uuid(),
  task_id,
  author_id,
  content: faker.random.words(_.random(4, 10)),
  updated_at: new Date(),
  creation_date: new Date(),
})

const createRandomTaskCommentLength = (task_id, author_id) =>
  [...Array(_.random(2, 6))].map(() => createTaskComment(task_id, author_id))

const collabTaskComments = _.flatten(
  collabTasks.map(({ id, author_id }) =>
    createRandomTaskCommentLength(id, author_id),
  ),
)

module.exports = {
  up: queryInterface =>
    queryInterface
      .bulkInsert({ tableName: 'collabs' }, seededCollabs)
      .then(() =>
        queryInterface.bulkInsert(
          { tableName: 'collab_members' },
          collabOwners,
        ),
      )
      .then(() =>
        queryInterface.bulkInsert(
          { tableName: 'collab_member_requests' },
          allInvites,
        ),
      )
      .then(() =>
        queryInterface.bulkInsert(
          { tableName: 'collab_task_list' },
          collabTaskLists,
        ),
      )
      .then(() =>
        queryInterface.bulkInsert({ tableName: 'collab_tasks' }, collabTasks),
      )
      .then(() =>
        queryInterface.bulkInsert(
          { tableName: 'collab_task_comments' },
          collabTaskComments,
        ),
      )
      .then(() =>
        queryInterface.bulkInsert(
          { tableName: 'collab_discussion_threads' },
          collabThreads,
        ),
      )
      .then(() =>
        queryInterface.bulkInsert(
          { tableName: 'collab_discussion_thread_comments' },
          threadComments,
        ),
      )
      .catch(err => {
        console.log(err.message)
      }),
  down: queryInterface => queryInterface.bulkDelete('collabs', null, {}),
}
