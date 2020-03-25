const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const faker = require('faker')
const _ = require('lodash')

const generageUser = () => ({
  id: uuid(),
  username: faker.name
    .findName()
    .replace(/[\W_]+/g, '')
    .slice(0, 16),
  email: faker.internet.email().toLocaleLowerCase(),
  bio: faker.random.words(_.random(5, 10)),
  password: bcrypt.hashSync('test1234', 12),
  updated_at: new Date(),
  created_at: new Date(),
  avatar: 'https://randomuser.me/api/portraits/women/82.jpg',
})

const asaf = {
  id: '6d480813-c854-40fc-a3cf-cea0944854ab',
  username: 'AsafAviv',
  email: 'asafaviv89@gmail.com',
  bio: faker.random.words(_.random(5, 10)),
  password: bcrypt.hashSync('test1234', 12),
  updated_at: new Date(),
  created_at: new Date(),
  avatar: 'https://randomuser.me/api/portraits/women/82.jpg',
}

const seededUsers = [...Array(10)].map(generageUser).concat(asaf)

module.exports = {
  asaf,
  seededUsers,
}
