import {
  AddCollabTaskCommentReactionInput,
  RemoveCollabTaskCommentReactionInput,
} from '../../graphql/types'
import { Table, ForeignKey, Column, BelongsTo } from 'sequelize-typescript'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { Reaction } from './Reaction'
import { CollabTaskComment } from './CollabTaskComment'

@Table({ tableName: 'collab_task_comment_reactions', timestamps: false })
export class CollabTaskCommentReaction extends Reaction {
  @ForeignKey(() => CollabTaskComment)
  @Column({ unique: 'unique_reaction' })
  commentId!: string

  @BelongsTo(() => CollabTaskComment, {
    foreignKey: 'commentId',
    onDelete: 'CASCADE',
  })
  comment!: CollabTaskComment

  static async addReaction(
    reaction: AddCollabTaskCommentReactionInput & { userId: string },
  ) {
    await this.create(reaction)
    return true
  }

  static async deleteReaction(
    reaction: RemoveCollabTaskCommentReactionInput & { userId: string },
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

export type GQLCollabTaskCommentReaction = GQLResolverTypes<
  CollabTaskCommentReaction,
  'comment' | 'user'
>
