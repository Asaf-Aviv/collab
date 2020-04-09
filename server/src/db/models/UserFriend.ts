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

@Table({ tableName: 'user_friends', timestamps: true })
export class UserFriend extends Model<UserFriend> {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  userOneId!: string

  @BelongsTo(() => User, { foreignKey: 'userOneId', onDelete: 'CASCADE' })
  userOne!: User

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  userTwoId!: string

  @BelongsTo(() => User, { foreignKey: 'userTwoId', onDelete: 'CASCADE' })
  userTwo!: User

  static async createFriendship(userOneId: string, userTwoId: string) {
    return this.create({ userOneId, userTwoId })
  }

  static async deleteFriendship(userOneId: string, userTwoId: string) {
    return this.destroy({ where: { userOneId, userTwoId } })
  }
}

export type GQLUserFriend = GQLResolverTypes<UserFriend, 'userOne' | 'userTwo'>
