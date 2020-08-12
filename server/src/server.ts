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
    // eslint-disable-next-line require-await
    sequelize.authenticate().then(async () => {
      // builds the database tables, make sure to comment it
      // after you build the database for the first time
      // await sequelize.sync({ force: true })

      httpServer.listen(PORT, () =>
        console.info(`Server running on port ${PORT}`),
      )
    }),
  )
  .catch(console.error)
