import {
  Model,
  Column,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  IsUUID,
  Default,
} from 'sequelize-typescript'
import { Op } from 'sequelize'
import { v4 as uuid } from 'uuid'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { User } from './User'

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

  static async createFriendRequest(receiverId: string, senderId: string) {
    const exist = await this.findOne({
      where: {
        [Op.or]: [
          {
            senderId,
            receiverId,
          },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
    })

    if (exist) {
      throw new Error('There is already a request pending')
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
