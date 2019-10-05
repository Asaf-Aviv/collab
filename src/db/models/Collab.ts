import {
  Model,
  Column,
  Table,
  IsUUID,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  DataType,
  Length,
} from 'sequelize-typescript';
import uuid from 'uuid/v4';
import { CollabArgs } from '../../graphql/types.d';

import { User } from './User';

@Table
export class Collab extends Model<Collab> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string;

  @Column(DataType.ENUM('ALL', 'JUNIOR', 'JUNIOR_MID', 'MID_SENIOR', 'SENIOR'))
  experience!: string;

  @Column(DataType.ARRAY(DataType.STRING))
  stack!: string[];

  @Length({
    msg: 'Description must be between 10 characters and 500',
    min: 10,
    max: 500,
  })
  @Column(DataType.STRING())
  description!: string;

  @ForeignKey(() => User)
  @Column
  ownerId!: string;

  @BelongsTo(() => User)
  owner!: User;

  static async createCollab(collab: CollabArgs) {
    return this.create(collab);
  }

  static async getUserCollabs(userId: string) {
    return this.findAll({ raw: true, where: { ownerId: userId } });
  }
}
