import { gql } from 'apollo-server-express'

export const userTypeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    currentUser: CurrentUser
    searchFriends(input: SearchFriendsInput!): [User!]!
  }

  type Mutation {
    signUp(credentials: SignUpArgs!): AuthPayload!
    login(credentials: LoginArgs!): AuthPayload!
    deleteUser: Boolean!
    acceptCollabInvitation(collabId: ID!): ID!
    declineCollabInvitation(collabId: ID!): ID!
    updateUserInfo(input: UpdateUserInfoInput): CurrentUser!
    sendFriendRequest(friendId: ID!): Boolean!
    acceptFriendRequest(friendId: ID!): User!
    "returns the id of the declined friend"
    declineFriendRequest(senderId: ID!): ID!
    "returns the id of the removed friend"
    removeFriend(friendId: ID!): ID!
  }

  type Subscription {
    newFriendRequest: NewFriendRequestPayload!
  }

  type NewFriendRequestPayload {
    user: User!
  }

  type CurrentUser {
    id: ID!
    username: String!
    email: String!
    avatar: String
    firstName: String!
    lastName: String!
    "the user's engineering title"
    title: String!
    country: String
    bio: String!
    github: String!
    twitter: String!
    linkedin: String!
    friendRequests: [User!]!
    friendRequestsCount: Int!
    notificationsCount: Int!
    notifications: [Notification!]!
    friends: [User!]!
    collabs: [Collab!]!
    collabInvites: [Collab!]!
    collabRequests: [CollabRequest!]!
    tasks: [Task!]!
    conversationsPreview: [PrivateMessagePreview!]!
  }

  type User {
    id: ID!
    username: String!
    firstName: String
    lastName: String
    "the user's engineering title"
    title: String
    isFriend: Boolean!
    canRequestFriendship: Boolean!
    avatar: String
    bio: String
    collabs: [Collab!]!
  }

  input SearchFriendsInput {
    username: String!
  }

  input UpdateUserInfoInput {
    firstName: String!
    lastName: String!
    title: String!
    country: String
    bio: String!
    github: String!
    twitter: String!
    linkedin: String!
  }

  type CollabRequest {
    id: ID!
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
