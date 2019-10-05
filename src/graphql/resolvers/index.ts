import { mergeResolvers } from 'merge-graphql-schemas';
import userResolver from './User';
import collabResolver from './Collab';

const resolvers = [
  userResolver,
  collabResolver,
];

export default mergeResolvers(resolvers);
