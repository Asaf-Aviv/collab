import { gql } from 'apollo-server-express'

const userTypeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    signUp(credentials: SignupArgs!): Boolean!
    login(credentials: LoginArgs!): AuthPayload!
    deleteUser(id: ID!): Boolean!
    acceptCollabInvite(collabId: ID!): User!
    declineCollabInvite(collabId: ID!): Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    collabs: [Collab!]!
    collabInvites: [Collab!]!
    collabRequests: [CollabRequest!]!
  }

  type CollabRequest {
    collab: Collab!
    member: User!
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
