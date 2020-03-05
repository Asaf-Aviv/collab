import { CollabMember } from './CollabMember'
import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
  Default,
  BelongsTo,
  IsUUID,
} from 'sequelize-typescript'
import uuid from 'uuid/v4'
import { User } from './User'
import { CollabTask } from './CollabTask'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'

@Table({ tableName: 'collab_task_comments' })
export class CollabTaskComment extends Model<CollabTaskComment> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @ForeignKey(() => CollabTask)
  @Column
  taskId!: string

  @BelongsTo(() => CollabTask, {
    foreignKey: 'collabTaskId',
    onDelete: 'CASCADE',
  })
  task!: CollabTask

  @ForeignKey(() => User)
  @Column
  authorId!: string

  @BelongsTo(() => User, { foreignKey: 'authorId', onDelete: 'CASCADE' })
  author!: User

  @Column
  content!: string

  static async createComment(
    collabId: string,
    content: string,
    authorId: string,
    taskId: string
  ) {
    const [task, isMemberOfCollab] = await Promise.all([
      CollabTask.findByPk(taskId),
      CollabMember.findOne({ where: { collabId, memberId: authorId } }),
    ])

    if (!task) {
      throw new Error('Task not found')
    }
    if (!isMemberOfCollab) {
      throw new Error('You are not a member of this Collab')
    }

    return this.create({
      taskId,
      content,
      authorId,
    })
  }

  static async deleteComment(commentId: string, authorId: string) {
    const comment = await this.findByPk(commentId)

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.authorId !== authorId) {
      throw new Error('You are not the author of this comment')
    }

    await comment.destroy()

    return true
  }
}

export type GQLCollabTaskComment = GQLResolverTypes<
  CollabTaskComment,
  'author' | 'task'
>
