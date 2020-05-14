import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
  Default,
  IsUUID,
  CreatedAt,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { Collab } from './Collab'
import { User } from './User'
import {
  CreateWallMessageInput,
  CollabWallMessagesInput,
} from '../../graphql/types'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { CollabMember } from './CollabMember'

@Table({ tableName: 'private_messages', updatedAt: false })
export class CollabWallMessage extends Model<CollabWallMessage> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, { foreignKey: 'collabId', onDelete: 'CASCADE' })
  collab!: Collab

  @AllowNull(true)
  @ForeignKey(() => User)
  @Column
  authorId!: string

  @BelongsTo(() => User, { foreignKey: 'authorId', onDelete: 'CASCADE' })
  author!: User

  @Column
  content!: string

  @CreatedAt
  creationDate!: Date

  static async createMessage(input: CreateWallMessageInput, authorId: string) {
    //  check if is a member of the collab

    return this.create({ ...input, authorId })
  }

  static async deleteMessage(messageId: string, authorId: string) {
    const isDeleted = await this.destroy({ where: { id: messageId, authorId } })

    if (isDeleted) {
      return messageId
    }

    throw new Error('Could not delete message')
  }

  static async getMessages(input: CollabWallMessagesInput, userId: string) {
    const { collabId, offset, limit } = input

    // FIXME: uncomment validation
    // const isMember = await CollabMember.findOne({ where: { collabId, memberId: userId}})

    // if (!isMember) {
    //   throw new Error('You are not a member of this collab')
    // }

    const messages = await this.findAll({
      where: {
        collabId,
      },
      offset,
      limit: limit + 1,
      order: [['creationDate', 'DESC']],
    })

    return {
      messages: messages.slice(0, limit),
      hasNextPage: messages.length > limit,
    }
  }
}

type GQLWallMessage = GQLResolverTypes<CollabWallMessage, 'author' | 'collab'>
