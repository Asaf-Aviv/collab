import { gql } from 'apollo-server-express'

export const collabCommentTypeDefs = gql`
  type Mutation {
    addComment(content: String!, collabId: ID!): CollabComment!
    deleteComment(commentId: ID!): Boolean!
  }

  type CollabComment {
    id: ID!
    content: String!
    authorId: ID!
    author: User
    collabId: ID!
    collab: Collab
  }
`
