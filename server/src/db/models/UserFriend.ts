import { Op } from 'sequelize'
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Default,
  IsUUID,
  Index,
  CreatedAt,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { User } from './User'
import { UserFriendRequest } from './UserFriendRequest'

@Table({ tableName: 'user_friendships', timestamps: true })
export class UserFriend extends Model<UserFriend> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string

  @ForeignKey(() => User)
  @Column
  userId!: string

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  user!: User

  @ForeignKey(() => User)
  @Column
  friendId!: string

  @BelongsTo(() => User, { foreignKey: 'friendId', onDelete: 'CASCADE' })
  friend!: User

  @CreatedAt
  creationDate!: Date

  static async createFriendship(friendId: string, userId: string) {
    const exist = this.findOne({ where: { userId, friendId } })

    if (exist) {
      throw new Error('Friendship exist already')
    }

    return this.sequelize!.transaction(async () => {
      await UserFriendRequest.deleteFriendRequest(userId, friendId)
      // creates a row for each side of the friendship
      await this.bulkCreate([
        { friendId, userId },
        { friendId: userId, userId: friendId },
      ])
      const newFriend = await User.findByPk(friendId)
      if (!newFriend) {
        throw new Error('User not found')
      }
      return newFriend
    })
  }

  static async deleteFriendship(friendId: string, userId: string) {
    await this.destroy({
      where: {
        [Op.or]: [
          { friendId, userId },
          { friendId: userId, userId: friendId },
        ],
      },
    })
    return friendId
  }

  static async areFriends(userOneId: string, userTwoId: string) {
    const matchedRows = await this.findOne({
      where: {
        [Op.or]: [
          { friendId: userOneId, userId: userTwoId },
          { friendId: userTwoId, userId: userOneId },
        ],
      },
    })

    return Boolean(matchedRows)
  }
}

export type GQLUserFriend = GQLResolverTypes<UserFriend, 'friendId' | 'userId'>
