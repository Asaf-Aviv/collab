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
} from 'sequelize-typescript'
import uuid from 'uuid/v4'
import bcrypt from 'bcrypt'
import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyCountAssociationsMixin,
} from 'sequelize'
import { SignupArgs, LoginArgs } from '../../graphql/types'
import { Collab } from './Collab'
import { passwordRegex } from '../../utils'
import { CollabMemberRequest } from './CollabMemberRequest'

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
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

  @Unique({
    msg: 'Email is already taken',
    name: 'unique_email',
  })
  @AllowNull(false)
  @Column({ validate: { isEmail: { msg: 'Invalid Email' } } })
  email!: string

  @HasMany(() => Collab)
  collabs!: Collab[]

  @HasMany(() => CollabMemberRequest)
  collabInvites!: Collab[]

  @HasMany(() => CollabMemberRequest)
  collabRequests!: CollabMemberRequest[]

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

  static async createUser(credentials: SignupArgs) {
    await this.create(credentials)
    return true
  }

  static async login({ email, password }: LoginArgs) {
    const user = await this.findOne({
      where: { email: email.toLowerCase() },
      attributes: { include: ['password'] },
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

  static async acceptCollabInvite(collabId: string, memberId: string) {
    return this.sequelize!.transaction(async () => {
      const invite = await CollabMemberRequest.findOne({
        where: { collabId, memberId },
      })

      if (!invite) {
        throw new Error('Invititation does not exist')
      }

      const [newMember] = await Promise.all([
        this.findByPk(memberId),
        invite.destroy(),
        CollabMember.create({
          collabId,
          memberId,
        }),
      ])

      return newMember!
    })
  }

  static async declineCollabInvite(collabId: string, memberId: string) {
    return this.sequelize!.transaction(async () => {
      const invite = await CollabMemberRequest.findOne({
        where: { collabId, memberId },
      })

      if (!invite) {
        throw new Error('Invititation does not exist')
      }

      await invite.destroy()

      return true
    })
  }
}
