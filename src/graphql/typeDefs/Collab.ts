import { gql } from 'apollo-server-express';

const collabTypeDefs = gql`
  type Mutation {
    createCollab(collab: CollabArgs!): Collab!
  }

  type Collab {
    id: ID!
    ownerId: ID!
    owner: User
    experience: String!
    stack: [String!]!
    description: String!
  }

  input CollabArgs {
    ownerId: ID!
    experience: Experience!
    stack: [String!]!
    description: String!
  }

  enum Experience {
    ALL
    JUNIOR
    JUNIOR_MID
    MID
    MID_SENIOR
    SENIOR
  }
`;

export default collabTypeDefs;
