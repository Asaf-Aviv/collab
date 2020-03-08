require('dotenv').config()
import { Sequelize } from 'sequelize'
import { User } from './db/models/User'
import sequelize from './db/sequelize'
import { app } from './app'
import { Collab } from './db/models/Collab'
import { CollabMember } from './db/models/CollabMember'
import { createLoaders } from './graphql/loaders/loaders'

const PORT = 5555

sequelize
  // .sync({ force: true })
  .authenticate()
  .then(async () => {
    console.log('Connected to postgres')
    createLoaders()
      .userLoader.loadMany([
        'f642f6e2-394e-4b53-84b1-572e582c70a5',
        'ba28c597-7b70-4d8d-9b85-e3e7d919c4b0',
        '955b1f19-c5ef-4508-91c1-fc8387c11969',
        '351adc61-8eba-4fc7-bbcc-110b36c96157',
        'ec49351c-2768-4554-975c-f876adf232b8',
      ])
      .then(x => console.log(x?.map(x => x?.id)))
    // const u = await User.findOne({
    //   raw: true,
    //   nest: true,
    //   where: {
    //     username: 'AsafAviv',
    //   },
    //   include: [
    //     {
    //       model: Collab,
    //       include: [
    //         {
    //           model: CollabMember,
    //           attributes: ['member_id'],
    //           include: [User],
    //         },
    //       ],
    //     },
    //   ],
    // })

    // console.log(JSON.stringify(u, null, 4))

    app.listen(PORT, () => console.info(`Server running on port ${PORT}`))
  })
  .catch(console.log)
