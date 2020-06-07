import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
  BelongsTo,
  DataType,
  IsUUID,
  Default,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { Collab } from './Collab'
import { User } from './User'

@Table({ tableName: 'collab_member_requests' })
export class CollabMemberRequest extends Model<CollabMemberRequest> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string

  @Column(DataType.ENUM('request', 'invitation'))
  type!: 'request' | 'invitation'

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
}
