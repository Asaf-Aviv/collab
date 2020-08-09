import Dataloader from 'dataloader'
import { find } from 'lodash'
import { Collab } from '../../db/models/Collab'
import { User } from '../../db/models/User'

const createUserLoader = () =>
  new Dataloader<string, User | null>(async ids => {
    const users = await User.findAll({ where: { id: ids as string[] } })
    return ids.map(id => find(users, { id }) || null) as (User | null)[]
  })

const createCollabLoader = () =>
  new Dataloader<string, Collab | null>(async ids => {
    const collabs = await Collab.findAll({ where: { id: ids as string[] } })

    return ids.map(id => find(collabs, { id }) || null) as (Collab | null)[]
  })

export const createLoaders = () => ({
  userLoader: createUserLoader(),
  collabLoader: createCollabLoader(),
})

export type Loaders = ReturnType<typeof createLoaders>
