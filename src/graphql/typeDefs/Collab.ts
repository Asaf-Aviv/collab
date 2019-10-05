import { gql } from 'apollo-server-express';

const collabTypeDefs = gql`
  type Mutation {
    createCollab(collab: CollabArgs!): Collab!
  }

  type Collab {
    id: ID!
    ownerId: ID!
  }

  input CollabArgs {
    ownerId: ID!
  }
`;

export default collabTypeDefs;
