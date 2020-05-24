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
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { User } from './User'
import { CollabPostComment } from './CollabPostComment'

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

@Table({ tableName: 'notifications' })
export class Notification extends Model<Notification> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @Default(false)
  @Column
  isRead!: boolean

  @ForeignKey(() => User)
  @Column
  userId!: string

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'cascade' })
  user!: User

  @Default(null)
  @Column
  friendId!: string

  @BelongsTo(() => User, { foreignKey: 'friendId', onDelete: 'cascade' })
  friend!: User

  @Default(null)
  @Column
  postCommenId!: string

  @BelongsTo(() => CollabPostComment, {
    foreignKey: 'friendId',
    onDelete: 'cascade',
  })
  postComment!: CollabPostComment
}
