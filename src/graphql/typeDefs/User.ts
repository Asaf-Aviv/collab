import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
  type Query {
    users: [User!]!
  }

  type Mutation {
    signUp(credentials: SignupArgs!): Boolean!
    login(credentials: LoginArgs!): User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    collabs: [Collab!]!
  }

  input SignupArgs {
    username: String!
    email: String!
    password: String!
  }

  input LoginArgs {
    email: String!
    password: String!
  }
`;

export default userTypeDefs;
