import { Model } from 'sequelize-typescript'

type X = keyof OmitMethods<Model>

type DataPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

type DataPropertiesOnly<T> = {
  [P in DataPropertyNames<T>]: T[P] extends object ? DTO<T[P]> : T[P]
}

export type DTO<T> = DataPropertiesOnly<T>

type Bar = DTO<Model>

type OmitMethods<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? P : never
}[keyof T]

export type GQLResolverTypes<T, K extends keyof Omit<T, keyof Model>> = Omit<
  T,
  keyof Model | K
> & { id: string }
// export type GQLResolverTypes<T, K extends keyof DTO<T> & keyof T> = Omit<
//   DTO<T>,
//   K
// >
