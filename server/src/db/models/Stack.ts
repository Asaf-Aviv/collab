import {
  Model,
  Table,
  Column,
  PrimaryKey,
  IsUUID,
  Default,
  Unique,
  DataType,
  BeforeValidate,
} from 'sequelize-typescript'
import uuid from 'uuid/v4'

@Table({ tableName: 'stacks', timestamps: false })
export class Stack extends Model<Stack> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string

  @Unique
  @Column(DataType.CITEXT)
  name!: string

  @BeforeValidate
  static trimName(instance: Stack) {
    instance.name = instance.name.trim()
  }
}
