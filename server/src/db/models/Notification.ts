import {
  Model,
  Table,
  Column,
  PrimaryKey,
  IsUUID,
  Default,
  BelongsTo,
  AllowNull,
  ForeignKey,
  CreatedAt,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { User } from './User'
import { CollabPostComment } from './CollabPostComment'
import { UserFriend } from './UserFriend'

type FriendNotification = 'NEW_FRIEND' | 'FRIEND_REQUEST'

type CollabPostNotification =
  | 'COLLAB_POST_REACTION'
  | 'COLLAB_POST_COMMENT'
  | 'COLLAB_POST_COMMENT_REACTION'

type CollabNotification =
  | 'NEW_COLLAB_MEMBER'
  | 'COLLAB_MEMBER_REQUEST'
  | 'COLLAB_DISCUSSION_THREAD'
  | 'COLLAB_DISCUSSION_THREAD_REACTION'
  | 'COLLAB_DISCUSSION_THREAD_COMMENT'
  | 'COLLAB_DISCUSSION_THREAD_COMMENT_REACTION'
  | 'COLLAB_TASK_ASSIGNEE'

type PrivateMessageNotification = 'NEW_PRIVATE_MESSAGE'

type NotificationType =
  | FriendNotification
  | CollabPostNotification
  | CollabNotification
  | PrivateMessageNotification

export const notificationTypes: Record<string, NotificationType> = {
  newFriend: 'NEW_FRIEND',
}

@Table({
  tableName: 'notifications',
  updatedAt: false,
})
export class Notification extends Model<Notification> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @Column
  type!: NotificationType

  @Default(false)
  @Column
  isRead!: boolean

  @ForeignKey(() => User)
  @Column
  userId!: string

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  user!: User

  @Default(null)
  @Column
  friendId!: string

  @BelongsTo(() => User, { foreignKey: 'friendId', onDelete: 'CASCADE' })
  friend!: User

  @ForeignKey(() => UserFriend)
  @Column
  friendShipId!: string

  @BelongsTo(() => UserFriend, {
    foreignKey: 'friendShipId',
    onDelete: 'CASCADE',
  })
  friendship!: UserFriend

  @CreatedAt
  creationDate!: Date

  static async newFriendNotification(
    userId: string,
    accepterId: string,
    friendshipId: string,
  ) {
    const notification = await this.create({
      type: 'NEW_FRIEND',
      friendId: accepterId,
      userId,
      friendshipId,
    })

    return notification.get() as typeof notification
  }

  static async markAsRead(notificationId: string, userId: string) {
    const notification = await this.findByPk(notificationId)

    if (!notification) {
      throw new Error('Notification not found')
    }

    if (notification.userId !== userId) {
      throw new Error('This Notification does not belong to you')
    }

    notification.isRead = true
    return notification.get() as typeof notification
  }

  static async deleteNotification(notificationId: string, userId: string) {
    const isDeleted = await this.destroy({
      where: { id: notificationId, userId },
    })

    if (!isDeleted) {
      throw new Error('Notification not found or it is not belong to you')
    }

    return notificationId
  }
}
