import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
  Default,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript'
import { Collab } from './Collab'
import { User } from './User'

@Table({ tableName: 'collab_members' })
export class CollabMember extends Model<CollabMember> {
  @PrimaryKey
  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, { foreignKey: 'collabId' })
  collab!: Collab

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  memberId!: string

  @BelongsTo(() => User, { foreignKey: 'memberId', onDelete: 'cascade' })
  member!: User

  @AllowNull(false)
  @Default(false)
  @Column
  isOwner!: boolean
}
