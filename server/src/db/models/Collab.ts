import { CollabMemberRequest } from './CollabMemberRequest'
import {
  Model,
  Column,
  Table,
  IsUUID,
  PrimaryKey,
  Default,
  ForeignKey,
  DataType,
  Length,
  BelongsTo,
  HasMany,
  AllowNull,
} from 'sequelize-typescript'
import uuid from 'uuid/v4'
import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasOneCreateAssociationMixin,
} from 'sequelize'
import { CollabArgs } from '../../graphql/types'
import { CollabMember } from './CollabMember'
import { CollabComment } from './CollabComment'
import { User } from './User'

@Table({ tableName: 'collabs' })
export class Collab extends Model<Collab> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string

  @AllowNull(false)
  @Column
  name!: string

  @AllowNull(false)
  @Column
  title!: string

  @AllowNull(false)
  @Column(DataType.ENUM('ALL', 'JUNIOR', 'JUNIOR_MID', 'MID_SENIOR', 'SENIOR'))
  experience!: string

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  stack!: string[]

  @Length({
    msg: 'Description must be between 10 characters and 500',
    min: 10,
    max: 500,
  })
  @AllowNull(false)
  @Column
  description!: string

  @AllowNull(false)
  @Default(false)
  @Column
  acceptsInvites!: boolean

  @Column
  hasStarted!: boolean

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  ownerId!: string

  @BelongsTo(() => User, { foreignKey: 'ownerId', onDelete: 'cascade' })
  owner!: User

  @HasMany(() => CollabMember)
  members!: User[]

  @HasMany(() => CollabComment)
  comments!: CollabComment[]

  @HasMany(() => CollabMemberRequest)
  pendingInvites!: User[]

  getMembers!: HasManyGetAssociationsMixin<CollabMember>
  addMember!: HasManyAddAssociationMixin<CollabMember, string>
  hasMember!: HasManyHasAssociationMixin<CollabMember, string>
  countMembers!: HasManyCountAssociationsMixin
  createMember!: HasManyCreateAssociationMixin<CollabMember>
  setOwner!: HasOneCreateAssociationMixin<CollabMember>

  static createCollab(collabArgs: CollabArgs, userId: string) {
    return this.sequelize!.transaction(async () => {
      const collab = await this.create({ ...collabArgs, ownerId: userId })

      await CollabMember.create({
        collabId: collab.id,
        memberId: userId,
        isOwner: true,
      })

      return collab
    })
  }

  static async getCollab(collabId: string) {
    const collab = await this.findByPk(collabId, {
      include: [User, CollabMember],
      raw: true,
    })

    if (!collab) {
      throw new Error('Collab not found')
    }

    return collab
  }

  static async addMember(collabId: string, ownerId: string, memberId: string) {
    return this.sequelize!.transaction(async () => {
      console.log(collabId)
      const collab = await Collab.findByPk(collabId)
      console.log(collab)
      const isMember = await CollabMember.findOne({
        where: { collabId, memberId },
      })

      if (!collab) {
        throw new Error('Collab not found')
      }
      if (ownerId !== collab.ownerId) {
        throw new Error('You have no permissions to add members')
      }
      if (isMember) {
        throw new Error('User is already a member')
      }

      await collab.createMember({ memberId })
      return collab
    })
  }

  static async removeMember(collabId: string, ownerId: string, memberId: string) {
    return this.sequelize!.transaction(async () => {
      const collab = await Collab.findByPk(collabId, { raw: false })
      const isMember = await CollabMember.findOne({
        where: { collabId, memberId },
      })

      if (!collab) {
        throw new Error('Collab not found')
      }
      if (ownerId !== collab.ownerId) {
        throw new Error('You have no permissions to remove members')
      }
      if (!isMember) {
        throw new Error('User is not a member of the collab')
      }

      const removed = await CollabMember.destroy({
        where: { memberId, collabId },
      })

      if (!removed) {
        throw new Error('Something went wrong')
      }

      return collab
    })
  }

  static async deleteCollab(id: string) {
    const isDeleted = await Collab.destroy({ where: { id } })

    if (isDeleted) {
      return true
    }

    throw new Error('Collab not found')
  }

  static async inviteMember(ownerId: string, memberId: string, collabId: string) {
    const collab = await this.findByPk(collabId)

    if (!collab) {
      throw new Error('Collab not found')
    }

    if (collab.get('ownerId') !== ownerId) {
      throw new Error('You have no permissions to invite members')
    }

    const newMember = await User.findByPk(memberId)

    if (!newMember) {
      throw new Error('User not found')
    }

    await CollabMemberRequest.create({ collabId, memberId, type: 'invitation' })

    return newMember
  }

  static async requestToJoin(collabId: string, memberId: string) {
    const [collab, invitation] = await Promise.all([
      this.findByPk(collabId),
      CollabMemberRequest.findOne({ where: { collabId, memberId } }),
    ])

    if (!collab) {
      throw new Error('Collab not found')
    }

    if (invitation && invitation.type === 'request') {
      throw new Error('Your request is still pending approval')
    }

    if (invitation && invitation.type === 'invitation') {
      throw new Error(
        'The owner of this collab already invited you to join, please check your invitations',
      )
    }

    await CollabMemberRequest.create({ collabId, memberId, type: 'request' })

    return true
  }
}
