import { gql } from 'apollo-server-express'

export const privateMessageTypeDefs = gql`
  type Query {
    getConversation(
      userId: ID!
      offset: Int!
      limit: Int!
    ): GetConversationPayload!
  }

  type Mutation {
    sendPrivateMessage(input: SendPrivateMessageInput!): PrivateMessage!
    markPrivateMessageAsRead(messageId: ID!): Boolean!
    deletePrivateMessage(messageId: ID!): ID!
  }

  type PrivateMessage {
    id: ID!
    author: User
    recipient: User
    content: String!
    creationDate: Date!
    isRead: Boolean!
  }

  type PrivateMessagePreview {
    userId: ID!
    username: String!
    avatar: String
    content: String!
  }

  type GetConversationPayload {
    hasNextPage: Boolean!
    messages: [PrivateMessage!]!
  }

  input SendPrivateMessageInput {
    recipientId: ID!
    content: String!
  }
`
