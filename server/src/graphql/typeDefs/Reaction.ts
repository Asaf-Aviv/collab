import { gql } from 'apollo-server-express'

export const ReactionTypeDefs = gql`
  interface Reaction {
    id: ID!
    emojiId: ID!
    user: User!
  }
`
