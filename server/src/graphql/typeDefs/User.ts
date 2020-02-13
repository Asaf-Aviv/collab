import { gql } from 'apollo-server-express'

const userTypeDefs = gql`
  type Query {
    users: [User!]!
  }

  type Mutation {
    signUp(credentials: SignupArgs!): Boolean!
    login(credentials: LoginArgs!): AuthPayload!
    deleteUser(id: ID!): Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    collabs: [Collab!]!
  }

  type AuthPayload {
    token: String!
    user: User!
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
`

export default userTypeDefs

