import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript'
import { Collab } from './Collab'
import { User } from './User'

@Table({ tableName: 'collab_member_requests' })
export class CollabMemberRequest extends Model<CollabMemberRequest> {
  @PrimaryKey
  @ForeignKey(() => Collab)
  @Column
  collabId!: string

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  memberId!: string

  @BelongsTo(() => Collab, { foreignKey: 'collabId', onDelete: 'CASCADE' })
  collab!: Collab

  @BelongsTo(() => User, { foreignKey: 'memberId', onDelete: 'CASCADE' })
  member!: User

  @Column(DataType.ENUM('request', 'invitation'))
  type!: 'request' | 'invitation'
}
