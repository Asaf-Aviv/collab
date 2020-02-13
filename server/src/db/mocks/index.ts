import { SignupArgs, CollabArgs, Experience } from '../../graphql/types'
import faker from 'faker'

export const mockedUsers: SignupArgs[] = [...Array(10)].map(() => ({
  username: faker.name
    .findName()
    .replace(/[\W_]+/g, '')
    .slice(0, 16),
  email: faker.internet.email().toLocaleLowerCase(),
  password: 'test1234',
}))

export const mockedCollabs: CollabArgs[] = [...Array(3)].map((_, i) => ({
  description: `collab number ${i}`,
  stack: ['React', 'TypeScript'],
  experience: 'JUNIOR' as Experience,
}))
