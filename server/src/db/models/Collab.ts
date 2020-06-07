import { GQLResolverTypes } from '../../graphql/helpers/GQLResolverTypes'
import { CollabMemberRequest } from './CollabMemberRequest'
import {
  Model,
  Column,
  Table,
  IsUUID,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  HasMany,
  AllowNull,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { CollabMember } from './CollabMember'
import { User } from './User'
import { CollabTaskList } from './CollabTaskList'
import { CollabDiscussionThreadComment } from './CollabDiscussionThreadComment'
import { CollabPost } from './CollabPost'
import { CollabPostStack } from './CollabPostStack'
import { CollabWallMessage } from './CollabWallMessage'

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
  @Default(true)
  @Column
  acceptsInvites!: boolean

  @ForeignKey(() => CollabPost)
  @Default(null)
  @Column
  collabPostId!: string

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  ownerId!: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date

  @BelongsTo(() => User, { foreignKey: 'ownerId', onDelete: 'cascade' })
  owner!: User

  @HasMany(() => CollabMember)
  members!: User[]

  @HasMany(() => CollabMemberRequest)
  pendingInvites!: User[]

  @HasMany(() => CollabMemberRequest)
  pendingRequests!: User[]

  @HasMany(() => CollabTaskList)
  taskList!: CollabTaskList[]

  @HasMany(() => CollabPostStack)
  stack!: CollabPostStack[]

  @HasMany(() => CollabWallMessage)
  wall!: CollabWallMessage[]

  @HasMany(() => CollabDiscussionThreadComment)
  discussionComments!: CollabDiscussionThreadComment[]

  static createCollab(collabArgs: any, userId: string) {
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

  static async removeMember(
    collabId: string,
    ownerId: string,
    memberId: string,
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
    collabId: string,
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
    const [collab, invitation, isMember] = await Promise.all([
      this.findByPk(collabId),
      CollabMemberRequest.findOne({ where: { collabId, memberId } }),
      CollabMember.findOne({ where: { collabId, memberId } }),
    ])

    if (!collab) {
      throw new Error('Collab not found')
    }

    if (isMember) {
      throw new Error('You are already a member of this Collab')
    }

    if (invitation && invitation.type === 'request') {
      throw new Error('Your request is still pending approval')
    }

    if (invitation && invitation.type === 'invitation') {
      throw new Error(
        'The owner of this collab already invited you to join, please check your invitations',
      )
    }

    return CollabMemberRequest.create({ collabId, memberId, type: 'request' })
  }

  static async cancelRequestToJoin(collabId: string, memberId: string) {
    const request = await CollabMemberRequest.findOne({
      where: { collabId, memberId, type: 'request' },
    })

    if (!request) {
      throw new Error('Request does not exist')
    }

    await request.destroy()

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

  static async acceptMemberRequest(
    collabId: string,
    ownerId: string,
    memberId: string,
  ) {
    return this.sequelize!.transaction(async () => {
      const [collab, isMember, request] = await Promise.all([
        Collab.findByPk(collabId),
        CollabMember.findOne({
          where: { collabId, memberId },
        }),
        CollabMemberRequest.findOne({
          where: { collabId, memberId, type: 'request' },
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
      if (!request) {
        throw new Error('Request does not exist')
      }

      await Promise.all([
        //
        CollabMember.create({ collabId, memberId }),
        request.destroy(),
      ])

      return request.id
    })
  }

  static async declineMemberRequest(
    collabId: string,
    memberId: string,
    ownerId: string,
  ) {
    const [collab, request] = await Promise.all([
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
    if (!request) {
      throw new Error('Request does not exist anymore')
    }

    await request.destroy()

    return request.id
  }
}

export type GQLCollab = GQLResolverTypes<
  Collab,
  | 'owner'
  | 'taskList'
  | 'discussionComments'
  | 'members'
  | 'pendingInvites'
  | 'pendingRequests'
>
