import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import {
  Model,
  Table,
  ForeignKey,
  Column,
  BelongsTo,
} from 'sequelize-typescript'
import { CollabPost } from './CollabPost'
import { Collab } from './Collab'
import { Stack } from './Stack'

@Table({ tableName: 'collab_post_stack', timestamps: false })
export class CollabPostStack extends Model<CollabPostStack> {
  @ForeignKey(() => CollabPost)
  @Column
  postId!: string

  @BelongsTo(() => CollabPost, { foreignKey: 'postId', onDelete: 'CASCADE' })
  post!: CollabPost

  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, { foreignKey: 'collabId', onDelete: 'CASCADE' })
  collab!: Collab

  @ForeignKey(() => Stack)
  @Column
  stackId!: string

  @BelongsTo(() => Stack)
  stack!: Stack
}

export type GQLCollabPostComment = GQLResolverTypes<
  CollabPostStack,
  'post' | 'collab'
>
