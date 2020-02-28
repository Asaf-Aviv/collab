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

const asaf = {
  id: '6d480813-c854-40fc-a3cf-cea0944854ab',
  username: 'AsafAviv',
  email: 'asafaviv89@gmail.com',
  password: bcrypt.hashSync('test1234', 12),
  updated_at: new Date(),
  created_at: new Date(),
}

const seededUsers = [...Array(10)].map(generageUser).concat(asaf)

module.exports = {
  asaf,
  seededUsers,
}
