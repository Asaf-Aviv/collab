import { Table, ForeignKey, Column, BelongsTo } from 'sequelize-typescript'
import { Reaction } from './Reaction'
import { CollabPostComment } from './CollabPostComment'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import {
  AddCollabPostCommentReactionInput,
  RemoveCollabPostCommentReactionInput,
} from '../../graphql/types'

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

  static addReaction(
    reaction: AddCollabPostCommentReactionInput & { userId: string },
  ) {
    return this.create(reaction)
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
