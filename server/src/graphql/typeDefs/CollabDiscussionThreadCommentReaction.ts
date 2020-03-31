import { gql } from 'apollo-server-express'

export const collabDiscussionThreadCommentReactionTypeDefs = gql`
  type Mutation {
    addCollabDiscussionThreadCommentReaction(
      reaction: AddDiscussionThreadCommentReactionInput!
    ): Boolean!
    removeCollabDiscussionThreadCommentReaction(
      reaction: RemoveDiscussionThreadCommentReactionInput!
    ): Boolean!
  }

  input AddDiscussionThreadCommentReactionInput {
    emojiId: ID!
    commentId: ID!
  }

  input RemoveDiscussionThreadCommentReactionInput {
    emojiId: ID!
    commentId: ID!
  }
`
