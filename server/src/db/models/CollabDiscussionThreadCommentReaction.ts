import {
  AddDiscussionThreadCommentReactionInput,
  RemoveDiscussionThreadCommentReactionInput,
} from '../../graphql/types'
import { Table, ForeignKey, Column, BelongsTo } from 'sequelize-typescript'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { Reaction } from './Reaction'
import { CollabDiscussionThreadComment } from './CollabDiscussionThreadComment'

@Table({
  tableName: 'collab_discussion_thread_comment_reactions',
  timestamps: false,
})
export class CollabDiscussionThreadCommentReaction extends Reaction {
  @ForeignKey(() => CollabDiscussionThreadComment)
  @Column({ unique: 'unique_reaction' })
  commentId!: string

  @BelongsTo(() => CollabDiscussionThreadComment, {
    foreignKey: 'commentId',
    onDelete: 'CASCADE',
  })
  comment!: CollabDiscussionThreadComment

  static async addReaction(
    reaction: AddDiscussionThreadCommentReactionInput & {
      userId: string
    },
  ) {
    await this.create(reaction)
    return true
  }

  static async deleteReaction(
    reaction: RemoveDiscussionThreadCommentReactionInput & {
      userId: string
    },
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

export type GQLCollabPostComment = GQLResolverTypes<
  CollabDiscussionThreadCommentReaction,
  'comment' | 'user'
>
