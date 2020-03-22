const { stacks } = require('../mocks/stacks')

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert({ tableName: 'stacks' }, stacks).catch(err => {
      console.log(err.parent)
    }),
  down: queryInterface => queryInterface.bulkDelete('stacks', null, {}),
}
