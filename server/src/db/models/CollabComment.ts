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
import { Collab } from './Collab'
import { User } from './User'

@Table({ tableName: 'collab_comments' })
export class CollabComment extends Model<CollabComment> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, { foreignKey: 'collabId', onDelete: 'CASCADE' })
  collab!: Collab

  @ForeignKey(() => User)
  @Column
  authorId!: string

  @BelongsTo(() => User, { foreignKey: 'authorId', onDelete: 'CASCADE' })
  author!: User

  @Column
  content!: string

  static async addComment(content: string, authorId: string, collabId: string) {
    const [collab, user] = await Promise.all([
      Collab.findByPk(collabId),
      User.findByPk(authorId),
    ])

    if (!collab) {
      throw new Error('Collab not found')
    }

    if (!user) {
      throw new Error('User not found, Please login to comment')
    }

    return this.create({
      content,
      authorId,
      collabId,
    })
  }

  static async deleteComment(commentId: string, authorId: string) {
    const comment = await this.findByPk(commentId)

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.get('authorId') !== authorId) {
      throw new Error('Unauthorized')
    }

    await comment.destroy()

    return true
  }
}
