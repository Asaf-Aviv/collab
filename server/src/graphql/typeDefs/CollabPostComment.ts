import { gql } from 'apollo-server-express'

export const collabPostCommentTypeDefs = gql`
  type Mutation {
    createComment(content: String!, postId: ID!): CollabPostComment!
    deleteComment(commentId: ID!): Boolean!
  }

  type CollabPostComment {
    id: ID!
    content: String!
    author: User
  }
`
