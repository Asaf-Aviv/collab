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
  CreatedAt,
} from 'sequelize-typescript'
import { Op } from 'sequelize'
import { v4 as uuid } from 'uuid'
import { CollabTaskList } from './CollabTaskList'
import { CollabTaskComment } from './CollabTaskComment'
import { User } from './User'
import { GQLResolverTypes } from './../../graphql/helpers/GQLResolverTypes'
import { CollabMember } from './CollabMember'
import { Collab } from './Collab'
import {
  UpdateTaskPositionInput,
  MoveTaskToListInput,
  CreateTaskInput,
  UpdateTaskAssigneeInput,
  UpdateTaskInput,
} from '../../graphql/types'

@Table({ tableName: 'collab_tasks' })
export class CollabTask extends Model<CollabTask> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column({ unique: 'unique_index' })
  id!: string

  @Column
  description!: string

  // the order of the task
  @Column({ unique: 'unique_index' })
  order!: number

  @ForeignKey(() => User)
  @Column
  authorId!: string

  @CreatedAt
  creationDate!: Date

  @BelongsTo(() => User, { foreignKey: 'authorId', onDelete: 'CASCADE' })
  author!: User

  @ForeignKey(() => User)
  @Column
  assigneeId!: string

  @BelongsTo(() => User, { foreignKey: 'assigneeId', onDelete: 'SET NULL' })
  assignee!: User

  @ForeignKey(() => User)
  @Column
  assignedById!: string

  @BelongsTo(() => User, { foreignKey: 'assignedById' })
  assignedBy!: User

  @ForeignKey(() => CollabTaskList)
  @Column
  taskListId!: string

  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, {
    foreignKey: 'collabId',
  })
  collab!: Collab

  @BelongsTo(() => CollabTaskList, {
    foreignKey: 'taskListId',
    onDelete: 'CASCADE',
  })
  taskList!: CollabTaskList

  @HasMany(() => CollabTaskComment)
  comments!: CollabTaskComment[]

  static async createTask(input: CreateTaskInput, userId: string) {
    const { collabId, taskListId, description, assigneeId } = input

    const isMember = await CollabMember.findOne({
      where: { collabId, memberId: userId },
    })

    if (!isMember) {
      throw new Error('You are not a member of this Collab')
    }

    const taskPosition = await this.count({ where: { taskListId } })

    return this.create({
      collabId,
      description,
      authorId: userId,
      taskListId,
      order: taskPosition,
      assigneeId,
      assignedById: assigneeId ? userId : null,
    })
  }

  static async updateTask(
    { taskId, description, assigneeId }: UpdateTaskInput,
    userId: string,
  ) {
    const task = await this.findByPk(taskId)

    if (!task) {
      throw new Error('Task not found')
    }

    if (task.authorId !== userId) {
      throw new Error('You are not the author of this Task')
    }

    return task.update({
      description,
      assigneeId,
      assignedById: assigneeId ? userId : null,
    })
  }

  static async updateTaskAssignee(
    input: UpdateTaskAssigneeInput,
    userId: string,
  ) {
    const { taskId, assigneeId } = input

    const task = await this.findByPk(taskId, {
      include: [
        {
          model: Collab,
          where: {
            ownerId: userId,
          },
        },
      ],
    })

    if (!task) {
      throw new Error('Task not found or you are not the owner of this Collab')
    }

    return task.update({ assignedById: userId, assigneeId })
  }

  static async updateTaskPosition(
    input: UpdateTaskPositionInput,
    userId: string,
  ) {
    const { taskListId, oldTaskPosition, newTaskPosition } = input

    const task = await this.findOne({
      where: {
        taskListId,
        order: oldTaskPosition,
      },
      include: [
        {
          model: Collab,
          where: {
            ownerId: userId,
          },
        },
      ],
    })

    if (!task) {
      throw new Error('Task not found or you are not the owner of this Collab')
    }

    return this.sequelize!.transaction(async () => {
      if (oldTaskPosition < newTaskPosition) {
        // @ts-ignore types are missing
        await this.decrement('order', {
          where: {
            taskListId,
            order: {
              [Op.and]: {
                [Op.lte]: newTaskPosition,
                [Op.gt]: oldTaskPosition,
              },
            },
          },
        })
      } else {
        await this.increment('order', {
          where: {
            taskListId,
            order: {
              [Op.and]: {
                [Op.gte]: newTaskPosition,
                [Op.lt]: oldTaskPosition,
              },
            },
          },
        })
      }

      return task.update({ order: newTaskPosition })
    })
  }

  static async moveTaskToList(input: MoveTaskToListInput, userId: string) {
    const {
      oldTaskListId,
      newTaskListId,
      oldTaskPosition,
      newTaskPosition,
    } = input

    const task = await this.findOne({
      where: { taskListId: oldTaskListId, order: oldTaskPosition },
      include: [Collab],
    })

    if (!task) {
      throw new Error('Task not found')
    }

    if (task?.collab.ownerId !== userId) {
      throw new Error('You are not allowed to reorder tasks')
    }

    return this.sequelize!.transaction(async () => {
      await Promise.all([
        // @ts-ignore types are missing
        this.decrement('order', {
          where: {
            taskListId: oldTaskListId,
            order: {
              [Op.gt]: oldTaskPosition,
            },
          },
        }),
        this.increment('order', {
          where: {
            taskListId: newTaskListId,
            order: {
              [Op.gte]: newTaskPosition,
            },
          },
        }),
      ])

      return task.update({ taskListId: newTaskListId, order: newTaskPosition })
    })
  }

  static async deleteTask(taskId: string, userId: string) {
    const task = await this.findByPk(taskId, {
      include: [{ model: Collab, where: { ownerId: userId } }],
    })

    if (!task) {
      throw new Error('Task not found or you are not the owner of this collab')
    }

    return this.sequelize!.transaction(async () => {
      await task.destroy()
      //@ts-ignore types are missing
      await this.decrement('order', {
        where: {
          taskListId: task.taskListId,
          order: {
            [Op.gt]: task.order,
          },
        },
      })
      return true
    })
  }
}

export type GQLCollabTask = GQLResolverTypes<
  CollabTask,
  'author' | 'comments' | 'taskList' | 'assignedBy' | 'assignee'
>
