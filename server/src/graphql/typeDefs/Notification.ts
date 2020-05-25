import { gql } from 'apollo-server-express'

export const notificationTypeDefs = gql`
  type Mutation {
    markAsRead(notificationId: ID!): Notification!
    # markAllAsRead: Boolean!
  }

  type Notification {
    id: ID!
    body: String!
    url: String!
    isRead: Boolean!
  }
`
