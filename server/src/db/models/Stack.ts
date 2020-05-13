import {
  Model,
  Table,
  Column,
  PrimaryKey,
  IsUUID,
  Default,
  Unique,
  DataType,
  BeforeValidate,
  HasMany,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { CollabPostStack } from './CollabPostStack'

@Table({ tableName: 'stacks', timestamps: false })
export class Stack extends Model<Stack> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string

  @Unique
  @Column(DataType.CITEXT)
  name!: string

  @HasMany(() => CollabPostStack)
  collabPost!: CollabPostStack[]

  @BeforeValidate
  static trimName(instance: Stack) {
    instance.name = instance.name.trim()
  }
}
