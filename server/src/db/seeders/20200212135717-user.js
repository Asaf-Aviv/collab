const { seededUsers } = require('../mocks/users')

module.exports = {
  up: queryInterface =>
    queryInterface
      .bulkInsert({ tableName: 'users' }, seededUsers)
      .catch(err => {
        console.log(err.parent)
      }),
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
}
