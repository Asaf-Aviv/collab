/* eslint-disable-line */
require('dotenv').config()
import { createServer } from 'http'
import sequelize from './db/sequelize'
import { app, apolloServer } from './app'
import { redis } from './redis/redis'

const PORT = process.env.PORT || 5555

const httpServer = createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)

redis
  .flushall()
  .then(() =>
    sequelize.authenticate().then(() => {
      // builds the database tables, make sure you comment it
      // after you build the database for the first time
      // sequelize.sync({ force: true })

      httpServer.listen(PORT, () =>
        console.info(`Server running on port ${PORT}`),
      )
    }),
  )
  .catch(console.error)
