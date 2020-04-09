const { seededUsers, asaf } = require('../mocks/users')

const friendRequests = seededUsers
  .filter(user => user !== asaf)
  .map(user => ({
    sender_id: user.id,
    receiver_id: asaf.id,
    created_at: new Date(),
    updated_at: new Date(),
  }))

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
      .catch(err => {
        console.log(err.parent)
      }),
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
}
