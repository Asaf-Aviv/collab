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
  CreatedAt,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { User } from './User'
import { CollabPost } from './CollabPost'

@Table({ tableName: 'collab_post_comments' })
export class CollabPostComment extends Model<CollabPostComment> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @ForeignKey(() => CollabPost)
  @Column
  postId!: string

  @BelongsTo(() => CollabPost, { foreignKey: 'postId', onDelete: 'CASCADE' })
  post!: CollabPost

  @ForeignKey(() => User)
  @Column
  authorId!: string

  @BelongsTo(() => User, { foreignKey: 'authorId', onDelete: 'CASCADE' })
  author!: User

  @Column
  content!: string

  @CreatedAt
  creationDate!: Date

  static async createComment(
    content: string,
    authorId: string,
    postId: string,
  ) {
    const [post, user] = await Promise.all([
      CollabPost.findByPk(postId),
      User.findByPk(authorId),
    ])

    if (!post) {
      throw new Error('Post not found')
    }

    if (!user) {
      throw new Error('User not found, Please login to comment')
    }

    return this.create({
      content,
      authorId,
      postId,
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

export type GQLCollabPostComment = GQLResolverTypes<
  CollabPostComment,
  'author' | 'post'
>
