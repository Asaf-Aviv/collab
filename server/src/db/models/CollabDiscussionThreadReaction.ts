import {
  AddCollabDiscussionThreadReactionInput,
  RemoveCollabDiscussionThreadReactionInput,
} from '../../graphql/types'
import { Table, ForeignKey, Column, BelongsTo } from 'sequelize-typescript'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { Reaction } from './Reaction'
import { CollabDiscussionThread } from './CollabDiscussionThread'

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
    await this.create(reaction)
    return true
  }

  static async deleteReaction(
    reaction: RemoveCollabDiscussionThreadReactionInput & { userId: string },
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
  CollabDiscussionThreadReaction,
  'thread' | 'user'
>
