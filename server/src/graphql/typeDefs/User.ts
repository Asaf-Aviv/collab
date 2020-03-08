import { gql } from 'apollo-server-express'

export const userTypeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    currentUser: CurrentUser
  }

  type Mutation {
    signUp(credentials: SignUpArgs!): AuthPayload!
    login(credentials: LoginArgs!): AuthPayload!
    deleteUser: Boolean!
    acceptCollabInvitation(collabId: ID!): User!
    declineCollabInvitation(collabId: ID!): Boolean!
  }

  type CurrentUser {
    id: ID!
    username: String!
    email: String!
    avatar: String
    collabs: [Collab!]!
    collabInvites: [Collab!]!
    collabRequests: [CollabRequest!]!
  }

  type User {
    id: ID!
    username: String!
    avatar: String
    collabs: [Collab!]!
  }

  type CollabRequest {
    collab: Collab!
    member: User!
  }

  type AuthPayload {
    token: String!
  }

  input SignUpArgs {
    username: String!
    email: String!
    password: String!
  }

  input LoginArgs {
    email: String!
    password: String!
  }
`
