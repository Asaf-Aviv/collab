const { v4: uuid } = require('uuid')
const { seededUsers, asaf } = require('../mocks/users')

const friendRequests = seededUsers
  .filter(user => user !== asaf)
  .map(user => ({
    id: uuid(),
    sender_id: user.id,
    receiver_id: asaf.id,
    creation_date: new Date(),
    updated_at: new Date(),
  }))

// const friends = seededUsers.flatMap(user =>
//   seededUsers
//     .filter(x => x !== user)
//     .map(user2 => ({
//       id: uuid(),
//       user_id: user.id,
//       friend_id: user2.id,
//       creation_date: new Date(),
//       updated_at: new Date(),
//     })),
// )

const messages = seededUsers
  .map(user =>
    seededUsers
      .filter(x => x !== user)
      .map(user2 =>
        [...Array(2)].map(() => ({
          id: uuid(),
          author_id: user.id,
          recipient_id: user2.id,
          content: `hello ${user.username} from ${user2.username}`,
          creation_date: new Date(),
        })),
      ),
  )
  .flat(Infinity)

module.exports = {
  up: queryInterface =>
    queryInterface
      .bulkInsert({ tableName: 'users' }, seededUsers)
      .then(() =>
        queryInterface.bulkInsert(
          { tableName: 'user_friendship_requests' },
          friendRequests,
        ),
      )
      // .then(() =>
      //   queryInterface.bulkInsert({ tableName: 'user_friendships' }, friends),
      // )
      .then(() =>
        queryInterface.bulkInsert({ tableName: 'private_messages' }, messages),
      )
      .catch(err => {
        console.log(err)
      }),
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
}
