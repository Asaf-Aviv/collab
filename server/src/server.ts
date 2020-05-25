import express from 'express'
/* eslint-disable */
require('dotenv').config()
import { createServer } from 'http'
import { Sequelize, Op } from 'sequelize'
import { User } from './db/models/User'
import sequelize from './db/sequelize'
import { app, apolloServer } from './app'
import { Collab } from './db/models/Collab'
import { CollabMember } from './db/models/CollabMember'
import { createLoaders } from './graphql/loaders/loaders'
import { Stack } from './db/models/Stack'
import { CollabPostReaction } from './db/models/CollabPostReaction'
import { CollabPost } from './db/models/CollabPost'
import { UserFriend } from './db/models/UserFriend'
import { PrivateMessage } from './db/models/PrivateMessage'
import { Language } from './db/models/Language'
import { CollabPostLanguage } from './db/models/CollabPostLanguage'
import { subDays } from 'date-fns'

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
