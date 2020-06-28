import {
  Model,
  ForeignKey,
  Column,
  PrimaryKey,
  BelongsTo,
  IsUUID,
  Default,
} from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'
import { User } from './User'

export class Reaction extends Model<Reaction> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string

  @ForeignKey(() => User)
  @Column({ unique: 'unique_reaction' })
  userId!: string

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  user!: User

  @Column({ unique: 'unique_reaction' })
  emojiId!: string
}
