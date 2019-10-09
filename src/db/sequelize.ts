import { Sequelize } from 'sequelize-typescript';

export default new Sequelize(
  process.env.PG_DB as string,
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
    logging: process.env.NODE_ENV !== 'production'
      ? (sql: string) => {
        console.log(`\x1b[36mQUERY: \n\x1b[33m${sql}\n`);
        console.log('*'.repeat(20), '\n\u001b[0m');
      }
      : false,
    define: {
      underscored: true,
    },
    query: {
      raw: true,
    },
  },
);
