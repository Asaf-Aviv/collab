import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize(
  'collab',
  process.env.PG_USER as string,
  process.env.PG_PASS,
  {
    modelPaths: [`${__dirname}/models`],
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  },
);
