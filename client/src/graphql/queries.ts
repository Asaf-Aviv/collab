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
  query CollabPosts($offset: Int!, $limit: Int!) {
    collabPosts(offset: $offset, limit: $limit) {
      hasNextPage
      posts {
        id
        title
        stack
        experience
        hasStarted
        languages
        createdAt
        isNew
        membersCount
        reactionsCount
        commentsCount
        owner {
          id
          username
          avatar
        }
      }
    }
  }
`

export const GET_COLLAB_POSTS_BY_STACK = gql`
  query CollabPostsByStack($stack: String!, $offset: Int!, $limit: Int!) {
    collabPostsByStack(stack: $stack, offset: $offset, limit: $limit) {
      hasNextPage
      posts {
        id
        title
        stack
        experience
        hasStarted
        languages
        createdAt
        isNew
        membersCount
        reactionsCount
        commentsCount
        owner {
          id
          username
          avatar
        }
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
      reactions {
        emojiId
        count
        isLiked
      }
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
        reactions {
          emojiId
          count
          isLiked
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
        bio
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
        reactionsCount
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
      reactions {
        emojiId
        count
        isLiked
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
        reactions {
          emojiId
          count
          isLiked
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
        order
        commentsCount
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
