import { mockedUsers } from '../../mocks'
import sequelize from '../../sequelize'
import { User } from '../User'

beforeAll(async done => {
  await sequelize.sync({ force: true })
  await Promise.all(mockedUsers.map(user => User.createUser(user)))
  done()
})

// beforeEach(() => sequelize.sync({ force: true }))

describe('User model', () => {
  it('should create a user', async done => {
    const response = await User.createUser({
      email: 'test@test.com',
      username: 'Asaki',
      password: 'test1234',
    })

    expect(response).toBeTruthy()
    const user = await User.findOne({ where: { username: 'Asaki' } })
    expect(user).not.toBeNull()
    done()
  })

  it('should login a user', async done => {
    const mockedUser = mockedUsers[0]

    const user = await User.login({
      email: mockedUser.email,
      password: mockedUser.password,
    })

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('username', mockedUser.username)
    expect(user).toHaveProperty('email', mockedUser.email)
    expect(user).toHaveProperty('createdAt')
    expect(user).toHaveProperty('updatedAt')
    done()
  })

  it('should throw when trying to login with a wrong email', async done => {
    const mockedUser = mockedUsers[0]

    try {
      await User.login({
        email: 'notExistedEmail@test.com',
        password: mockedUser.password,
      })
    } catch (e) {
      expect(e.message).toEqual('User not found')
      done()
    }
  })

  it('should throw when trying to login with a wrong password', async done => {
    const mockedUser = mockedUsers[0]

    try {
      await User.login({
        email: mockedUser.email,
        password: 'wrong password',
      })
    } catch (e) {
      expect(e.message).toEqual('Incorrect Credentials')
      done()
    }
  })

  it('should delete a user', async done => {
    const mockedUser = mockedUsers[0]
    const user = await User.findOne({ where: { email: mockedUser.email } })

    const response = await User.deleteUser(user!.id)
    expect(response).toBeTruthy()
    const deleteUser = await User.findByPk(user!.id)
    expect(deleteUser).toBeNull()
    done()
  })

  it('should throw when trying to delete a non existed user', async done => {
    try {
      await User.deleteUser('random-id')
    } catch (err) {
      expect(err.message).toEqual('User not found')
      done()
    }
  })
})
