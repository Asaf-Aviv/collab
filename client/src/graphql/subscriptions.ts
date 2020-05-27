import { gql } from 'apollo-boost'

export const NEW_NOTIFICATION = gql`
  subscription NewNotification {
    newNotification {
      id
      body
      title
      type
      isRead
      url
    }
  }
`
