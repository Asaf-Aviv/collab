import { Collab } from '../../db/models/Collab';
import { User } from '../../db/models/User';
import { IResolvers } from '../types.d';

const userResolver: IResolvers = {
  Query: {
    users: () => User.findAll(),
  },
  Mutation: {
    signUp: (root, { credentials }) => User.createUser(credentials),
    login: (root, { credentials }) => User.login(credentials),
  },
  User: {
    collabs: (root) => Collab.userCollabs(root.id),
  },
};

export default userResolver;
