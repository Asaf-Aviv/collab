import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const baseConfig: SequelizeOptions = {
  modelPaths: [`${__dirname}/models`],
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // logging: process.env.NODE_ENV === 'development',
  define: {
    underscored: true,
  },
}

const dbByEnv = {
  development: 'collab_dev',
  test: 'collab_test',
  production: 'collab',
}

export default new Sequelize(
  dbByEnv[process.env.NODE_ENV as keyof typeof dbByEnv],
  'yojimbozx',
  'omgwtfbbq89',
  baseConfig,
)
