import Dataloader from 'dataloader'
import { User } from '../../db/models/User'
import { find } from 'lodash'

const createUserLoader = () =>
  new Dataloader<string, User | null>(async ids => {
    const users = await User.findAll({ where: { id: ids as string[] } })
    return ids.map(id => find(users, { id }) || null)
  })

export const createLoaders = () => ({
  userLoader: createUserLoader(),
})
