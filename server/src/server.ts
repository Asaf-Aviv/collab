require('dotenv').config()
import { Sequelize } from 'sequelize'
import { User } from './db/models/User'
import sequelize from './db/sequelize'
import { app } from './app'
import { Collab } from './db/models/Collab'
import { CollabMember } from './db/models/CollabMember'

const PORT = 5555

sequelize
  .authenticate()
  .then(async () => {
    console.log('Connected to postgres')

    // const u = await User.create({
    //   username: 'AsafAviv',
    //   email: 'asafaviv89@gmail.com',
    //   password: '1234567q',
    // });

    // const u2 = await User.create({
    //   username: 'yojimboz',
    //   email: 'yojimboz@gmail.com',
    //   password: '1234567w',
    // });

    // const c = await u.createCollab({
    //   experience: 'JUNIOR_MID' as any,
    //   stack: [],
    //   description: 'Sick App with React',
    // });

    // const c2 = await u2.createCollab({
    //   experience: 'JUNIOR_MID' as any,
    //   stack: [],
    //   description: 'Sick App with React',
    // });

    // await c.createMember({ memberId: u.id, isOwner: true });
    // await c.createMember({ memberId: u2.id });
    // await c2.createMember({ memberId: u2.id, isOwner: true });
    // const t = await c2.createMember({ memberId: u.id });

    // console.log(await c2.getMembers());

    // console.log(props(u));
    // console.log(Object.keys(Object.getPrototypeOf(c2)));

    // console.log(await CollabMember.findAll({
    //   attributes: ['collabId'],
    //   where: { memberId: u.id },
    //   include: [Collab],
    //   raw: true,
    //   nest: true,
    // }));

    // // console.log(await c.getMembers({ include: [{ model: User, as: 'member' }], raw: true }));
    // console.log(await Collab.findAll({
    //   include: [{
    //     model: CollabMember,
    //     attributes: [],
    //     as: 'members',
    //     include: [User],
    //   }],
    //   raw: true,
    // }));

    // const t = await CollabMember.create({ collabId: c.id, memberId: u2.id });

    // console.log(await Collab.findAll({ raw: true }));
    // console.log(await CollabMember.findAll({ raw: true }));
    // console.log(await User.findAll({ raw: true }));

    // console.log(Object.keys(Object.getPrototypeOf(u)));
    // console.log(Object.keys(Object.getPrototypeOf(c)));
    // console.log(Object.keys(Object.getPrototypeOf(t)));
    // console.log(await (t as any).getMember({ raw: true }));
    // console.log(await (t as any).getCollab({ raw: true }));

    // console.log(await CollabMember.findAll({
    //   where: { collabId: c.id },
    //   attributes: ['memberId', [Sequelize.fn('array_agg', Sequelize.col('CollabMember.member_id')), 'members']],
    //   raw: true,
    //   nest: true,
    // }));

    // console.log(await CollabMember.findAll({
    //   attributes: ['collabId', [Sequelize.fn('count', Sequelize.col('CollabMember.member_id')), 'cnt']],
    //   group: ['collabId'],
    //   include: [User],
    //   raw: true,
    //   nest: true,
    // }));

    // const t = await c.createCollabMember({ memberId: c.ownerId });

    // await User.destroy({ where: { id: u.id } });
    // await Collab.destroy({ where: { id: c.id } });
    // console.log(await Collab.findAll({ raw: true }));
    // console.log(await User.findAll({ raw: true }));

    // for (let i = 0; i < 1; i++) {
    //   await Collab.createCollab({
    //     ownerId: u.id,
    //     experience: 'JUNIOR_MID' as any,
    //     stack: [],
    //     description: 'Sick App with React',
    //   });
    // }

    // const c = await Collab.findAll({ raw: true, nest: true });
    // console.log(c);
    // const a = await Team.findAll({ raw: true, nest: true });

    // console.log(a);

    // await Collab.findAll({ include: [Team], raw: true }).then(console.log);

    // const t = await Collab.findAll({
    //   include: [{ model: User }],
    //   raw: true,
    //   nest: true,
    // });
    // console.log(t);

    // try {
    //   const g = await User.findAll({
    //     include: [{ model: Collab }],
    //     raw: true,
    //     nest: true,
    //   });
    //   console.log(g);
    // } catch (error) {
    //   console.log(error.message);
    // }
    // try {
    //   const g = await User.findAll({
    //     include: [
    //       {
    //         model: Collab,
    //         include: [{ model: User }],
    //       },
    //     ],
    //     raw: true,
    //     nest: true,
    //   });
    //   console.log(JSON.stringify(g, null, 4));
    // } catch (error) {
    //   console.log(error.message);
    // }
    app.listen(PORT, () => console.info(`Server running on port ${PORT}`))
  })
  .catch(console.log)
