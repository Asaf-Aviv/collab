import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
  Default,
  BelongsTo,
  IsUUID,
  HasMany,
} from 'sequelize-typescript'
import uuid from 'uuid/v4'
import { Collab } from './Collab'
import { CollabTask } from './CollabTask'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'

@Table({ tableName: 'collab_task_list', timestamps: false })
export class CollabTaskList extends Model<CollabTaskList> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @Column
  name!: string

  @Column
  order!: number

  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, { foreignKey: 'collabId', onDelete: 'CASCADE' })
  collab!: Collab

  @HasMany(() => CollabTask)
  tasks!: CollabTask[]
}

export type GQLCollabTaskList = GQLResolverTypes<
  CollabTaskList,
  'collab' | 'tasks'
>
