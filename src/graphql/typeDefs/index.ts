import { mergeTypes } from 'merge-graphql-schemas';
import userTypeDefs from './User';
import collabTypeDefs from './Collab';

const types = [
  userTypeDefs,
  collabTypeDefs,
];

export default mergeTypes(types, { all: true });
