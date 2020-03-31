import { gql } from 'apollo-server-express'

export const collabPostCommentReactionTypeDefs = gql`
  type Mutation {
    addCollabPostCommentReaction(
      reaction: AddCollabPostCommentReactionInput!
    ): Boolean!
    removeCollabPostCommentReaction(
      reaction: RemoveCollabPostCommentReactionInput!
    ): Boolean!
  }

  input AddCollabPostCommentReactionInput {
    emojiId: ID!
    commentId: ID!
  }

  input RemoveCollabPostCommentReactionInput {
    emojiId: ID!
    commentId: ID!
  }
`
