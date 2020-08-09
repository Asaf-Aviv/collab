import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
  Default,
  BelongsTo,
  IsUUID,
  CreatedAt,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { CollabMember } from './CollabMember'
import { User } from './User'
import { CollabTask } from './CollabTask'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { CreateTaskCommentInput } from '../../graphql/types'

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
    foreignKey: 'taskId',
    onDelete: 'CASCADE',
  })
  task!: CollabTask

  @ForeignKey(() => User)
  @Column
  authorId!: string

  @BelongsTo(() => User, { foreignKey: 'authorId', onDelete: 'CASCADE' })
  author!: User

  @CreatedAt
  creationDate!: Date

  @Column
  content!: string

  static async createComment(input: CreateTaskCommentInput, userId: string) {
    const { collabId, taskId, content } = input

    const [task, isMemberOfCollab] = await Promise.all([
      CollabTask.findByPk(taskId),
      CollabMember.findOne({ where: { collabId, memberId: userId } }),
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
      authorId: userId,
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
