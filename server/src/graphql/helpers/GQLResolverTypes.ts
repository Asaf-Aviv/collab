import { Model } from 'sequelize-typescript'

export type GQLResolverTypes<T, K extends keyof Omit<T, keyof Model>> = Omit<
  T,
  keyof Model | K
> & { id: string }
