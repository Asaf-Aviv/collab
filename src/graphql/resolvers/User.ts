import { Collab } from '../../db/models/Collab';
import { User } from '../../db/models/User';
import { Resolvers } from '../types.d';

const userResolver: Resolvers = {
  Query: {
    users: () => User.findAll(),
  },
  Mutation: {
    signUp: (root, { credentials }) => User.createUser(credentials),
    login: (root, { credentials }) => User.login(credentials),
  },
  User: {
    collabs: (root) => Collab.getUserCollabs(root.id),
  },
};

export default userResolver;
