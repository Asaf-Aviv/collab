import {
  Model,
  Column,
  Table,
  DataType,
  Unique,
  IsUUID,
  PrimaryKey,
  Default,
  Sequelize,
  BeforeCreate,
  DefaultScope,
  HasMany,
} from 'sequelize-typescript';
import { IndexesOptions } from 'sequelize';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';
import { SignupArgs, LoginArgs } from '../../graphql/types.d';
import { Collab } from './Collab';

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Table({
  indexes: [{
    name: 'username',
    unique: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    fields: [Sequelize.fn('lower', Sequelize.col('username'))] as IndexesOptions['fields'],
  },
  ],
})
export class User extends Model<User> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuid)
  @Column
  id!: string;

  @Column({
    validate: {
      len: {
        args: [3, 16],
        msg: 'Username should be between 3 and 16 characters',
      },
    },
  })
  username!: string;

  @Column
  password!: string;

  @Unique(true)
  @Column({
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @Default(Date.now)
  @Column(DataType.BIGINT)
  createdAt!: number;

  @Default(Date.now)
  @Column(DataType.BIGINT)
  updatedAt!: number;

  @HasMany(() => Collab)
  collabs!: Collab[];

  @BeforeCreate
  static formatFields(instance: User) {
    instance.username = instance.username.trim();
    instance.email = instance.email.trim().toLowerCase();
  }

  static async createUser(credentials: SignupArgs) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const validPassword = regex.test(credentials.password);

    if (!validPassword) {
      throw new Error(
        'Password must contain atleast eight characters, one letter and one number',
      );
    }

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
