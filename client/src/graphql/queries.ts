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

// user
export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      avatar
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
      languages
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
      languages
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

export const COLLAB_POST_LANGUAGES = gql`
  query CollabPostLanguages {
    languages
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
export const GET_COLLAB = gql`
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
    }
  }
`

export const GET_COLLAB_MEMBERS = gql`
  query CollabMembers($collabId: ID!) {
    collab(collabId: $collabId) {
      id
      members {
        id
        username
        avatar
      }
    }
  }
`

export const GET_COLLAB_DISCUSSIONS = gql`
  query CollabDiscussionThreads($collabId: ID!) {
    collab(collabId: $collabId) {
      id
      discussionThreads {
        id
        title
        author {
          id
          username
          avatar
        }
        commentsCount
      }
    }
  }
`

export const GET_COLLAB_DISCUSSION_THREAD = gql`
  query CollabThread($threadId: ID!) {
    thread(threadId: $threadId) {
      id
      title
      content
      author {
        id
        username
        avatar
      }
    }
  }
`

export const GET_COLLAB_DISCUSSION_THREAD_COMMENTS = gql`
  query CollabThreadComments($threadId: ID!) {
    thread(threadId: $threadId) {
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

export const GET_COLLAB_TASK_BOARD = gql`
  query TaskList($collabId: ID!) {
    taskList(collabId: $collabId) {
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
      }
    }
  }
`

export const GET_TASK_COMMENTS = gql`
  query TaskComments($taskId: ID!) {
    task(taskId: $taskId) {
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
