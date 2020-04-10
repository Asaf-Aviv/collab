import {
  Model,
  Column,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { User } from './User'

@Table({
  tableName: 'user_friendship_requests',
  timestamps: true,
})
export class UserFriendRequest extends Model<UserFriendRequest> {
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
    await this.create({ receiverId, senderId })
    return true
  }

  static async deleteFriendRequest(receiverId: string, senderId: string) {
    await this.destroy({ where: { receiverId, senderId } })
    return true
  }
}

export type GQLUserFriendRequest = GQLResolverTypes<
  UserFriendRequest,
  'receiver' | 'sender'
>
