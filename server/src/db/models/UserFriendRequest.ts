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

  static createFriendRequest(receiverId: string, senderId: string) {
    return this.create({ receiverId, senderId })
  }

  static deleteFriendRequest(receiverId: string, senderId: string) {
    return this.destroy({ where: { receiverId, senderId } })
  }
}

export type GQLUserFriendRequest = GQLResolverTypes<
  UserFriendRequest,
  'receiver' | 'sender'
>
