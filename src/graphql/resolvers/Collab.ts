import { User } from '../../db/models/User';
import { Collab as ModelCollab } from '../../db/models/Collab';
import { Resolvers } from '../types.d';

const collabResolver: Resolvers = {
  Mutation: {
    createCollab: (root, { collab }) => ModelCollab.createCollab(collab),
  },
  Collab: {
    owner: ({ ownerId }) => User.findByPk(ownerId, { raw: true }),
  },
};

export default collabResolver;
