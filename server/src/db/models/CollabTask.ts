import { GQLResolverTypes } from './../../graphql/helpers/GQLResolverTypes'
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
import { CollabMember } from './CollabMember'

@Table({ tableName: 'collab_tasks' })
export class CollabTask extends Model<CollabTask> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @Column
  description!: string

  @ForeignKey(() => User)
  @Column
  authorId!: string

  @BelongsTo(() => User, { foreignKey: 'authorId', onDelete: 'CASCADE' })
  author!: User

  @ForeignKey(() => CollabTaskList)
  @Column
  taskListId!: string

  @BelongsTo(() => CollabTaskList, {
    foreignKey: 'taskListId',
    onDelete: 'CASCADE',
  })
  taskList!: CollabTaskList

  @HasMany(() => CollabTaskComment)
  comments!: CollabTaskComment[]

  static async createTask(
    collabId: string,
    taskListId: string,
    description: string,
    authorId: string,
  ) {
    const isMember = await CollabMember.findOne({
      where: { collabId, memberId: authorId },
    })

    if (!isMember) {
      throw new Error('You are not a member of this Collab')
    }

    return this.create({ description, authorId, taskListId })
  }

  static async deleteTask(taskId: string, authorId: string) {
    const task = await this.findByPk(taskId)

    if (!task) {
      throw new Error('Task not found')
    }
    if (task.authorId !== authorId) {
      throw new Error('You are not the author of this Task')
    }

    await task.destroy()

    return true
  }
}

export type GQLCollabTask = GQLResolverTypes<
  CollabTask,
  'author' | 'comments' | 'taskList'
>
