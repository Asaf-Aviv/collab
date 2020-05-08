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
    let rows = await CollabPost.findAll({
      attributes: ['id'],
      order: [
        ['created_at', 'desc'],
        ['id', 'desc'],
      ],
      offset: 0,
      limit: 10,
    })

    const rows2 = await CollabPost.findAll({
      attributes: ['id'],
      // [Sequelize.literal('"CollabPost".id, "CollabPost".createdAt'), 'desc'],
      order: [
        ['created_at', 'desc'],
        ['id', 'desc'],
      ],
      offset: 10,
      limit: 10,
    })

    console.log(rows2.length)
    console.log(
      rows
        .concat(rows2)
        .map(x => x.id)
        .sort(),
    )
    // console.log(rows2.map(x => x.id))

    // console.log('Connected to postgres')
    // const user = await User.findByPk('6d480813-c854-40fc-a3cf-cea0944854ab')
    // console.log(await user?.getFriends())
    // console.log(
    //   await User.findAll({
    //     where: { id: 'UserFriend.friend_id' },
    //     attributes: [],
    //     include: [
    //       {
    //         attributes: [],
    //         model: UserFriend,
    //         where: { userId: '6d480813-c854-40fc-a3cf-cea0944854ab' },
    //         include: [
    //           {
    //             model: User,
    //             foreignKey: 'friend_id',
    //             as: 'friend',
    //           },
    //         ],
    //       },
    //     ],
    //     nest: true,
    //     raw: true,
    //   }),
    // )
    // console.log(
    //   await User.findAll({
    //     where: { id: { [Op.ne]: '6d480813-c854-40fc-a3cf-cea0944854ab' } },
    //     include: [
    //       {
    //         attributes: [],
    //         on: {
    //           friend_id: { [Op.col]: 'User.id' },
    //           user_id: '6d480813-c854-40fc-a3cf-cea0944854ab',
    //         },
    //         model: UserFriend,
    //       },
    //     ],
    //     raw: true,
    //   }),
    // )
    // console.log(
    //   await user!.getFriends({
    //     attributes: ['friend.*'],
    //     include: [
    //       { attributes: [], model: User, as: 'friend', raw: true, nest: true },
    //     ],
    //     nest: true,
    //     raw: true,
    //   }),
    // )

    // console.log(
    //   await User.findAll({
    //     attributes: ['id', 'username'],
    //     // where: { id: 'UserFriend.friend_id' },
    //     include: [
    //       {
    //         where: {
    //           userId: '6d480813-c854-40fc-a3cf-cea0944854ab',
    //           friendId: {
    //             [Op.and]: {
    //               friendId: 'User.id',
    //               userId: {
    //                 [Op.ne]: '6d480813-c854-40fc-a3cf-cea0944854ab',
    //               },
    //             },
    //             // 'User.id',
    //           },
    //         },
    //         // where: {
    //         //   'User.id': '6d480813-c854-40fc-a3cf-cea0944854ab',
    //         // },
    //         // on: {
    //         //   'User.id': 'friend_id',
    //         // },
    //         attributes: [],
    //         model: UserFriend,
    //       },
    //     ],
    //     raw: true,
    //   }),
    // )
    // Collab.findAll({
    //   include: [
    //     {
    //       attributes: [],
    //       model: CollabMember,
    //       where: { memberId: '6d480813-c854-40fc-a3cf-cea0944854ab' },
    //     },
    //   ],
    //   raw: true,
    // })
    //   .then(console.log)
    //   .catch(x => x.message)
    // CollabPostReaction.findAll({ include: [CollabPost], raw: true }).then(
    // console.log,
    // )
    // const s = await Stack.create({ name: 'react' })
    // const s1 = await Stack.bulkCreate(
    //   [{ name: 'React' }, { name: 'JavaScript' }],
    //   {
    //     updateOnDuplicate: ['name'],
    //   }
    // )
    //   .then(values => values.map(v => v.get()))
    //   .then(console.log)
    //   .catch(console.log)

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

    httpServer.listen(PORT, () =>
      console.info(`Server running on port ${PORT}`),
    )
  })
  .catch(console.log)

// {
//   "id": "b6e6ddaa-c0dd-4495-8f63-fd1eea177ddf",
//   "username": "AbbieHuels"
// },
// {
//   "id": "67e0d6f4-5f74-4ef2-a112-55cbbe905f0a",
//   "username": "KeelyKuvalis"
// },
// {
//   "id": "6d480813-c854-40fc-a3cf-cea0944854ab",
//   "username": "AsafAviv"
// }
