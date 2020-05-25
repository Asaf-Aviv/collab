import { gql } from 'apollo-boost'

const NEW_NOTIFICATION = gql`
  subscription NewNotification {
    newNotification {
      id
      body
      type
      isRead
      url
    }
  }
`
