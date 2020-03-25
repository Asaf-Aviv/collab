import { AddCollabPostReactionInput } from './../../graphql/types.d'
import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
  BelongsTo,
  IsUUID,
  Default,
  Unique,
} from 'sequelize-typescript'
import { CollabPost } from './CollabPost'
import uuid from 'uuid/v4'
import { User } from './User'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'

@Table({ tableName: 'collab_post_reactions', timestamps: false })
export class CollabPostReaction extends Model<CollabPostReaction> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string

  @ForeignKey(() => CollabPost)
  @Column({ unique: 'unique_reaction' })
  postId!: string

  @BelongsTo(() => CollabPost, { foreignKey: 'postId', onDelete: 'CASCADE' })
  post!: CollabPost

  @ForeignKey(() => User)
  @Column({ unique: 'unique_reaction' })
  userId!: string

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  user!: User

  @Column({ unique: 'unique_reaction' })
  emojiId!: string

  static async addReaction(
    reaction: AddCollabPostReactionInput & { userId: string },
  ) {
    return this.create(reaction)
  }

  static async deleteReaction(reactionId: string, userId: string) {
    const isDeleted = await this.destroy({
      where: { id: reactionId, userId },
    })

    if (!isDeleted) {
      throw new Error('Unable to delete reaction')
    }

    return true
  }
}

export type GQLCollabPostComment = GQLResolverTypes<
  CollabPostReaction,
  'post' | 'userId'
>
