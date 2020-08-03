import { gql } from 'apollo-boost'

export const NEW_NOTIFICATION = gql`
  subscription NewNotification {
    newNotification {
      id
      message
      title
      type
      isRead
      url
      creationDate
    }
  }
`

export const NEW_FRIEND_REQUEST = gql`
  subscription NewFriendRequest {
    newFriendRequest {
      user {
        id
        username
        avatar
      }
    }
  }
`

export const FRIEND_STATUS_CHANGE = gql`
  subscription FriendStatusChange {
    friendStatusChange {
      user {
        id
        username
        avatar
      }
      status
    }
  }
`

export const NEW_PRIVATE_CHAT_MESSAGE = gql`
  subscription NewPrivateChatMessage {
    newPrivateChatMessage {
      id
      authorId
      content
      creationDate
    }
  }
`
