import { Model, Table, Column, PrimaryKey } from 'sequelize-typescript'

@Table({ tableName: 'languages', timestamps: false })
export class Language extends Model<Language> {
  @PrimaryKey
  @Column
  name!: string
}
