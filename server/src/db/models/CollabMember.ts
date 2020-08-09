import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
  Default,
  BelongsTo,
  IsUUID,
  CreatedAt,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { Collab } from './Collab'
import { User } from './User'

@Table({ tableName: 'collab_members' })
export class CollabMember extends Model<CollabMember> {
  @IsUUID(4)
  @Default(uuid)
  @PrimaryKey
  @Column
  id!: string

  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @BelongsTo(() => Collab, { foreignKey: 'collabId', onDelete: 'CASCADE' })
  collab!: Collab

  @ForeignKey(() => User)
  @Column
  memberId!: string

  @BelongsTo(() => User, { foreignKey: 'memberId', onDelete: 'CASCADE' })
  member!: User

  @CreatedAt
  creationDate!: Date
}
