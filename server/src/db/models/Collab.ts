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
import { User } from './User'

@Table({ tableName: 'collabs' })
export class Collab extends Model<Collab> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string

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

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  ownerId!: string

  @BelongsTo(() => User, { foreignKey: 'ownerId', onDelete: 'cascade' })
  owner!: User

  @HasMany(() => CollabMember)
  members!: CollabMember[]

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

  static async addMember(collabId: string, ownerId: string, memberId: string) {
    return this.sequelize!.transaction(async () => {
      const collab = await Collab.findByPk(collabId, { raw: false })
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
    })
  }

  static async removeMember(
    collabId: string,
    ownerId: string,
    memberId: string
  ) {
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

      return true
    })
  }

  static async deleteCollab(id: string) {
    const isDeleted = await Collab.destroy({ where: { id } })

    if (isDeleted) {
      return true
    }

    throw new Error('Collab not found')
  }
}
