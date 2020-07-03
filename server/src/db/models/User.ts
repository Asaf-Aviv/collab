import { CollabMember } from './CollabMember'
import {
  Model,
  Column,
  Table,
  DataType,
  Unique,
  IsUUID,
  PrimaryKey,
  Default,
  BeforeCreate,
  DefaultScope,
  HasMany,
  AllowNull,
  Validate,
  BeforeValidate,
  CreatedAt,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import {
  Op,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyCountAssociationsMixin,
} from 'sequelize'
import { SignUpArgs, LoginArgs } from '../../graphql/types'
import { Collab } from './Collab'
import { passwordRegex } from '../../utils'
import { CollabMemberRequest } from './CollabMemberRequest'
import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { CollabPostReaction } from './CollabPostReaction'
import { CollabTask } from './CollabTask'
import { UserFriend } from './UserFriend'
import { UserFriendRequest } from './UserFriendRequest'
import { Notification } from './Notification'

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  // GQL computed fields
  isFriend!: boolean
  canRequestFriendship!: boolean

  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string

  @AllowNull(false)
  @Unique({
    msg: 'Username is already taken',
    name: 'unique_username',
  })
  @Validate({
    len: {
      msg: 'Username should be between 3 and 16 characters',
      args: [3, 16],
    },
    is: {
      args: /^[\w]+$/,
      msg: 'Username can contain only letters numbers and underscores',
    },
  })
  @Column(DataType.CITEXT)
  username!: string

  @Default('')
  @Column
  bio!: string

  @Validate({
    is: {
      args: passwordRegex,
      msg:
        'Password must contain atleast eight characters, one letter and one number',
    },
  })
  @AllowNull(false)
  @Column
  password!: string

  @CreatedAt
  creationDate!: Date

  @Default(null)
  @Column
  avatar!: string

  @Default('')
  @Column
  firstName!: string

  @Default('')
  @Column
  lastName!: string

  // the users engineering title
  @Default('')
  @Column
  title!: string

  @Column
  country!: string

  @Default('')
  @Column
  github!: string

  @Default('')
  @Column
  twitter!: string

  @Default('')
  @Column
  linkedin!: string

  @Unique({
    msg: 'Email is already taken',
    name: 'unique_email',
  })
  @AllowNull(false)
  @Column({ validate: { isEmail: { msg: 'Invalid Email' } } })
  email!: string

  @HasMany(() => Collab)
  collabs!: Collab[]

  @HasMany(() => CollabTask, { foreignKey: 'assigneeId' })
  tasks!: CollabTask[]

  @HasMany(() => CollabMemberRequest)
  collabInvites!: Collab[]

  @HasMany(() => CollabMemberRequest)
  collabRequests!: CollabMemberRequest[]

  @HasMany(() => UserFriendRequest, { foreignKey: 'receiverId' })
  friendRequests!: User[]

  @HasMany(() => UserFriend, { foreignKey: 'userId' })
  friends!: User[]

  @HasMany(() => CollabPostReaction)
  reactions!: CollabPostReaction[]

  @HasMany(() => Notification)
  notifications!: Notification[]

  getCollabs!: HasManyGetAssociationsMixin<Collab>
  addCollab!: HasManyAddAssociationMixin<Collab, string>
  hasCollab!: HasManyHasAssociationMixin<Collab, string>
  countCollabs!: HasManyCountAssociationsMixin
  createCollab!: HasManyCreateAssociationMixin<Collab>

  @BeforeValidate
  static formatFields(instance: User) {
    instance.username = instance.username.trim()
    instance.email = instance.email.trim().toLowerCase()
  }

  @BeforeCreate
  static async hashPassword(instance: User) {
    const password = await bcrypt.hash(instance.password, 12)
    Object.assign(instance, { password })
  }

  static createUser(credentials: SignUpArgs) {
    return this.create(credentials)
  }

  static async login({ email, password }: LoginArgs) {
    const user = await this.findOne({
      where: { email: email.toLowerCase() },
      attributes: { include: ['password'] },
      raw: true,
    })

    if (!user) {
      throw new Error('User not found')
    }

    const isMatchedPasswords = await bcrypt.compare(password, user.password)

    if (!isMatchedPasswords) {
      throw new Error('Incorrect Credentials')
    }

    return user
  }

  static async deleteUser(id: string) {
    const isDeleted = await this.destroy({ where: { id } })

    if (!isDeleted) {
      throw new Error('User not found')
    }

    return true
  }

  static async acceptCollabInvitation(collabId: string, memberId: string) {
    const invite = await CollabMemberRequest.findOne({
      where: { collabId, memberId, type: 'invitation' },
    })

    if (!invite) {
      throw new Error('Invititation does not exist')
    }

    return this.sequelize!.transaction(async () => {
      await Promise.all([
        invite.destroy(),
        CollabMember.create({
          collabId,
          memberId,
        }),
      ])

      return collabId
    })
  }

  static async declineCollabInvitation(collabId: string, memberId: string) {
    const invite = await CollabMemberRequest.findOne({
      where: { collabId, memberId, type: 'invitation' },
    })

    if (!invite) {
      throw new Error('Invititation does not exist')
    }

    await invite.destroy()

    return collabId
  }

  static getAllUserFriends(userId: string) {
    return this.findAll({
      where: { id: { [Op.ne]: userId } },
      include: [
        {
          attributes: [],
          on: {
            friend_id: { [Op.col]: 'User.id' },
            user_id: userId,
          },
          model: UserFriend,
        },
      ],
      raw: true,
    })
  }
}

export type GQLUser = GQLResolverTypes<
  User,
  | 'collabInvites'
  | 'collabRequests'
  | 'collabs'
  | 'friendRequests'
  | 'friends'
  | 'tasks'
  | 'reactions'
> & {
  isFriend: boolean
  canRequestFriendship: boolean
}
