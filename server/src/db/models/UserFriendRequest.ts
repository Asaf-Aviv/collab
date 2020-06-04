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

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  senderId!: string

  @BelongsTo(() => User, { foreignKey: 'senderId', onDelete: 'CASCADE' })
  sender!: User

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  receiverId!: string

  @BelongsTo(() => User, { foreignKey: 'receiverId', onDelete: 'CASCADE' })
  receiver!: User

  static async createFriendRequest(receiverId: string, senderId: string) {
    //FIXME: check if there is already a request from the receiver
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
