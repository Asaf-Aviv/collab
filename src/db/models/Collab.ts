import {
  Model,
  Column,
  Table,
  IsUUID,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import uuid from 'uuid/v4';
import { User } from './User';

@Table
export class Collab extends Model<Collab> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string;

  @ForeignKey(() => User)
  @Column
  ownerId!: string;

  @BelongsTo(() => User)
  user!: User;

  static async createCollab(ownerId: string) {
    return this.create({ ownerId });
  }

  static async userCollabs(userId: string) {
    return this.findAll({ raw: true, where: { ownerId: userId } });
  }
}
