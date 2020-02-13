const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const faker = require('faker')

const generageUser = () => ({
  id: uuid(),
  username: faker.name
    .findName()
    .replace(/[\W_]+/g, '')
    .slice(0, 16),
  email: faker.internet.email().toLocaleLowerCase(),
  password: bcrypt.hashSync('test1234', 12),
  updated_at: new Date(),
  created_at: new Date(),
})

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .bulkInsert(
        'users',
        [...Array(10)].map(generageUser).concat({
          id: uuid(),
          username: 'AsafAviv',
          email: 'asafaviv89@gmail.com',
          password: bcrypt.hashSync('test1234', 12),
          updated_at: new Date(),
          created_at: new Date(),
        })
      )
      .catch(console.error),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}).catch(console.error),
}
