import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
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
import { v4 as uuid } from 'uuid'
import { Collab } from './Collab'
import { User } from './User'
import { CollabMember } from './CollabMember'
import { CollabDiscussionThread } from './CollabDiscussionThread'
import { AddDiscussionThreadCommentInput } from '../../graphql/types'

@Table({ tableName: 'collab_discussion_thread_comments' })
export class CollabDiscussionThreadComment extends Model<
  CollabDiscussionThreadComment
> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @Column
  content!: string

  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, { foreignKey: 'collabId', onDelete: 'CASCADE' })
  collab!: Collab

  @ForeignKey(() => CollabDiscussionThread)
  @Column
  threadId!: string

  @BelongsTo(() => CollabDiscussionThread, {
    foreignKey: 'threadId',
    onDelete: 'CASCADE',
  })
  thread!: CollabDiscussionThread

  @ForeignKey(() => User)
  @Column
  authorId!: string

  @BelongsTo(() => User, { foreignKey: 'authorId', onDelete: 'CASCADE' })
  author!: User

  static async createComment(
    input: AddDiscussionThreadCommentInput,
    authorId: string,
  ) {
    const { collabId } = input

    const isMember = await CollabMember.findOne({
      where: { collabId, memberId: authorId },
    })

    if (!isMember) {
      throw new Error('You are not a member of this Collab')
    }

    return this.create({
      ...input,
      authorId,
    })
  }

  static async deleteComment(commentId: string, authorId: string) {
    const comment = await this.findByPk(commentId)

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.get('authorId') !== authorId) {
      throw new Error('You are not the author of this comment')
    }

    await comment.destroy()

    return true
  }
}

export type GQLCollabDiscussionThreadComment = GQLResolverTypes<
  CollabDiscussionThreadComment,
  'collab' | 'author' | 'thread'
>
