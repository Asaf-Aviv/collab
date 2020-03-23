import { gql } from 'apollo-server-express'

export const collabDiscussionThreadTypeDefs = gql`
  type Query {
    thread(threadId: ID!): CollabDiscussionThread
  }

  type Mutation {
    createCollabDiscussionThread(
      thread: CreateThreadArgs!
    ): CollabDiscussionThread!
    deleteCollabDiscussionThread(threadId: ID!): Boolean!
  }

  type CollabDiscussionThread {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [CollabDiscussionThreadComment!]!
    collab: Collab
    commentsCount: Int!
  }

  input CreateThreadArgs {
    title: String!
    content: String!
    collabId: ID!
  }
`
