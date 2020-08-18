import {
  Model,
  Column,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  IsUUID,
  Default,
  CreatedAt,
} from 'sequelize-typescript'
import { Op } from 'sequelize'
import { v4 as uuid } from 'uuid'
import { User } from './User'
import { UserFriend } from './UserFriend'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'

@Table({
  tableName: 'user_friendship_requests',
  timestamps: true,
})
export class UserFriendRequest extends Model<UserFriendRequest> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string

  @ForeignKey(() => User)
  @Column
  senderId!: string

  @BelongsTo(() => User, { foreignKey: 'senderId', onDelete: 'CASCADE' })
  sender!: User

  @ForeignKey(() => User)
  @Column
  receiverId!: string

  @BelongsTo(() => User, { foreignKey: 'receiverId', onDelete: 'CASCADE' })
  receiver!: User

  @CreatedAt
  creationDate!: Date

  static async createFriendRequest(receiverId: string, senderId: string) {
    const [receiver, requestExist, areFriends] = await Promise.all([
      User.findByPk(receiverId),
      this.findOne({
        where: {
          [Op.or]: [
            {
              senderId,
              receiverId,
            },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      }),
      UserFriend.findOne({
        where: {
          userId: senderId,
          friendId: receiverId,
        },
      }),
    ])

    if (!receiver) {
      throw new Error('User not found')
    }

    if (requestExist) {
      throw new Error('There is already a request pending')
    }

    if (areFriends) {
      throw new Error(`You are already friends with ${receiver.username}`)
    }

    return this.create({ receiverId, senderId }, { raw: true })
  }

  static async deleteFriendRequest(receiverId: string, senderId: string) {
    await this.destroy({ where: { receiverId, senderId } })
    return senderId
  }
}

export type GQLUserFriendRequest = GQLResolverTypes<
  UserFriendRequest,
  'receiver' | 'sender'
>
