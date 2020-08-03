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

// CurrentUser
export const UPDATE_CURRENT_USER_INFO = gql`
  mutation UpdateUserInfo($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      firstName
      lastName
      title
      country
      bio
    }
  }
`

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: Upload!) {
    uploadAvatar(avatar: $avatar) {
      id
      avatar
    }
  }
`

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($notificationId: ID!) {
    markNotificationAsRead(notificationId: $notificationId) {
      id
      isRead
    }
  }
`

export const MARK_ALL_NOTIFICATIONS_AS_READ = gql`
  mutation MarkAllNotificationsAsRead {
    markAllNotificationsAsRead
  }
`

export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($notificationId: ID!) {
    deleteNotification(notificationId: $notificationId)
  }
`

export const DELETE_ALL_NOTIFICATIONS = gql`
  mutation DeleteAllNotifications {
    deleteAllNotifications
  }
`

export const SEND_PRIVATE_MESSAGE = gql`
  mutation SendPrivateMessage($input: SendPrivateMessageInput!) {
    sendPrivateMessage(input: $input) {
      id
      author {
        id
        username
        avatar
      }
      recipient {
        id
        username
        avatar
      }
      content
      creationDate
      isRead
    }
  }
`

export const DELETE_PRIVATE_MESSAGE = gql`
  mutation DeletePrivateMessage($messageId: ID!) {
    deletePrivateMessage(messageId: $messageId)
  }
`

// export const READ_CONVERSATION = gql`
//   mutation NarkPrivateMessageAsRead($input: SendPrivateMessageInput!) {
//     sendPrivateMessage(input: $input) {
//       id
//       author {
//         id
//         username
//         avatar
//       }
//       recipient {
//         id
//         username
//         avatar
//       }
//       content
//       creationDate
//       isRead
//     }
//   }
// `

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($friendId: ID!) {
    sendFriendRequest(friendId: $friendId) {
      id
      canRequestFriendship
    }
  }
`

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($friendId: ID!) {
    acceptFriendRequest(friendId: $friendId) {
      id
      username
      avatar
      canRequestFriendship
      isFriend
    }
  }
`

export const DECLINE_FRIEND_REQUEST = gql`
  mutation DeclineFriendRequest($senderId: ID!) {
    declineFriendRequest(senderId: $senderId) {
      id
      canRequestFriendship
    }
  }
`

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      id
      canRequestFriendship
      isFriend
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
export const INVITE_MEMBER = gql`
  mutation InviteMember($collabId: ID!, $memberId: ID!) {
    inviteMember(collabId: $collabId, memberId: $memberId) {
      id
      username
      avatar
    }
  }
`

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
    acceptCollabInvitation(collabId: $collabId)
  }
`

export const DECLINE_COLLAB_INVITATION = gql`
  mutation DeclineCollabInvitation($collabId: ID!) {
    declineCollabInvitation(collabId: $collabId)
  }
`

export const ACCEPT_COLLAB_MEMBER_REQUEST = gql`
  mutation AcceptMemberRequest($collabId: ID!, $memberId: ID!) {
    acceptMemberRequest(collabId: $collabId, memberId: $memberId)
  }
`

export const DECLINE_COLLAB_MEMBER_REQUEST = gql`
  mutation DeclineMemberRequest($collabId: ID!, $memberId: ID!) {
    declineMemberRequest(collabId: $collabId, memberId: $memberId)
  }
`

export const REMOVE_COLLAB_MEMBER = gql`
  mutation RemoveMember($collabId: ID!, $memberId: ID!) {
    removeMember(collabId: $collabId, memberId: $memberId) {
      id
      members {
        id
        username
        avatar
      }
    }
  }
`

// Collab wall
export const CREATE_WALL_MESSAGE = gql`
  mutation CreateWallMessage($input: CreateWallMessageInput!) {
    createWallMessage(input: $input) {
      id
      content
      creationDate
      isAuthor
      author {
        id
        username
        avatar
      }
    }
  }
`

export const DELETE_WALL_MESSAGE = gql`
  mutation DeleteWallMessage($messageId: ID!) {
    deleteWallMessage(messageId: $messageId)
  }
`

// Task List
export const CREATE_TASK_LIST = gql`
  mutation CreateTaskList($input: CreateTaskListInput!) {
    createTaskList(input: $input) {
      id
      name
      order
    }
  }
`

export const UPDATE_TASK_LIST_NAME = gql`
  mutation UpdateTaskListName($input: UpdateTaskListNameInput!) {
    updateTaskListName(input: $input) {
      id
      name
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
      description
      order
      taskListId
      author {
        id
        username
        avatar
      }
      commentsCount
      assignee {
        id
        username
        avatar
      }
      assignedBy {
        id
        username
        avatar
      }
    }
  }
`

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`

export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      description
      assignee {
        id
        username
        avatar
      }
      assignedBy {
        id
        username
        avatar
      }
    }
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

export const UPDATE_TASK_ASSIGNEE = gql`
  mutation UpdateTaskAssignee($input: UpdateTaskAssigneeInput!) {
    updateTaskAssignee(input: $input) {
      id
      assignee {
        id
        username
        avatar
      }
      assignedBy {
        id
        username
        avatar
      }
    }
  }
`

export const CREATE_TASK_COMMENT = gql`
  mutation CreateTaskComment($input: CreateTaskCommentInput!) {
    createTaskComment(input: $input) {
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
      }
    }
  }
`

export const ADD_TASK_COMMENT_REACTION = gql`
  mutation AddTaskCommentReaction(
    $reaction: AddCollabTaskCommentReactionInput!
  ) {
    addCollabTaskCommentReaction(reaction: $reaction)
  }
`

export const REMOVE_TASK_COMMENT_REACTION = gql`
  mutation RemoveTaskCommentReaction(
    $reaction: RemoveCollabTaskCommentReactionInput!
  ) {
    removeCollabTaskCommentReaction(reaction: $reaction)
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

// Chat
export const SEND_PRIVATE_CHAT_MESSAGE = gql`
  mutation SendPrivateChatMessage($input: SendPrivateChatMessageInput!) {
    sendPrivateChatMessage(input: $input) {
      id
      authorId
      content
      creationDate
    }
  }
`

export const UPDATE_STATUS = gql`
  mutation UpdateStatus($status: UserChatStatus!) {
    updateStatus(status: $status)
  }
`
