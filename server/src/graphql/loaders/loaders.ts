import Dataloader from 'dataloader'
import { Collab } from '../../db/models/Collab'
import { User } from '../../db/models/User'
import { find } from 'lodash'

const createUserLoader = () =>
  new Dataloader<string, User | null>(async ids => {
    const users = await User.findAll({ where: { id: ids as string[] } })
    return ids.map(id => find(users, { id }) || null)
  })

const createCollabLoader = () =>
  new Dataloader<string, Collab | null>(async ids => {
    const users = await Collab.findAll({ where: { id: ids as string[] } })
    return ids.map(id => find(users, { id }) || null)
  })

export const createLoaders = () => ({
  userLoader: createUserLoader(),
  collabLoader: createCollabLoader(),
})
