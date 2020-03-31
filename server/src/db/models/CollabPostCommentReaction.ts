import {
  AddCollabPostCommentReactionInput,
  RemoveCollabPostCommentReactionInput,
} from '../../graphql/types'
import { Table, ForeignKey, Column, BelongsTo } from 'sequelize-typescript'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { Reaction } from './Reaction'
import { CollabPostComment } from './CollabPostComment'

@Table({ tableName: 'collab_post_comment_reactions', timestamps: false })
export class CollabPostCommentReaction extends Reaction {
  @ForeignKey(() => CollabPostComment)
  @Column({ unique: 'unique_reaction' })
  commentId!: string

  @BelongsTo(() => CollabPostComment, {
    foreignKey: 'commentId',
    onDelete: 'CASCADE',
  })
  comment!: CollabPostComment

  static async addReaction(
    reaction: AddCollabPostCommentReactionInput & { userId: string },
  ) {
    await this.create(reaction)
    return true
  }

  static async deleteReaction(
    reaction: RemoveCollabPostCommentReactionInput & { userId: string },
  ) {
    const isDeleted = await this.destroy({
      where: reaction,
    })

    if (!isDeleted) {
      throw new Error('Unable to delete reaction')
    }

    return true
  }
}

export type GQLCollabPostCommentReaction = GQLResolverTypes<
  CollabPostCommentReaction,
  'comment' | 'user'
>
