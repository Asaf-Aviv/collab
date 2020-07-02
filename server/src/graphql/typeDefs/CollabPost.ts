import { gql } from 'apollo-server-express'

export const collabPostTypeDefs = gql`
  type Query {
    collabPosts(offset: Int!, limit: Int!): CollabPostsPayload!
    collabPost(postId: ID!): CollabPost
    languages: [String!]!
    collabPostsByStack(
      stack: String!
      offset: Int!
      limit: Int!
    ): CollabPostsSearchResultsPayload!
    searchPostsByTitle(
      input: SearchPostsInput!
    ): CollabPostsSearchResultsPayload!
    advancedPostsSearch(
      input: AdvancedPostsSearchInput!
    ): CollabPostsSearchResultsPayload!
  }

  type Mutation {
    createCollabPost(post: CollabPostArgs!): CollabPost!
    deleteCollabPost(postId: ID!): Boolean!
  }

  input AdvancedPostsSearchInput {
    experience: Experience
    hasStarted: Boolean
    isNew: Boolean
    languages: [String!]
    stack: [String!]
    offset: Int!
    limit: Int!
  }

  type CollabPostsSearchResultsPayload {
    hasNextPage: Boolean!
    posts: [CollabPost!]!
  }

  input SearchPostsInput {
    title: String!
    offset: Int!
    limit: Int!
  }

  type SearchPostsPayload {
    posts: [CollabPost!]!
    totalResults: Int!
    hasNextPage: Boolean!
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
    creationDate: Date!
    updatedAt: String!
    isNew: Boolean!
    reactions: [Reaction!]!
    reactionsCount: Int!
  }

  type CollabPostsPayload {
    hasNextPage: Boolean!
    posts: [CollabPost!]!
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
