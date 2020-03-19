import { gql } from 'apollo-boost'

// Current User
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      username
      avatar
      email
    }
  }
`

// Current User Collabs
export const GET_MY_COLLABS = gql`
  query GetMyCollabs {
    currentUser {
      id
      collabs {
        id
        name
      }
    }
  }
`

// Collab Post
export const GET_COLLAB_POSTS = gql`
  query CollabPosts {
    collabPosts {
      id
      title
      stack
      experience
      hasStarted
      createdAt
      isNew
      owner {
        id
        username
        avatar
      }
    }
  }
`

export const GET_COLLAB_POST = gql`
  query GetCollabPost($postId: ID!) {
    collabPost(postId: $postId) {
      id
      name
      title
      description
      isNew
      owner {
        id
        username
      }
      collabId
      experience
      stack
      hasStarted
      members {
        id
        username
        avatar
      }
      acceptsInvites
      isOwner
      isMember
      invitationPending
      requestToJoinPending
      createdAt
    }
  }
`

export const COLLAB_POST_COMMENTS = gql`
  query CollabPostComments($postId: ID!) {
    collabPost(postId: $postId) {
      id
      comments {
        id
        content
        author {
          id
          username
          avatar
        }
      }
    }
  }
`

// Collab
export const GET_COLLAB_BY_ID = gql`
  query Collab($collabId: ID!) {
    collab(collabId: $collabId) {
      id
      name
      owner {
        id
        username
        avatar
      }
      collabPostId
      acceptsInvites
      members {
        id
        username
        avatar
      }
      isOwner
      pendingInvites {
        id
        username
        avatar
      }
      pendingRequests {
        id
        username
        avatar
      }
      taskList {
        id
        name
        order
        tasks {
          id
          description
          author {
            id
            username
            avatar
          }
          comments {
            id
            content
            author {
              id
              username
              avatar
            }
          }
        }
      }
      discussionThreads {
        id
        title
        author {
          id
          username
          avatar
        }
        comments {
          id
          content
          author {
            id
            username
            avatar
          }
        }
      }
    }
  }
`

// Collab Member Actions
export const REQUEST_TO_JOIN_COLLAB = gql`
  mutation RequestToJoin($collabId: ID!) {
    requestToJoin(collabId: $collabId)
  }
`

export const CANCEL_COLLAB_REQUEST_TO_JOIN = gql`
  mutation CancelCollabRequestToJoin($collabId: ID!) {
    cancelRequestToJoin(collabId: $collabId)
  }
`

export const ACCEPT_COLLAB_INVITATION = gql`
  mutation AcceptCollabInvitation($collabId: ID!) {
    acceptCollabInvitation(collabId: $collabId) {
      id
    }
  }
`

export const DECLINE_COLLAB_INVITATION = gql`
  mutation DeclineCollabInvitation($collabId: ID!) {
    declineCollabInvitation(collabId: $collabId)
  }
`
