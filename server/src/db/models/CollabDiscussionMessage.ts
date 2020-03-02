import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
  Default,
  BelongsTo,
  IsUUID,
} from 'sequelize-typescript'
import uuid from 'uuid/v4'
import { Collab } from './Collab'
import { User } from './User'
import { CollabMember } from './CollabMember'

@Table({ tableName: 'collab_discussion_messages' })
export class CollabDiscussionMessage extends Model<CollabDiscussionMessage> {
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

  @ForeignKey(() => User)
  @Column
  authorId!: string

  @BelongsTo(() => User, { foreignKey: 'authorId', onDelete: 'CASCADE' })
  author!: User

  @Column
  content!: string

  static async createMessage(
    content: string,
    authorId: string,
    collabId: string
  ) {
    const isMember = await CollabMember.findOne({
      where: { collabId, memberId: authorId },
    })

    if (!isMember) {
      throw new Error('You are not a member of this Collab')
    }

    return this.create({
      content,
      authorId,
      collabId,
    })
  }

  static async deleteMessage(messageId: string, authorId: string) {
    const message = await this.findByPk(messageId)

    if (!message) {
      throw new Error('Message not found')
    }

    if (message.get('authorId') !== authorId) {
      throw new Error('You are not the author of this message')
    }

    await message.destroy()

    return true
  }
}
