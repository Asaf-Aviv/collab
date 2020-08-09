import { gql } from 'apollo-server-express'

export const privateChatTypeDefs = gql`
  type Query {
    onlineChatFriends: OnlineFriendsPayload!
  }

  type Mutation {
    sendPrivateChatMessage(
      input: SendPrivateChatMessageInput!
    ): PrivateChatMessage!
    updateStatus(status: UserChatStatus!): Boolean!
  }

  type Subscription {
    newPrivateChatMessage: PrivateChatMessage!
    friendStatusChange: ChatUserPayload!
  }

  enum UserChatStatus {
    ONLINE
    AWAY
    DND
    OFFLINE
  }

  type OnlineFriendsPayload {
    users: [ChatUserPayload!]!
  }

  type ChatUserPayload {
    user: User!
    status: UserChatStatus!
  }

  type PrivateChatMessage {
    id: ID!
    authorId: ID!
    content: String!
    creationDate: Date!
  }

  input SendPrivateChatMessageInput {
    recipientId: ID!
    content: String!
  }
`
