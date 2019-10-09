import {
  Model,
  Column,
  Table,
  DataType,
  Unique,
  IsUUID,
  PrimaryKey,
  Default,
  BeforeCreate,
  DefaultScope,
  HasMany,
  Length,
  AllowNull,
  Validate,
} from 'sequelize-typescript';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';
import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyCountAssociationsMixin,
} from 'sequelize';
import { SignupArgs, LoginArgs } from '../../graphql/types.d';
import { Collab } from './Collab';
import { emailRegex } from '../../util';

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Table({ tableName: 'users' })
export class User extends Model<User> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string;

  @AllowNull(false)
  @Unique({
    msg: 'Username is already taken',
    name: 'unique_username',
  })
  @Length({
    min: 3,
    max: 16,
    msg: 'Username should be between 3 and 16 characters',
  })
  @Column(DataType.CITEXT)
  username!: string;

  @Validate({
    is: {
      args: emailRegex,
      msg: 'Password must contain atleast eight characters, one letter and one number',
    },
  })
  @AllowNull(false)
  @Column
  password!: string;

  @Unique({
    msg: 'Email is already taken',
    name: 'unique_email',
  })
  @Column({ validate: { isEmail: { msg: 'Invalid Email' } } })
  email!: string;

  @Default(Date.now)
  @Column(DataType.BIGINT)
  createdAt!: number;

  @Default(Date.now)
  @Column(DataType.BIGINT)
  updatedAt!: number;

  @HasMany(() => Collab)
  collabs?: Collab[];

  getCollabs!: HasManyGetAssociationsMixin<Collab>;
  addCollab!: HasManyAddAssociationMixin<Collab, string>;
  hasCollab!: HasManyHasAssociationMixin<Collab, string>;
  countCollabs!: HasManyCountAssociationsMixin;
  createCollab!: HasManyCreateAssociationMixin<Collab>;

  @BeforeCreate
  static formatFields(instance: User) {
    instance.username = instance.username.trim();
    instance.email = instance.email.trim().toLowerCase();
  }

  static async createUser(credentials: SignupArgs) {
    const hashedPassword = await bcrypt.hash(credentials.password, 12);
    await this.create({ ...credentials, password: hashedPassword });
    return true;
  }

  static async login({ email, password }: LoginArgs) {
    const user = await this.findOne({
      where: { email },
      attributes: { include: ['password'] },
    });

    if (!user) {
      throw new Error('Email Not Found');
    }

    const isMatchedPasswords = await bcrypt.compare(password, user.password);

    if (isMatchedPasswords) {
      return user;
    }

    throw new Error('Incorrect Credentials');
  }
}
