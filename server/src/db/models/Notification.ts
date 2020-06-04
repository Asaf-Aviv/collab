import {
  Model,
  Table,
  Column,
  PrimaryKey,
  IsUUID,
  Default,
  BelongsTo,
  ForeignKey,
  CreatedAt,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { User } from './User'
import { UserFriend } from './UserFriend'
import { UserFriendRequest } from './UserFriendRequest'
import { CollabPostReaction } from './CollabPostReaction'
import { CollabPost } from './CollabPost'
import { CollabPostComment } from './CollabPostComment'

type FriendNotification = 'NEW_FRIEND' | 'NEW_FRIEND_REQUEST'

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

  @CreatedAt
  creationDate!: Date

  // shared between notification types
  @ForeignKey(() => CollabPost)
  @Column
  postId!: string

  @BelongsTo(() => CollabPost, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
  })
  post!: CollabPost

  // new friend
  @ForeignKey(() => User)
  @Column
  newFriendId!: string

  @BelongsTo(() => User, { foreignKey: 'friendId', onDelete: 'CASCADE' })
  newFriend!: User

  @ForeignKey(() => UserFriend)
  @Column
  friendshipId!: string

  @BelongsTo(() => UserFriend, {
    foreignKey: 'friendshipId',
    onDelete: 'CASCADE',
  })
  friendship!: UserFriend

  // new friend request
  @ForeignKey(() => User)
  @Column
  friendRequesterId!: string

  @BelongsTo(() => User, {
    foreignKey: 'friendRequesterId',
    onDelete: 'CASCADE',
  })
  friendRequester!: User

  @ForeignKey(() => UserFriendRequest)
  @Column
  friendRequestId!: string

  @BelongsTo(() => UserFriendRequest, {
    foreignKey: 'friendRequestId',
    onDelete: 'CASCADE',
  })
  friendRequest!: UserFriendRequest

  // collab post reaction
  @ForeignKey(() => CollabPostReaction)
  @Column
  reactionId!: string

  @BelongsTo(() => CollabPostReaction, {
    foreignKey: 'reactionId',
    onDelete: 'CASCADE',
  })
  reaction!: CollabPostReaction

  @BelongsTo(() => CollabPostReaction, {
    foreignKey: 'reactionId',
    onDelete: 'CASCADE',
  })

  // collab post comment
  @ForeignKey(() => CollabPostComment)
  @Column
  commentId!: string

  @BelongsTo(() => CollabPostComment, {
    foreignKey: 'commentId',
    onDelete: 'CASCADE',
  })
  comment!: CollabPostComment

  static async newFriendNotification(
    userId: string,
    accepterId: string,
    friendshipId: string,
  ) {
    const notification = await this.create({
      type: 'NEW_FRIEND',
      userId,
      newFriendId: accepterId,
      friendshipId,
    })

    return notification.get() as typeof notification
  }

  static async newFriendRequestNotification(
    userId: string,
    friendRequesterId: string,
    friendRequestId: string,
  ) {
    const notification = await this.create({
      type: 'NEW_FRIEND_REQUEST',
      userId,
      friendRequesterId,
      friendRequestId,
    })

    return notification.get() as typeof notification
  }

  static async newCollabPostReactionNotification(
    userId: string,
    postId: string,
    reactionId: string,
  ) {
    const notification = await this.create({
      type: 'COLLAB_POST_REACTION',
      userId,
      postId,
      reactionId,
    })

    return notification.get() as typeof notification
  }

  static async newCollabPostCommentNotification(
    userId: string,
    postId: string,
    commentId: string,
  ) {
    const notification = await this.create({
      type: 'COLLAB_POST_COMMENT',
      userId,
      postId,
      commentId,
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
