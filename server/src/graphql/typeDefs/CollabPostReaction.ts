import { gql } from 'apollo-server-express'

export const collabPostReactionTypeDefs = gql`
  type Mutation {
    addCollabPostReaction(
      reaction: AddCollabPostReactionInput!
    ): CollabPostReaction!
    removeCollabPostReaction(reactionId: ID!): Boolean!
  }

  type CollabPostReaction implements Reaction {
    id: ID!
    emojiId: ID!
    user: User!
    postId: ID!
  }

  input AddCollabPostReactionInput {
    emojiId: ID!
    postId: ID!
  }
`
