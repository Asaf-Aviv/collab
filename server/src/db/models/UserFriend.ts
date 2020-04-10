import { Op } from 'sequelize'
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

@Table({ tableName: 'user_friendships', timestamps: true })
export class UserFriend extends Model<UserFriend> {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  userId!: string

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  user!: User

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  friendId!: string

  @BelongsTo(() => User, { foreignKey: 'friendId', onDelete: 'CASCADE' })
  friend!: User

  static async createFriendship(friendId: string, userId: string) {
    //FIXME: add validation
    // creates a row for each side of the friendship
    await this.bulkCreate([
      { friendId, userId },
      { friendId: userId, userId: friendId },
    ])
    return true
  }

  static async deleteFriendship(friendId: string, userId: string) {
    //FIXME: add validation
    // delete both rows of the friendship
    await this.destroy({
      where: {
        [Op.or]: [
          { friendId, userId },
          { friendId: userId, userId: friendId },
        ],
      },
    })
    return true
  }
}

export type GQLUserFriend = GQLResolverTypes<UserFriend, 'friendId' | 'userId'>
