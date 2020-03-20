import {
  Model,
  Table,
  Column,
  PrimaryKey,
  Unique,
  Index,
  AutoIncrement,
} from 'sequelize-typescript'

@Table({ tableName: 'languages', timestamps: false })
export class Language extends Model<Language> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Index
  @Unique
  @Column
  name!: string
}
