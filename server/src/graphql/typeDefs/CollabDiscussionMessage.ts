import { gql } from 'apollo-server-express'

export const collabDiscussionMessageTypeDefs = gql`
  type Mutation {
    createCollabDiscussionMessage(
      content: String!
      collabId: ID!
    ): CollabDiscussionMessage!
    deleteCollabDiscussionMessage(messageId: ID!): Boolean!
  }

  type CollabDiscussionMessage {
    id: ID!
    content: String!
    authorId: ID!
    author: User
    collabId: ID!
  }
`
