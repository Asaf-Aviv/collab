import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript'
import { CollabPost } from './CollabPost'
import { Language } from './Language'
import { Collab } from './Collab'

@Table({ tableName: 'collab_post_languages', timestamps: false })
export class CollabPostLanguage extends Model<CollabPostLanguage> {
  @PrimaryKey
  @ForeignKey(() => CollabPost)
  @Column
  postId!: string

  @BelongsTo(() => CollabPost, { foreignKey: 'postId' })
  post!: CollabPost

  @PrimaryKey
  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, { foreignKey: 'collabId', onDelete: 'CASCADE' })
  collab!: Collab

  @PrimaryKey
  @ForeignKey(() => Language)
  @Column(DataType.CITEXT)
  languageName!: string
}

export type GQLCollabPostComment = GQLResolverTypes<
  CollabPostLanguage,
  'post' | 'collab'
>
