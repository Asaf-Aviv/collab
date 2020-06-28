import { gql } from 'apollo-server-express'

export const collabTaskCommentReactionTypeDefs = gql`
  type Mutation {
    addCollabTaskCommentReaction(
      reaction: AddCollabTaskCommentReactionInput!
    ): Boolean!
    removeCollabTaskCommentReaction(
      reaction: RemoveCollabTaskCommentReactionInput!
    ): Boolean!
  }

  input AddCollabTaskCommentReactionInput {
    emojiId: ID!
    commentId: ID!
  }

  input RemoveCollabTaskCommentReactionInput {
    emojiId: ID!
    commentId: ID!
  }
`
