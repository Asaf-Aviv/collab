import {
  AddCollabTaskCommentReactionInput,
  RemoveCollabTaskCommentReactionInput,
} from '../../graphql/types'
import { Table, ForeignKey, Column, BelongsTo } from 'sequelize-typescript'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { Reaction } from './Reaction'
import { CollabTaskComment } from './CollabTaskComment'
import { CollabMember } from './CollabMember'
import { CollabTask } from './CollabTask'

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
    const comment = await CollabTaskComment.findByPk(reaction.commentId, {
      include: [{ model: CollabTask }],
    })

    if (!comment) {
      throw new Error('Comment not found')
    }

    const isMember = await CollabMember.findOne({
      where: { collabId: comment.task.collabId, memberId: reaction.userId },
    })

    if (!isMember) {
      throw new Error('You are not a member of this Collab')
    }

    await this.create(reaction)
    return true
  }

  static async deleteReaction(
    reactionInput: RemoveCollabTaskCommentReactionInput & { userId: string },
  ) {
    const reaction = await this.findOne({ where: reactionInput })

    if (!reaction) {
      throw new Error('Reaction not found')
    }

    await reaction.destroy()

    return true
  }
}

export type GQLCollabTaskCommentReaction = GQLResolverTypes<
  CollabTaskCommentReaction,
  'comment' | 'user'
>
