import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { SendPrivateMessageInput } from '../../graphql/types.d'
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
import { QueryTypes } from 'sequelize'
import { v4 as uuid } from 'uuid'
import { User } from './User'
import { UserFriend } from './UserFriend'

@Table({ tableName: 'private_messages', updatedAt: false })
export class PrivateMessage extends Model<PrivateMessage> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @AllowNull(true)
  @ForeignKey(() => User)
  @Column
  authorId!: string

  @BelongsTo(() => User, { foreignKey: 'authorId', onDelete: 'SET NULL' })
  author!: User

  @AllowNull(true)
  @ForeignKey(() => User)
  @Column
  recipientId!: string

  @BelongsTo(() => User, { foreignKey: 'recipientId', onDelete: 'SET NULL' })
  recipient!: User

  @Column
  content!: string

  @Default(false)
  @Column
  isRead!: boolean

  // if visible is null both users can see the message
  // if visible is a user id only the user with the same id
  // can see the message.
  // used to give an option for users to delete messages
  @Default(null)
  @Column
  visibleTo!: string

  @CreatedAt
  creationDate!: Date

  static async createMessage(input: SendPrivateMessageInput, authorId: string) {
    const areFriends = await UserFriend.areFriends(input.recipientId, authorId)

    if (!areFriends) {
      throw new Error('You can only send messages to friends')
    }

    return this.create({ ...input, authorId })
  }

  static async deleteMessage(messageId: string, userId: string) {
    const message = await this.findByPk(messageId)

    if (!message) {
      throw new Error('Message not found')
    }

    if (message.authorId !== userId && message.recipientId !== userId) {
      throw new Error('You are not a member of this conversation')
    }

    // if the other user already deleted the message delete the entire row
    if (message.visibleTo === userId) {
      await message.destroy()
      return messageId
    }

    // mark as visible only to the other user
    message.visibleTo =
      message.authorId === userId ? message.recipientId : message.authorId

    await message.save()

    return messageId
  }

  static async markAsRead(messageId: string, userId: string) {
    const message = await this.findByPk(messageId)

    if (!message) {
      throw new Error('Message not found')
    }

    if (message.recipientId !== userId) {
      throw new Error('You are not the recipient of this message')
    }

    message.isRead = true
    message.save()
    return true
  }

  // return an array of objects with userId, avatar and username of users
  // that are involved in a conversation with the current user together
  // with the content of the latest message
  static async getConversationsPreview(userId: string) {
    const res = await this.sequelize!.query(
      `
      SELECT u.id as "userId", u.username, u.avatar, p.content, p.is_read as "isRead"
      FROM users u
      INNER JOIN (
        SELECT DISTINCT
          CASE WHEN p.author_id = :userId THEN p.recipient_id ELSE p.author_id END user_id,
          p.content, p.is_read
        FROM private_messages p
        WHERE :userId IN (p.author_id, p.recipient_id)
        AND NOT EXISTS (
          SELECT 1 FROM private_messages
          WHERE (author_id, recipient_id) IN ((p.author_id, p.recipient_id), (p.recipient_id, p.author_id))
            AND creation_date > p.creation_date
        )
      ) p ON u.id = p.user_id`,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      },
    )
    return res
  }
}

export type GQLPrivateMessage = GQLResolverTypes<
  PrivateMessage,
  'author' | 'recipient'
>
