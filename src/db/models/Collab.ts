import {
  Model,
  Column,
  Table,
  IsUUID,
  PrimaryKey,
  Default,
  ForeignKey,
  DataType,
  Length,
  BelongsTo,
  HasMany,
  AllowNull,
} from 'sequelize-typescript';
import uuid from 'uuid/v4';
import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import { CollabMember } from './CollabMember';
import { User } from './User';

@Table({ tableName: 'collabs' })
export class Collab extends Model<Collab> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string;

  @AllowNull(false)
  @Column(DataType.ENUM('ALL', 'JUNIOR', 'JUNIOR_MID', 'MID_SENIOR', 'SENIOR'))
  experience!: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  stack!: string[];

  @Length({
    msg: 'Description must be between 10 characters and 500',
    min: 10,
    max: 500,
  })
  @AllowNull(false)
  @Column
  description!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  ownerId!: string;

  @BelongsTo(() => User, { foreignKey: 'ownerId', onDelete: 'cascade' })
  owner!: User;

  @HasMany(() => CollabMember)
  members!: CollabMember[];

  getMembers!: HasManyGetAssociationsMixin<CollabMember>;
  addMember!: HasManyAddAssociationMixin<CollabMember, string>;
  hasMember!: HasManyHasAssociationMixin<CollabMember, string>;
  countMembers!: HasManyCountAssociationsMixin;
  createMember!: HasManyCreateAssociationMixin<CollabMember>;
}
