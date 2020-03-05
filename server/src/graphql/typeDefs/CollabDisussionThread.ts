import { gql } from 'apollo-server-express'

export const collabDiscussionThreadTypeDefs = gql`
  type Mutation {
    createCollabDiscussionThread(
      title: String!
      collabId: ID!
    ): CollabDiscussionThread!
    deleteCollabDiscussionThread(threadId: ID!): Boolean!
  }

  type CollabDiscussionThread {
    id: ID!
    title: String!
    author: User
    comments: [CollabDiscussionThreadComment!]!
    collab: Collab
  }
`
