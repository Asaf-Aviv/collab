import { gql } from 'apollo-server-express'

export const collabDiscussionThreadCommentTypeDefs = gql`
  type Mutation {
    createCollabDiscussionThreadComment(
      input: CreateCollabDiscussionThreadCommentInput!
    ): CollabDiscussionThreadComment!
    deleteCollabDiscussionThreadComment(commentId: ID!): Boolean!
  }

  type CollabDiscussionThreadComment {
    id: ID!
    content: String!
    author: User!
    thread: CollabDiscussionThread
    collab: Collab
    reactions: [Reaction!]!
    creationDate: Date!
    isAuthor: Boolean!
  }

  input CreateCollabDiscussionThreadCommentInput {
    collabId: ID!
    threadId: ID!
    content: String!
  }
`
