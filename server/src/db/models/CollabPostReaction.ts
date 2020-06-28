import {
  AddCollabPostReactionInput,
  RemoveCollabPostReactionInput,
} from './../../graphql/types.d'
import { Table, ForeignKey, Column, BelongsTo } from 'sequelize-typescript'
import { CollabPost } from './CollabPost'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { Reaction } from './Reaction'

@Table({ tableName: 'collab_post_reactions', timestamps: false })
export class CollabPostReaction extends Reaction {
  @ForeignKey(() => CollabPost)
  @Column({ unique: 'unique_reaction' })
  postId!: string

  @BelongsTo(() => CollabPost, { foreignKey: 'postId', onDelete: 'CASCADE' })
  post!: CollabPost

  static addReaction(
    reaction: AddCollabPostReactionInput & { userId: string },
  ) {
    return this.create(reaction)
  }

  static async deleteReaction(
    reaction: RemoveCollabPostReactionInput & { userId: string },
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
  CollabPostReaction,
  'post' | 'user'
>
