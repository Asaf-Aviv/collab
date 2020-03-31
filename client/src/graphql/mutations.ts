import { gql } from 'apollo-boost'

// Authentication
export const SIGNUP = gql`
  mutation SignUp($credentials: SignUpArgs!) {
    signUp(credentials: $credentials) {
      token
    }
  }
`

export const LOGIN = gql`
  mutation Login($credentials: LoginArgs!) {
    login(credentials: $credentials) {
      token
    }
  }
`

// Collab Post
export const CREATE_COLLAB_POST = gql`
  mutation CreateCollabPost($post: CollabPostArgs!) {
    createCollabPost(post: $post) {
      id
    }
  }
`

export const ADD_COLLAB_POST_COMMENT = gql`
  mutation AddCollabPostComment($content: String!, $postId: ID!) {
    createComment(content: $content, postId: $postId) {
      id
      content
      author {
        id
        username
        avatar
      }
    }
  }
`

export const ADD_COLLAB_POST_REACTION = gql`
  mutation AddCollabPostReaction($reaction: AddCollabPostReactionInput!) {
    addCollabPostReaction(reaction: $reaction) {
      id
      reactions {
        emojiId
        count
        isLiked
      }
    }
  }
`

export const REMOVE_COLLAB_POST_REACTION = gql`
  mutation RemoveCollabPostReaction($reaction: RemoveCollabPostReactionInput!) {
    removeCollabPostReaction(reaction: $reaction) {
      id
      reactions {
        emojiId
        count
        isLiked
      }
    }
  }
`

export const ADD_COLLAB_POST_COMMENT_REACTION = gql`
  mutation AddCollabPostCommentReaction(
    $reaction: AddCollabPostCommentReactionInput!
  ) {
    addCollabPostCommentReaction(reaction: $reaction)
  }
`

export const REMOVE_COLLAB_POST_COMMENT_REACTION = gql`
  mutation RemoveCollabPostCommentReaction(
    $reaction: RemoveCollabPostCommentReactionInput!
  ) {
    removeCollabPostCommentReaction(reaction: $reaction)
  }
`

export const ADD_COLLAB_DISCUSSION_THREAD_REACTION = gql`
  mutation AddCollabDiscussionThreadReaction(
    $reaction: AddCollabDiscussionThreadReactionInput!
  ) {
    addCollabDiscussionThreadReaction(reaction: $reaction)
  }
`

export const REMOVE_COLLAB_DISCUSSION_THREAD_REACTION = gql`
  mutation RemoveCollabDiscussionThreadReaction(
    $reaction: RemoveCollabDiscussionThreadReactionInput!
  ) {
    removeCollabDiscussionThreadReaction(reaction: $reaction)
  }
`

export const ADD_DISCUSSION_THREAD_COMMENT_REACTION = gql`
  mutation AddDiscussionThreadCommentReaction(
    $reaction: AddDiscussionThreadCommentReactionInput!
  ) {
    addCollabDiscussionThreadCommentReaction(reaction: $reaction)
  }
`

export const REMOVE_DISCUSSION_THREAD_COMMENT_REACTION = gql`
  mutation RemoveDiscussionThreadCommentReaction(
    $reaction: RemoveDiscussionThreadCommentReactionInput!
  ) {
    removeCollabDiscussionThreadCommentReaction(reaction: $reaction)
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
      username
      avatar
    }
  }
`

export const DECLINE_COLLAB_INVITATION = gql`
  mutation DeclineCollabInvitation($collabId: ID!) {
    declineCollabInvitation(collabId: $collabId)
  }
`

// Task List
export const CREATE_TASK_LIST = gql`
  mutation CreateTaskList($input: CreateTaskListInput!) {
    createTaskList(input: $input) {
      id
    }
  }
`

export const UPDATE_TASK_LIST_POSITION = gql`
  mutation UpdateTaskListPosition($input: UpdateTaskListPositionInput!) {
    updateTaskListPosition(input: $input) {
      id
    }
  }
`

export const DELETE_TASK_LIST = gql`
  mutation DeleteTaskList($taskListId: ID!) {
    deleteTaskList(taskListId: $taskListId)
  }
`

// Task
export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      taskListId
      description
      order
      author {
        id
        username
        avatar
      }
      commentsCount
    }
  }
`

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`

export const MOVE_TASK_TO_LIST = gql`
  mutation MoveTaskToList($input: MoveTaskToListInput!) {
    moveTaskToList(input: $input) {
      id
    }
  }
`

export const UPDATE_TASK_POSITION = gql`
  mutation UpdateTaskPosition($input: UpdateTaskPositionInput!) {
    updateTaskPosition(input: $input) {
      id
    }
  }
`

// Thread
export const ADD_DISCUSSION_THREAD_COMMENT = gql`
  mutation CreateDiscussionThreadComment(
    $input: CreateCollabDiscussionThreadCommentInput!
  ) {
    createCollabDiscussionThreadComment(input: $input) {
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
`
