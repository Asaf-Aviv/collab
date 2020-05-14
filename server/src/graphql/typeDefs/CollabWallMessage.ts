import { gql } from 'apollo-server-express'

export const collabWallMessageTypeDefs = gql`
  type Query {
    collabWallMessages(
      input: CollabWallMessagesInput!
    ): CollabWallMessagesPayload!
  }

  type Mutation {
    createWallMessage(input: CreateWallMessageInput!): WallMessage!
    deleteWallMessage(messageId: ID!): ID!
  }

  type WallMessage {
    id: ID!
    author: User!
    content: String!
    creationDate: Date!
  }

  input CreateWallMessageInput {
    collabId: ID!
    content: String!
  }

  type CollabWallMessagesPayload {
    messages: [WallMessage!]!
    hasNextPage: Boolean!
  }

  input CollabWallMessagesInput {
    collabId: ID!
    offset: Int!
    limit: Int!
  }
`
