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
import { CollabPostCommentReaction } from './CollabPostCommentReaction'
import { PrivateMessage } from './PrivateMessage'
import { CollabMember } from './CollabMember'
import { CollabMemberRequest } from './CollabMemberRequest'
import { Collab } from './Collab'

type FriendNotification = 'NEW_FRIEND' | 'NEW_FRIEND_REQUEST'

type CollabPostNotification =
  | 'COLLAB_POST_REACTION'
  | 'COLLAB_POST_COMMENT'
  | 'COLLAB_POST_COMMENT_REACTION'

type PrivateMessageNotification = 'PRIVATE_MESSAGE'

type CollabNotification =
  | 'NEW_COLLAB_MEMBER'
  | 'COLLAB_MEMBER_REQUEST'
  | 'COLLAB_REQUEST_TO_JOIN_APPROVED'
  | 'COLLAB_MEMBER_INVITATION'
  | 'COLLAB_DISCUSSION_THREAD'
  | 'COLLAB_DISCUSSION_THREAD_REACTION'
  | 'COLLAB_DISCUSSION_THREAD_COMMENT'
  | 'COLLAB_DISCUSSION_THREAD_COMMENT_REACTION'
  | 'COLLAB_TASK_ASSIGNEE'

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

  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, {
    foreignKey: 'collabId',
    onDelete: 'CASCADE',
  })
  collab!: Collab

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
  collabPostReactionId!: string

  @BelongsTo(() => CollabPostReaction, {
    foreignKey: 'collabPostReactionId',
    onDelete: 'CASCADE',
  })
  collabPostReaction!: CollabPostReaction

  // collab post comment
  @ForeignKey(() => CollabPostComment)
  @Column
  collabPostCommentId!: string

  @BelongsTo(() => CollabPostComment, {
    foreignKey: 'collabPostCommentId',
    onDelete: 'CASCADE',
  })
  collabPostComment!: CollabPostComment

  // collab post comment reaction
  @ForeignKey(() => CollabPostComment)
  @Column
  collabPostCommentReactionId!: string

  @BelongsTo(() => CollabPostCommentReaction, {
    foreignKey: 'collabPostCommentReactionId',
    onDelete: 'CASCADE',
  })
  collabPostCommentReaction!: CollabPostCommentReaction

  // private message
  @ForeignKey(() => PrivateMessage)
  @Column
  privateMessageId!: string

  @BelongsTo(() => PrivateMessage, {
    foreignKey: 'privateMessageId',
    onDelete: 'CASCADE',
  })
  privateMessage!: PrivateMessage

  // collab member request to join and invitation
  @ForeignKey(() => CollabMemberRequest)
  @Column
  collabMemberRequestId!: string

  @BelongsTo(() => CollabMemberRequest, {
    foreignKey: 'collabMemberRequestId',
    onDelete: 'CASCADE',
  })
  collabMemberRequest!: CollabMemberRequest

  // collab member
  // the id in CollabMember and not the user id
  @ForeignKey(() => CollabMember)
  @Column
  collabMemberId!: string

  @BelongsTo(() => CollabMember, {
    foreignKey: 'collabMemberId',
    onDelete: 'CASCADE',
  })
  collabMember!: CollabMember

  // // COLLAB_TASK_ASSIGNEE
  // @ForeignKey(() => CollabTask)
  // @Column
  // taskId!: string

  // @BelongsTo(() => CollabTask, {
  //   foreignKey: 'taskId',
  //   onDelete: 'CASCADE',
  // })
  // task!: CollabTask

  // @ForeignKey(() => User)
  // @Column
  // taskAssigneeId!: string

  // @BelongsTo(() => CollabTask, {
  //   foreignKey: 'taskAssigneeId',
  //   onUpdate: 'CASCADE',
  //   targetKey: 'assigneeId',
  // })
  // taskAssignee!: User

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
    collabPostReactionId: string,
  ) {
    const notification = await this.create({
      type: 'COLLAB_POST_REACTION',
      userId,
      postId,
      collabPostReactionId,
    })

    return notification.get() as typeof notification
  }

  static async newCollabPostCommentNotification(
    userId: string,
    postId: string,
    collabPostCommentId: string,
  ) {
    const notification = await this.create({
      type: 'COLLAB_POST_COMMENT',
      userId,
      postId,
      collabPostCommentId,
    })

    return notification.get() as typeof notification
  }

  static async newCollabPostCommentReactionNotification(
    userId: string,
    collabPostCommentReactionId: string,
  ) {
    const notification = await this.create({
      type: 'COLLAB_POST_COMMENT_REACTION',
      userId,
      collabPostCommentReactionId,
    })

    return notification.get() as typeof notification
  }

  static async newPrivateMessageNotification(
    userId: string,
    privateMessageId: string,
  ) {
    const notification = await this.create({
      type: 'PRIVATE_MESSAGE',
      userId,
      privateMessageId,
    })

    return notification.get() as typeof notification
  }

  static async newCollabMemberRequestNotification(
    userId: string,
    collabMemberRequestId: string,
  ) {
    const notification = await this.create({
      type: 'COLLAB_MEMBER_REQUEST',
      userId,
      collabMemberRequestId,
    })

    return notification.get() as typeof notification
  }

  static async newCollabMemberInvitationNotification(
    collabId: string,
    userId: string,
  ) {
    const invitation = await CollabMemberRequest.findOne({
      where: {
        collabId,
        memberId: userId,
      },
    })

    if (!invitation) {
      throw new Error('Collab member invitation not found')
    }

    const notification = await this.create({
      type: 'COLLAB_MEMBER_INVITATION',
      userId,
      collabMemberRequestId: invitation.id,
    })

    return notification.get() as typeof notification
  }

  static async newCollabMemberNotification(memberId: string, collabId: string) {
    const collabMember = await CollabMember.findOne({
      where: { memberId, collabId },
      include: [User],
    })
    const members = await CollabMember.findAll({
      where: { collabId },
      include: [User],
    })

    if (!collabMember) {
      throw new Error('Collab member not found')
    }

    if (!members) {
      throw new Error('Collab not found')
    }

    const withoutNewMember = members.filter(
      ({ member }) => member.id !== memberId,
    )

    return Promise.all<Notification>(
      withoutNewMember.map(({ member }) =>
        this.create({
          type: 'NEW_COLLAB_MEMBER',
          userId: member.id,
          collabMemberId: collabMember.id,
        }).then(n => n.get()),
      ),
    )
  }

  static async newMemberRequestApprovedNotification(
    userId: string,
    collabId: string,
  ) {
    const collabMember = await CollabMember.findOne({
      where: { memberId: userId, collabId },
    })

    if (!collabMember) {
      throw new Error('Collab member not found')
    }

    const notification = await this.create({
      type: 'COLLAB_REQUEST_TO_JOIN_APPROVED',
      userId,
      collabMemberId: collabMember.id,
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
    await notification.save()
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
