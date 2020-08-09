import { Table, ForeignKey, Column, BelongsTo } from 'sequelize-typescript'
import { Reaction } from './Reaction'
import { CollabDiscussionThread } from './CollabDiscussionThread'
import { CollabMember } from './CollabMember'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import {
  AddCollabDiscussionThreadReactionInput,
  RemoveCollabDiscussionThreadReactionInput,
} from '../../graphql/types'

@Table({ tableName: 'collab_discussion_thread_reactions', timestamps: false })
export class CollabDiscussionThreadReaction extends Reaction {
  @ForeignKey(() => CollabDiscussionThread)
  @Column({ unique: 'unique_reaction' })
  threadId!: string

  @BelongsTo(() => CollabDiscussionThread, {
    foreignKey: 'threadId',
    onDelete: 'CASCADE',
  })
  thread!: CollabDiscussionThread

  static async addReaction(
    reaction: AddCollabDiscussionThreadReactionInput & { userId: string },
  ) {
    const thread = await CollabDiscussionThread.findByPk(reaction.threadId)

    if (!thread) {
      throw new Error('Thread not found')
    }

    const isMember = await CollabMember.findOne({
      where: { collabId: thread.collabId, memberId: reaction.userId },
    })

    if (!isMember) {
      throw new Error('You are not a member of this Collab')
    }

    await this.create(reaction)
    return true
  }

  static async deleteReaction(
    reactionInput: RemoveCollabDiscussionThreadReactionInput & {
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
  CollabDiscussionThreadReaction,
  'thread' | 'user'
>
