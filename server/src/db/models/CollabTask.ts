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
import { CollabTaskList } from './CollabTaskList'
import { CollabTaskComment } from './CollabTaskComment'
import { User } from './User'

@Table({ tableName: 'collab_tasks' })
export class CollabTask extends Model<CollabTask> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @Column
  description!: string

  @ForeignKey(() => CollabTaskList)
  @Column
  taskListId!: string

  @ForeignKey(() => User)
  @Column
  authorId!: string

  @BelongsTo(() => User, { foreignKey: 'authorId', onDelete: 'CASCADE' })
  author!: User

  @BelongsTo(() => CollabTaskList, {
    foreignKey: 'taskListId',
    onDelete: 'CASCADE',
  })
  taskList!: CollabTaskList

  @HasMany(() => CollabTaskComment)
  comments!: CollabTaskComment[]
}
