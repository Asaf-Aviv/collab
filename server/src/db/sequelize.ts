import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { models } from './models/index'

const baseConfig: SequelizeOptions = {
  models: Object.values(models),
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
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
