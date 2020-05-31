import { Op } from 'sequelize'
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

const username = 'a'

sequelize
  .authenticate()
  .then(async () => {
    // await sequelize.sync({ force: true })

    console.log(
      await models.UserFriend.findAll({
        where: { userId: '6d480813-c854-40fc-a3cf-cea0944854ab' },
        attributes: [],
        include: [
          {
            attributes: ['id', 'avatar', 'username'],
            model: models.User,
            as: 'friend',
            where: { username: { [Op.like]: `%${username}%` } },
          },
        ],
        nest: true,
        raw: true,
        limit: 5,
      }),
    )

    httpServer.listen(PORT, () =>
      console.info(`Server running on port ${PORT}`),
    )
  })
  .catch(console.log)
