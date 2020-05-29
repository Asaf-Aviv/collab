import { gql } from 'apollo-server-express'

export const notificationTypeDefs = gql`
  type Subscription {
    newNotification: Notification!
  }

  type Mutation {
    markAsRead(notificationId: ID!): Notification!
    # markAllAsRead: Boolean!
  }

  type Notification {
    id: ID!
    type: String!
    body: String!
    title: String!
    url: String!
    isRead: Boolean!
    creationDate: Date!
  }
`
