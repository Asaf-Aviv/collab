import { gql } from 'apollo-server-express'

export const privateChatTypeDefs = gql`
  type Mutation {
    connectToChat(status: UserChatStatus!): ConnectToChatPayload!
    sendPrivateChatMessage(
      input: SendPrivateChatMessageInput!
    ): PrivateChatMessage!
    updateStatus(status: UserChatStatus!): Boolean!
  }

  type Subscription {
    newPrivateChatMessage: PrivateChatMessage!
    friendStatusChange: ChatUsersPayload!
  }

  enum UserChatStatus {
    ONLINE
    AWAY
    DND
    OFFLINE
  }

  type ConnectToChatPayload {
    users: [ChatUsersPayload!]!
  }

  type ChatUsersPayload {
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
