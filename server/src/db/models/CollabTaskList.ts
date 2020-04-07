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
import {
  CreateTaskListInput,
  UpdateTaskListPositionInput,
  UpdateTaskListNameInput,
} from '../../graphql/types.d'
import uuid from 'uuid/v4'
import { Collab } from './Collab'
import { CollabTask } from './CollabTask'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { Op } from 'sequelize'

@Table({ tableName: 'collab_task_list', timestamps: false })
export class CollabTaskList extends Model<CollabTaskList> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @Column
  name!: string

  //FIXME: figure out how to update unique order
  @Column
  order!: number

  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, { foreignKey: 'collabId', onDelete: 'CASCADE' })
  collab!: Collab

  @HasMany(() => CollabTask)
  tasks!: CollabTask[]

  static async createTaskList(input: CreateTaskListInput, ownerId: string) {
    const collab = await Collab.findByPk(input.collabId)

    if (!collab) {
      throw new Error('Collab not found')
    }

    //FIXME:
    // if (ownerId !== collab.ownerId) {
    //   throw new Error('You have no permissions to create a task list')
    // }
    const nextPosition = await this.count({
      where: { collabId: input.collabId },
    })
    input.name += nextPosition

    return CollabTaskList.create({
      ...input,
      order: nextPosition,
    })
  }

  static async updateTaskListName(
    { taskListId, name }: UpdateTaskListNameInput,
    userId: string,
  ) {
    const taskList = await this.findByPk(taskListId)

    if (!taskList) {
      throw new Error('Task list not found')
    }

    //FIXME:
    // if (ownerId !== collab.ownerId) {
    //   throw new Error('You have no permissions to create a task list')
    // }

    return taskList.update({ name })
  }

  static async updateTaskListPosition(
    {
      collabId,
      oldTaskListPosition,
      newTaskListPosition,
    }: UpdateTaskListPositionInput,
    userId: string,
  ) {
    const collab = await Collab.findByPk(collabId, {
      attributes: ['ownerId'],
    })

    //FIXME:
    // if (collab.ownerId !== userId) {
    //   throw new Error('You have no permissionsto edit the order of the tasks list')
    // }

    const taskList = await this.findOne({
      where: { collabId, order: oldTaskListPosition },
    })

    if (!taskList) {
      throw new Error('Task list not found')
    }

    return this.sequelize!.transaction(async () => {
      if (oldTaskListPosition < newTaskListPosition) {
        // @ts-ignore types are missing
        await this.decrement('order', {
          where: {
            collabId,
            order: {
              [Op.and]: {
                [Op.lte]: newTaskListPosition,
                [Op.gt]: oldTaskListPosition,
              },
            },
          },
        })
      } else {
        await this.increment('order', {
          where: {
            collabId,
            order: {
              [Op.and]: {
                [Op.gte]: newTaskListPosition,
                [Op.lt]: oldTaskListPosition,
              },
            },
          },
        })
      }

      return taskList.update({ order: newTaskListPosition })
    })
  }

  static async deleteTaskList(taskListId: string, ownerId: string) {
    const taskList = await CollabTaskList.findByPk(taskListId, {
      attributes: ['id', 'order', 'collabId'],
      //FIXME: dont forget to uncomment
      // include: [
      //   {
      //     model: Collab,
      //     where: { ownerId },
      //   },
      // ],
    })

    if (!taskList) {
      throw new Error('Task list not found')
    }

    return this.sequelize!.transaction(async () => {
      await taskList.destroy()
      // @ts-ignore types are missing
      await this.decrement('order', {
        where: {
          collabId: taskList.collabId,
          order: { [Op.gt]: taskList.order },
        },
      })

      return true
    })
  }
}

export type GQLCollabTaskList = GQLResolverTypes<
  CollabTaskList,
  'collab' | 'tasks'
>
