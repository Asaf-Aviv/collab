import { gql } from 'apollo-server-express'

export const collabPostTypeDefs = gql`
  type Query {
    collabPosts: [CollabPost!]!
    collabPost(postId: ID!): CollabPost
    languages: [String!]!
    collabPostsByStack(stack: String!): [CollabPost!]!
  }

  type Mutation {
    createCollabPost(post: CollabPostArgs!): CollabPost!
    deleteCollabPost(postId: ID!): Boolean!
  }

  type CollabPost {
    id: ID!
    name: String!
    title: String!
    description: String!
    owner: User!
    collabId: ID!
    experience: String!
    stack: [String!]!
    hasStarted: Boolean!
    acceptsInvites: Boolean!
    membersCount: Int!
    members: [User!]!
    isOwner: Boolean!
    languages: [String!]!
    isMember: Boolean!
    invitationPending: Boolean!
    requestToJoinPending: Boolean!
    comments: [CollabPostComment!]!
    commentsCount: Int!
    pendingInvites: [User!]!
    pendingRequests: [User!]!
    createdAt: String!
    updatedAt: String!
    isNew: Boolean!
    reactions: [Reaction!]!
    reactionsCount: Int!
  }

  input CollabPostArgs {
    name: String!
    title: String!
    experience: Experience!
    languages: [String!]!
    stack: [String!]!
    description: String!
    hasStarted: Boolean!
  }

  enum Experience {
    ALL
    JUNIOR
    JUNIOR_MID
    MID
    MID_SENIOR
    SENIOR
  }
`
