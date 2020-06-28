import { gql } from 'apollo-server-express'

export const collabPostReactionTypeDefs = gql`
  type Mutation {
    addCollabPostReaction(reaction: AddCollabPostReactionInput!): CollabPost!
    removeCollabPostReaction(
      reaction: RemoveCollabPostReactionInput!
    ): CollabPost!
  }

  input AddCollabPostReactionInput {
    emojiId: ID!
    postId: ID!
  }

  input RemoveCollabPostReactionInput {
    emojiId: ID!
    postId: ID!
  }
`
