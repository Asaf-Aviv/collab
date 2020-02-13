import { mockedUsers } from '../../mocks'
import { Experience } from '../../../graphql/types'
import { Collab } from '../Collab'
import { User } from '../User'
import sequelize from '../../sequelize'

beforeAll(async done => {
  await sequelize.sync({ force: true })
  await Promise.all(mockedUsers.map(user => User.createUser(user)))
  done()
})

describe('Collab model', () => {
  it('should create a collab', async done => {
    const transactionSpy = jest.spyOn(sequelize, 'transaction')

    const mockedUser = mockedUsers[0]
    const user = (await User.findOne({
      where: { email: mockedUser.email },
    })) as User

    const collab = await Collab.createCollab(
      {
        description: 'my first collab',
        experience: 'JUNIOR' as Experience,
        stack: ['TypeScript', 'React'],
      },
      user.id,
    )

    const collabMembers = await collab.getMembers()
    const collabOwner = collabMembers[0]

    expect(transactionSpy).toHaveBeenCalledTimes(1)

    expect(collab).toHaveProperty('id')
    expect(collab).toHaveProperty('ownerId', user.id)
    expect(collab).toHaveProperty('description', 'my first collab')
    expect(collab).toHaveProperty('experience', 'JUNIOR')
    expect(collab).toHaveProperty('stack', ['TypeScript', 'React'])
    expect(collab).toHaveProperty('createdAt')
    expect(collab).toHaveProperty('updatedAt')

    expect(collabOwner).toHaveProperty('collabId', collab.id)
    expect(collabOwner).toHaveProperty('memberId', user.id)
    expect(collabOwner).toHaveProperty('isOwner', true)
    expect(collabOwner).toHaveProperty('createdAt')
    expect(collabOwner).toHaveProperty('updatedAt')
    done()
  })

  it('should throw when an error occurs during collab creation', async done => {
    const collabArgs = {
      description: 'my first collab',
      experience: 'JUNIOR' as Experience,
      stack: ['TypeScript', 'React'],
    }
    try {
      await Collab.createCollab(collabArgs, 'invalid-user-id')
    } catch (err) {
      console.log(err)
      done()
    }
  })

  it('should delete a collab', async done => {
    const mockedUser = mockedUsers[0]
    const user = await User.findOne({ where: { email: mockedUser.email } })

    const collab = await Collab.createCollab(
      {
        description: 'my first collab',
        experience: 'JUNIOR' as Experience,
        stack: ['TypeScript', 'React'],
      },
      user!.id,
    )

    const response = await Collab.deleteCollab(collab.id)
    expect(response).toBeTruthy()
    const deletedCollab = await Collab.findByPk(collab.id)
    expect(deletedCollab).toBeNull()
    done()
  })

  it('should throw when trying to delete a non existed collab', async done => {
    try {
      await Collab.deleteCollab('random-id')
    } catch (err) {
      expect(err.message).toBe('Collab not found')
      done()
    }
  })
})
