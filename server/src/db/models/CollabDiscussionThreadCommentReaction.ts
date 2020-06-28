import {
  AddDiscussionThreadCommentReactionInput,
  RemoveDiscussionThreadCommentReactionInput,
} from '../../graphql/types'
import { Table, ForeignKey, Column, BelongsTo } from 'sequelize-typescript'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { Reaction } from './Reaction'
import { CollabDiscussionThreadComment } from './CollabDiscussionThreadComment'
import { Collab } from './Collab'
import { CollabMember } from './CollabMember'

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
    const comment = await CollabDiscussionThreadComment.findByPk(
      reaction.commentId,
    )

    if (!comment) {
      throw new Error('Comment not found')
    }

    const isMember = await CollabMember.findOne({
      where: { collabId: comment.collabId, memberId: reaction.userId },
    })

    if (!isMember) {
      throw new Error('You are not a member of this Collab')
    }

    await this.create(reaction)
    return true
  }

  static async deleteReaction(
    reactionInput: RemoveDiscussionThreadCommentReactionInput & {
      userId: string
    },
  ) {
    const reaction = await this.findOne({
      where: reactionInput,
    })

    if (!reaction) {
      throw new Error('Reaction not found')
    }

    await reaction.destroy()

    return true
  }
}

export type GQLCollabPostComment = GQLResolverTypes<
  CollabDiscussionThreadCommentReaction,
  'comment' | 'user'
>
