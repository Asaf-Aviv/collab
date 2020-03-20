const fs = require('fs')
const path = require('path')

const languages = fs
  .readFileSync(path.resolve(__dirname, '../../data/languages.csv'), 'utf8')
  .split('\r\n')
  .map(name => ({ name }))

module.exports = {
  up: queryInterface =>
    queryInterface
      .bulkInsert({ tableName: 'languages' }, languages)
      .catch(err => {
        console.log(err.parent)
      }),
  down: queryInterface => queryInterface.bulkDelete('languages', null, {}),
}
