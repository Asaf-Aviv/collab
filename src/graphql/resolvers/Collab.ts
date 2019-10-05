import { Collab } from '../../db/models/Collab';
import { IResolvers } from '../types.d';

const collabResolver: IResolvers = {
  Mutation: {
    createCollab: (root, { collab }) => Collab.createCollab(collab.ownerId),
  },
};

export default collabResolver;
