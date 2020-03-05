import { gql } from 'apollo-server-express'

export const collabDiscussionThreadCommentTypeDefs = gql`
  type Mutation {
    createCollabDiscussionThreadComment(
      content: String!
      collabId: String!
      threadId: ID!
    ): CollabDiscussionThreadComment!
    deleteCollabDiscussionThreadComment(commentId: ID!): Boolean!
  }

  type CollabDiscussionThreadComment {
    id: ID!
    content: String!
    author: User
    thread: CollabDiscussionThread
    collab: Collab
  }
`
