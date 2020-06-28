import { gql } from 'apollo-server-express'

export const ReactionTypeDefs = gql`
  type Reaction {
    emojiId: ID!
    count: Int!
    isLiked: Boolean!
  }
`
