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
