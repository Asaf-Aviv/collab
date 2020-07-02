/* eslint-disable */
require('dotenv').config()
import { createServer } from 'http'
import sequelize from './db/sequelize'
import { app, apolloServer } from './app'
import { models } from './db/models'
import { pubsub } from './graphql/helpers/pubsub'

const PORT = 5555

const httpServer = createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)

sequelize
  .authenticate()
  .then(async () => {
    // await sequelize.sync({ force: true })

    httpServer.listen(PORT, () =>
      console.info(`Server running on port ${PORT}`),
    )
  })
  .catch(console.log)
