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
    updateUserInfo(input: UpdateUserInfoInput): CurrentUser!
  }

  type CurrentUser {
    id: ID!
    username: String!
    email: String!
    avatar: String
    firstName: String
    lastName: String
    """
    the user's engineering title
    """
    title: String
    country: String
    bio: String
    collabs: [Collab!]!
    collabInvites: [Collab!]!
    collabRequests: [CollabRequest!]!
    tasks: [Task!]!
  }

  type User {
    id: ID!
    username: String!
    firstName: String
    lastName: String
    """
    the user's engineering title
    """
    title: String
    avatar: String
    bio: String
    collabs: [Collab!]!
  }

  input UpdateUserInfoInput {
    firstName: String
    lastName: String
    title: String
    country: String
    bio: String
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
