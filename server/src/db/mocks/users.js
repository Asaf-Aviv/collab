const bcrypt = require('bcrypt')
const faker = require('faker')
const _ = require('lodash')

const generageUser = (__, i) => ({
  id: String(i + 2),
  username: faker.name
    .findName()
    .replace(/[\W_]+/g, '')
    .slice(0, 16),
  email: `test${i}@test.com`,
  bio: faker.random.words(_.random(5, 10)),
  password: bcrypt.hashSync('test1234', 12),
  updated_at: new Date(),
  creation_date: new Date(),
  avatar: null,
})

const asaf = {
  id: '1',
  username: 'AsafAviv',
  email: 'asafaviv89@gmail.com',
  bio: faker.random.words(_.random(5, 10)),
  password: bcrypt.hashSync('test1234', 12),
  updated_at: new Date(),
  creation_date: new Date(),
  avatar: null,
}

const seededUsers = [...Array(50)].map(generageUser).concat(asaf)

module.exports = {
  asaf,
  seededUsers,
}
