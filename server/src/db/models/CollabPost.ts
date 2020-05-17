import {
  Model,
  Column,
  Table,
  IsUUID,
  PrimaryKey,
  Default,
  ForeignKey,
  DataType,
  CreatedAt,
  Length,
  BelongsTo,
  HasMany,
  AllowNull,
  BelongsToMany,
  Sequelize,
} from 'sequelize-typescript'
import { Op } from 'sequelize'
import { v4 as uuid } from 'uuid'
import { CollabPostArgs, AdvancedPostsSearchInput } from '../../graphql/types'
import { CollabMember } from './CollabMember'
import { User } from './User'
import { Collab } from './Collab'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { CollabPostComment } from './CollabPostComment'
import { CollabPostLanguage } from './CollabPostLanguage'
import { Stack } from './Stack'
import { CollabPostStack } from './CollabPostStack'
import { CollabPostReaction } from './CollabPostReaction'
import { subDays } from 'date-fns'

@Table({ tableName: 'collab_posts' })
export class CollabPost extends Model<CollabPost> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string

  @AllowNull(false)
  @Column
  name!: string

  @AllowNull(false)
  @Column
  title!: string

  @AllowNull(false)
  @Column(
    DataType.ENUM('ALL', 'JUNIOR', 'JUNIOR_MID', 'MID', 'MID_SENIOR', 'SENIOR'),
  )
  experience!: string

  @Length({
    msg: 'Description must be between 10 characters and 500',
    min: 10,
    max: 500,
  })
  @AllowNull(false)
  @Column(DataType.STRING(500))
  description!: string

  @CreatedAt
  @Column
  createdAt!: Date

  @BelongsToMany(() => Stack, () => CollabPostStack)
  stack!: (Stack & { CollabPostStack: CollabPostStack })[]

  @HasMany(() => CollabPostLanguage)
  languages!: string[]

  @AllowNull(false)
  @Default(false)
  @Column
  hasStarted!: boolean

  @ForeignKey(() => User)
  @Column
  ownerId!: string

  @BelongsTo(() => User, { foreignKey: 'ownerId', onDelete: 'cascade' })
  owner!: User

  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, { foreignKey: 'collabId', onDelete: 'cascade' })
  collab!: Collab

  @HasMany(() => CollabPostComment)
  comments!: CollabPostComment[]

  @HasMany(() => CollabPostReaction)
  reactions!: CollabPostReaction[]

  static createPost(postArgs: CollabPostArgs, userId: string) {
    return this.sequelize!.transaction(async () => {
      console.log(postArgs)
      const collab = new Collab({
        name: postArgs.name,
        ownerId: userId,
      })

      const post = new this({
        ...postArgs,
        collabId: collab.id,
        ownerId: userId,
      })

      const collabMember = new CollabMember({
        collabId: collab.id,
        memberId: userId,
        isOwner: true,
      })

      await collab.save()

      const tags = await Stack.bulkCreate(
        postArgs.stack.map(name => ({ name })),
        {
          updateOnDuplicate: ['name'],
        },
      )

      await post.save()

      await Promise.all([
        collabMember.save(),
        CollabPostLanguage.bulkCreate(
          postArgs.languages.map(languageName => ({
            postId: post.id,
            collabId: collab.id,
            languageName,
          })),
        ),
        CollabPostStack.bulkCreate(
          tags.map(tag => ({
            postId: post.id,
            collabId: collab.id,
            stackId: tag.id,
          })),
        ),
      ])

      return post
    })
  }

  static async deletePost(id: string, userId: string) {
    const isDeleted = await this.destroy({ where: { id, ownerId: userId } })

    if (isDeleted) {
      return true
    }

    throw new Error(
      'Collab post not found or you are not the author of this post',
    )
  }

  static async search({
    experience,
    hasStarted,
    isNew,
    languages,
    stack,
    offset,
    limit,
  }: AdvancedPostsSearchInput) {
    const and = []
    if (experience != null) {
      and.push({ experience })
    }
    if (hasStarted != null) {
      and.push({ hasStarted })
    }
    if (isNew) {
      and.push({
        createdAt: {
          [Op.gte]: subDays(new Date(), 7),
        },
      })
    }
    if (languages?.length) {
      and.push({
        id: {
          [Op.in]: Sequelize.literal(
            `(
            SELECT cpl.post_id
            FROM collab_post_languages cpl
            WHERE cpl.language_name
            IN (${languages.map(l => `'${l}'`)})
            )`,
          ),
        },
      })
    }
    if (stack?.length) {
      and.push({
        id: {
          [Op.in]: Sequelize.literal(
            `(
            SELECT cps.post_id
            FROM collab_post_stack cps
            WHERE cps.stack_id
            IN (
              SELECT s.id
              FROM stacks s
              WHERE s.name IN (${stack.map(s => `'${s}'`)}))
            )`,
          ),
        },
      })
    }

    const posts = await this.findAll({
      where: {
        [Op.and]: and,
      },
      order: ['createdAt'],
      offset,
      limit: limit + 1,
    })

    return {
      posts: posts.slice(0, limit),
      hasNextPage: posts.length > limit,
    }
  }
}
// type for graphql-codegen resolver
export type GQLCollabPost = GQLResolverTypes<
  CollabPost,
  'owner' | 'comments' | 'collab' | 'languages' | 'stack'
>
