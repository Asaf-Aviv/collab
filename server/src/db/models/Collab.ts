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
import { CollabTaskList } from './CollabTaskList'
import { CollabDiscussionMessage } from './CollabDiscussionMessage'

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

  @AllowNull(false)
  @Default(false)
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

  @HasMany(() => CollabMemberRequest)
  pendingRequests!: User[]

  @HasMany(() => CollabTaskList)
  taskList!: CollabTaskList[]

  @HasMany(() => CollabDiscussionMessage)
  discussionMessages!: CollabDiscussionMessage[]

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
    const collab = await this.findByPk(collabId)

    if (!collab) {
      throw new Error('Collab not found')
    }

    return collab
  }

  static async addMember(collabId: string, ownerId: string, memberId: string) {
    return this.sequelize!.transaction(async () => {
      const [collab, isMember, memberRequest] = await Promise.all([
        Collab.findByPk(collabId),
        CollabMember.findOne({
          where: { collabId, memberId },
        }),
        CollabMemberRequest.findOne({
          where: { collabId, memberId },
        }),
      ])

      if (!collab) {
        throw new Error('Collab not found')
      }
      if (ownerId !== collab.ownerId) {
        throw new Error('You have no permissions to add members')
      }
      if (isMember) {
        throw new Error('User is already a member')
      }
      if (!memberRequest) {
        throw new Error('Request does not exist anymore')
      }

      await Promise.all([
        //
        collab.createMember({ memberId }),
        memberRequest.destroy(),
      ])

      return collab
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

  static async inviteMember(
    ownerId: string,
    memberId: string,
    collabId: string
  ) {
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
        'The owner of this collab already invited you to join, please check your invitations'
      )
    }

    await CollabMemberRequest.create({ collabId, memberId, type: 'request' })

    return true
  }

  static async toggleAcceptInvites(collabId: string, ownerId: string) {
    const collab = await this.findByPk(collabId)

    if (!collab) {
      throw new Error('Collab not found')
    }

    if (collab.get('ownerId') !== ownerId) {
      throw new Error('You have no permissions to update invitation status')
    }

    collab.acceptsInvites = !collab.acceptsInvites
    await collab.save()

    return collab
  }

  static async declineMemberRequest(
    collabId: string,
    memberId: string,
    ownerId: string
  ) {
    return this.sequelize!.transaction(async () => {
      const [collab, requestExist] = await Promise.all([
        Collab.findByPk(collabId),
        CollabMemberRequest.findOne({
          where: { collabId, memberId },
        }),
      ])

      if (!collab) {
        throw new Error('Collab not found')
      }
      if (ownerId !== collab.ownerId) {
        throw new Error('You have no permissions to decline this request')
      }
      if (!requestExist) {
        throw new Error('Request does not exist anymore')
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

  static async createTaskList(
    collabId: string,
    name: string,
    order: number,
    ownerId: string
  ) {
    const collab = await this.findByPk(collabId)

    if (!collab) {
      throw new Error('Collab not found')
    }
    if (ownerId !== collab.ownerId) {
      throw new Error('You have no permissions to create a task list')
    }

    return CollabTaskList.create({
      collabId,
      name,
      order,
    })
  }

  static async deleteTaskList(taskListId: string, ownerId: string) {
    const taskList = await CollabTaskList.findByPk(taskListId, {
      include: [
        {
          model: Collab,
          where: { ownerId },
        },
      ],
    })

    if (!taskList) {
      throw new Error('Task list not found')
    }

    await taskList.destroy()

    return true
  }
}
