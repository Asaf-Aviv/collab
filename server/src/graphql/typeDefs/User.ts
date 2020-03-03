import { gql } from 'apollo-server-express'

export const userTypeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    signUp(credentials: SignupArgs!): Boolean!
    login(credentials: LoginArgs!): AuthPayload!
    validateToken: AuthPayload!
    deleteUser: Boolean!
    acceptCollabInvite(collabId: ID!): User!
    declineCollabInvite(collabId: ID!): Boolean!
  }

  type CurrentUser {
    id: ID!
    username: String!
    email: String!
    collabs: [Collab!]!
    collabInvites: [Collab!]!
    collabRequests: [CollabRequest!]!
  }

  type User {
    id: ID!
    username: String!
    collabs: [Collab!]!
  }

  type CollabRequest {
    collab: Collab!
    member: User!
  }

  type AuthPayload {
    token: String!
    user: CurrentUser!
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
