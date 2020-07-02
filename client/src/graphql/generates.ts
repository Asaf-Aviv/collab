import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  advancedPostsSearch: CollabPostsSearchResultsPayload;
  collab: Maybe<Collab>;
  collabPost: Maybe<CollabPost>;
  collabPosts: CollabPostsPayload;
  collabPostsByStack: CollabPostsSearchResultsPayload;
  collabWallMessages: CollabWallMessagesPayload;
  collabs: Array<Collab>;
  currentUser: Maybe<CurrentUser>;
  getConversation: GetConversationPayload;
  languages: Array<Scalars['String']>;
  searchFriends: Array<User>;
  searchPostsByTitle: CollabPostsSearchResultsPayload;
  searchUsers: Array<User>;
  task: Maybe<Task>;
  taskList: TaskListPayload;
  thread: Maybe<CollabDiscussionThread>;
  user: Maybe<User>;
  users: Array<User>;
};


export type QueryAdvancedPostsSearchArgs = {
  input: AdvancedPostsSearchInput;
};


export type QueryCollabArgs = {
  collabId: Scalars['ID'];
};


export type QueryCollabPostArgs = {
  postId: Scalars['ID'];
};


export type QueryCollabPostsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryCollabPostsByStackArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  stack: Scalars['String'];
};


export type QueryCollabWallMessagesArgs = {
  input: CollabWallMessagesInput;
};


export type QueryGetConversationArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  userId: Scalars['ID'];
};


export type QuerySearchFriendsArgs = {
  input: SearchUsersInput;
};


export type QuerySearchPostsByTitleArgs = {
  input: SearchPostsInput;
};


export type QuerySearchUsersArgs = {
  input: SearchUsersInput;
};


export type QueryTaskArgs = {
  taskId: Scalars['ID'];
};


export type QueryTaskListArgs = {
  collabId: Scalars['ID'];
};


export type QueryThreadArgs = {
  threadId: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptCollabInvitation: Scalars['ID'];
  acceptFriendRequest: User;
  acceptMemberRequest: Scalars['ID'];
  addCollabDiscussionThreadCommentReaction: Scalars['Boolean'];
  addCollabDiscussionThreadReaction: Scalars['Boolean'];
  addCollabPostCommentReaction: Scalars['Boolean'];
  addCollabPostReaction: CollabPost;
  addCollabTaskCommentReaction: Scalars['Boolean'];
  cancelRequestToJoin: Scalars['Boolean'];
  connectToChat: ConnectToChatPayload;
  createCollabDiscussionThread: CollabDiscussionThread;
  createCollabDiscussionThreadComment: CollabDiscussionThreadComment;
  createCollabPost: CollabPost;
  createComment: CollabPostComment;
  createTask: Task;
  createTaskComment: TaskComment;
  createTaskList: TaskList;
  createWallMessage: WallMessage;
  declineCollabInvitation: Scalars['ID'];
  /** returns the id of the declined friend */
  declineFriendRequest: Scalars['ID'];
  declineMemberRequest: Scalars['ID'];
  deleteAllNotifications: Scalars['Boolean'];
  deleteCollab: Scalars['Boolean'];
  deleteCollabDiscussionThread: Scalars['Boolean'];
  deleteCollabDiscussionThreadComment: Scalars['Boolean'];
  deleteCollabPost: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  deleteNotification: Scalars['ID'];
  deletePrivateMessage: Scalars['ID'];
  deleteTask: Scalars['Boolean'];
  deleteTaskComment: Scalars['Boolean'];
  deleteTaskList: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  deleteWallMessage: Scalars['ID'];
  inviteMember: User;
  login: AuthPayload;
  markAllNotificationsAsRead: Scalars['Boolean'];
  markNotificationAsRead: Notification;
  markPrivateMessageAsRead: Scalars['Boolean'];
  moveTaskToList: Task;
  removeCollabDiscussionThreadCommentReaction: Scalars['Boolean'];
  removeCollabDiscussionThreadReaction: Scalars['Boolean'];
  removeCollabPostCommentReaction: Scalars['Boolean'];
  removeCollabPostReaction: CollabPost;
  removeCollabTaskCommentReaction: Scalars['Boolean'];
  /** returns the id of the removed friend */
  removeFriend: Scalars['ID'];
  removeMember: Collab;
  requestToJoin: Scalars['Boolean'];
  sendFriendRequest: Scalars['Boolean'];
  sendPrivateChatMessage: PrivateChatMessage;
  sendPrivateMessage: PrivateMessage;
  signUp: AuthPayload;
  toggleAcceptInvites: Collab;
  updateStatus: Scalars['Boolean'];
  updateTask: Task;
  updateTaskAssignee: Task;
  updateTaskListName: TaskList;
  updateTaskListPosition: TaskList;
  updateTaskPosition: Task;
  updateUserInfo: CurrentUser;
  uploadAvatar: CurrentUser;
};


export type MutationAcceptCollabInvitationArgs = {
  collabId: Scalars['ID'];
};


export type MutationAcceptFriendRequestArgs = {
  friendId: Scalars['ID'];
};


export type MutationAcceptMemberRequestArgs = {
  collabId: Scalars['ID'];
  memberId: Scalars['ID'];
};


export type MutationAddCollabDiscussionThreadCommentReactionArgs = {
  reaction: AddDiscussionThreadCommentReactionInput;
};


export type MutationAddCollabDiscussionThreadReactionArgs = {
  reaction: AddCollabDiscussionThreadReactionInput;
};


export type MutationAddCollabPostCommentReactionArgs = {
  reaction: AddCollabPostCommentReactionInput;
};


export type MutationAddCollabPostReactionArgs = {
  reaction: AddCollabPostReactionInput;
};


export type MutationAddCollabTaskCommentReactionArgs = {
  reaction: AddCollabTaskCommentReactionInput;
};


export type MutationCancelRequestToJoinArgs = {
  collabId: Scalars['ID'];
};


export type MutationConnectToChatArgs = {
  status: UserChatStatus;
};


export type MutationCreateCollabDiscussionThreadArgs = {
  thread: CreateThreadArgs;
};


export type MutationCreateCollabDiscussionThreadCommentArgs = {
  input: CreateCollabDiscussionThreadCommentInput;
};


export type MutationCreateCollabPostArgs = {
  post: CollabPostArgs;
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'];
  postId: Scalars['ID'];
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationCreateTaskCommentArgs = {
  input: CreateTaskCommentInput;
};


export type MutationCreateTaskListArgs = {
  input: CreateTaskListInput;
};


export type MutationCreateWallMessageArgs = {
  input: CreateWallMessageInput;
};


export type MutationDeclineCollabInvitationArgs = {
  collabId: Scalars['ID'];
};


export type MutationDeclineFriendRequestArgs = {
  senderId: Scalars['ID'];
};


export type MutationDeclineMemberRequestArgs = {
  collabId: Scalars['ID'];
  memberId: Scalars['ID'];
};


export type MutationDeleteCollabArgs = {
  collabId: Scalars['ID'];
};


export type MutationDeleteCollabDiscussionThreadArgs = {
  threadId: Scalars['ID'];
};


export type MutationDeleteCollabDiscussionThreadCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationDeleteCollabPostArgs = {
  postId: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['ID'];
};


export type MutationDeletePrivateMessageArgs = {
  messageId: Scalars['ID'];
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['ID'];
};


export type MutationDeleteTaskCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationDeleteTaskListArgs = {
  taskListId: Scalars['ID'];
};


export type MutationDeleteWallMessageArgs = {
  messageId: Scalars['ID'];
};


export type MutationInviteMemberArgs = {
  collabId: Scalars['ID'];
  memberId: Scalars['ID'];
};


export type MutationLoginArgs = {
  credentials: LoginArgs;
};


export type MutationMarkNotificationAsReadArgs = {
  notificationId: Scalars['ID'];
};


export type MutationMarkPrivateMessageAsReadArgs = {
  messageId: Scalars['ID'];
};


export type MutationMoveTaskToListArgs = {
  input: MoveTaskToListInput;
};


export type MutationRemoveCollabDiscussionThreadCommentReactionArgs = {
  reaction: RemoveDiscussionThreadCommentReactionInput;
};


export type MutationRemoveCollabDiscussionThreadReactionArgs = {
  reaction: RemoveCollabDiscussionThreadReactionInput;
};


export type MutationRemoveCollabPostCommentReactionArgs = {
  reaction: RemoveCollabPostCommentReactionInput;
};


export type MutationRemoveCollabPostReactionArgs = {
  reaction: RemoveCollabPostReactionInput;
};


export type MutationRemoveCollabTaskCommentReactionArgs = {
  reaction: RemoveCollabTaskCommentReactionInput;
};


export type MutationRemoveFriendArgs = {
  friendId: Scalars['ID'];
};


export type MutationRemoveMemberArgs = {
  collabId: Scalars['ID'];
  memberId: Scalars['ID'];
};


export type MutationRequestToJoinArgs = {
  collabId: Scalars['ID'];
};


export type MutationSendFriendRequestArgs = {
  friendId: Scalars['ID'];
};


export type MutationSendPrivateChatMessageArgs = {
  input: SendPrivateChatMessageInput;
};


export type MutationSendPrivateMessageArgs = {
  input: SendPrivateMessageInput;
};


export type MutationSignUpArgs = {
  credentials: SignUpArgs;
};


export type MutationToggleAcceptInvitesArgs = {
  collabId: Scalars['ID'];
};


export type MutationUpdateStatusArgs = {
  status: UserChatStatus;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};


export type MutationUpdateTaskAssigneeArgs = {
  input: UpdateTaskAssigneeInput;
};


export type MutationUpdateTaskListNameArgs = {
  input: UpdateTaskListNameInput;
};


export type MutationUpdateTaskListPositionArgs = {
  input: UpdateTaskListPositionInput;
};


export type MutationUpdateTaskPositionArgs = {
  input: UpdateTaskPositionInput;
};


export type MutationUpdateUserInfoArgs = {
  input: Maybe<UpdateUserInfoInput>;
};


export type MutationUploadAvatarArgs = {
  avatar: Scalars['Upload'];
};

export type Collab = {
  __typename?: 'Collab';
  acceptsInvites: Scalars['Boolean'];
  collabPostId: Maybe<Scalars['ID']>;
  discussionThreads: Array<CollabDiscussionThread>;
  id: Scalars['ID'];
  invitationPending: Scalars['Boolean'];
  isMember: Scalars['Boolean'];
  isOwner: Scalars['Boolean'];
  members: Array<User>;
  name: Scalars['String'];
  owner: User;
  pendingInvites: Array<Maybe<User>>;
  pendingRequests: Array<Maybe<User>>;
  requestToJoinPending: Scalars['Boolean'];
  taskList: Array<TaskList>;
};

export type CollabDiscussionThread = {
  __typename?: 'CollabDiscussionThread';
  author: Maybe<User>;
  collab: Maybe<Collab>;
  comments: Array<CollabDiscussionThreadComment>;
  commentsCount: Scalars['Int'];
  content: Scalars['String'];
  creationDate: Scalars['Date'];
  id: Scalars['ID'];
  reactions: Array<Reaction>;
  reactionsCount: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateThreadArgs = {
  collabId: Scalars['ID'];
  content: Scalars['String'];
  title: Scalars['String'];
};

export type CollabDiscussionThreadComment = {
  __typename?: 'CollabDiscussionThreadComment';
  author: User;
  collab: Maybe<Collab>;
  content: Scalars['String'];
  creationDate: Scalars['Date'];
  id: Scalars['ID'];
  isAuthor: Scalars['Boolean'];
  reactions: Array<Reaction>;
  thread: Maybe<CollabDiscussionThread>;
};

export type CreateCollabDiscussionThreadCommentInput = {
  collabId: Scalars['ID'];
  content: Scalars['String'];
  threadId: Scalars['ID'];
};

export type AddDiscussionThreadCommentReactionInput = {
  commentId: Scalars['ID'];
  emojiId: Scalars['ID'];
};

export type RemoveDiscussionThreadCommentReactionInput = {
  commentId: Scalars['ID'];
  emojiId: Scalars['ID'];
};

export type AddCollabDiscussionThreadReactionInput = {
  emojiId: Scalars['ID'];
  threadId: Scalars['ID'];
};

export type RemoveCollabDiscussionThreadReactionInput = {
  emojiId: Scalars['ID'];
  threadId: Scalars['ID'];
};

export type AdvancedPostsSearchInput = {
  experience: Maybe<Experience>;
  hasStarted: Maybe<Scalars['Boolean']>;
  isNew: Maybe<Scalars['Boolean']>;
  languages: Maybe<Array<Scalars['String']>>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  stack: Maybe<Array<Scalars['String']>>;
};

export type CollabPostsSearchResultsPayload = {
  __typename?: 'CollabPostsSearchResultsPayload';
  hasNextPage: Scalars['Boolean'];
  posts: Array<CollabPost>;
};

export type SearchPostsInput = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  title: Scalars['String'];
};

export type SearchPostsPayload = {
  __typename?: 'SearchPostsPayload';
  hasNextPage: Scalars['Boolean'];
  posts: Array<CollabPost>;
  totalResults: Scalars['Int'];
};

export type CollabPost = {
  __typename?: 'CollabPost';
  acceptsInvites: Scalars['Boolean'];
  collabId: Scalars['ID'];
  comments: Array<CollabPostComment>;
  commentsCount: Scalars['Int'];
  creationDate: Scalars['Date'];
  description: Scalars['String'];
  experience: Scalars['String'];
  hasStarted: Scalars['Boolean'];
  id: Scalars['ID'];
  invitationPending: Scalars['Boolean'];
  isMember: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  isOwner: Scalars['Boolean'];
  languages: Array<Scalars['String']>;
  members: Array<User>;
  membersCount: Scalars['Int'];
  name: Scalars['String'];
  owner: User;
  pendingInvites: Array<User>;
  pendingRequests: Array<User>;
  reactions: Array<Reaction>;
  reactionsCount: Scalars['Int'];
  requestToJoinPending: Scalars['Boolean'];
  stack: Array<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CollabPostsPayload = {
  __typename?: 'CollabPostsPayload';
  hasNextPage: Scalars['Boolean'];
  posts: Array<CollabPost>;
};

export type CollabPostArgs = {
  description: Scalars['String'];
  experience: Experience;
  hasStarted: Scalars['Boolean'];
  languages: Array<Scalars['String']>;
  name: Scalars['String'];
  stack: Array<Scalars['String']>;
  title: Scalars['String'];
};

export enum Experience {
  All = 'ALL',
  Junior = 'JUNIOR',
  JuniorMid = 'JUNIOR_MID',
  Mid = 'MID',
  MidSenior = 'MID_SENIOR',
  Senior = 'SENIOR'
}

export type CollabPostComment = {
  __typename?: 'CollabPostComment';
  author: User;
  content: Scalars['String'];
  creationDate: Scalars['Date'];
  id: Scalars['ID'];
  isAuthor: Scalars['Boolean'];
  reactions: Array<Reaction>;
};

export type AddCollabPostCommentReactionInput = {
  commentId: Scalars['ID'];
  emojiId: Scalars['ID'];
};

export type RemoveCollabPostCommentReactionInput = {
  commentId: Scalars['ID'];
  emojiId: Scalars['ID'];
};

export type AddCollabPostReactionInput = {
  emojiId: Scalars['ID'];
  postId: Scalars['ID'];
};

export type RemoveCollabPostReactionInput = {
  emojiId: Scalars['ID'];
  postId: Scalars['ID'];
};

export type AddCollabTaskCommentReactionInput = {
  commentId: Scalars['ID'];
  emojiId: Scalars['ID'];
};

export type RemoveCollabTaskCommentReactionInput = {
  commentId: Scalars['ID'];
  emojiId: Scalars['ID'];
};

export type WallMessage = {
  __typename?: 'WallMessage';
  author: User;
  content: Scalars['String'];
  creationDate: Scalars['Date'];
  id: Scalars['ID'];
  isAuthor: Scalars['Boolean'];
};

export type CreateWallMessageInput = {
  collabId: Scalars['ID'];
  content: Scalars['String'];
};

export type CollabWallMessagesPayload = {
  __typename?: 'CollabWallMessagesPayload';
  hasNextPage: Scalars['Boolean'];
  messages: Array<WallMessage>;
};

export type CollabWallMessagesInput = {
  collabId: Scalars['ID'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  friendStatusChange: ChatUsersPayload;
  newFriendRequest: NewFriendRequestPayload;
  newNotification: Notification;
  newPrivateChatMessage: PrivateChatMessage;
};

export type Notification = {
  __typename?: 'Notification';
  creationDate: Scalars['Date'];
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  message: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export enum UserChatStatus {
  Away = 'AWAY',
  Dnd = 'DND',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type ConnectToChatPayload = {
  __typename?: 'ConnectToChatPayload';
  users: Array<ChatUsersPayload>;
};

export type ChatUsersPayload = {
  __typename?: 'ChatUsersPayload';
  status: UserChatStatus;
  user: User;
};

export type PrivateChatMessage = {
  __typename?: 'PrivateChatMessage';
  authorId: Scalars['ID'];
  content: Scalars['String'];
  creationDate: Scalars['Date'];
  id: Scalars['ID'];
};

export type SendPrivateChatMessageInput = {
  content: Scalars['String'];
  recipientId: Scalars['ID'];
};

export type PrivateMessage = {
  __typename?: 'PrivateMessage';
  author: Maybe<User>;
  content: Scalars['String'];
  creationDate: Scalars['Date'];
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  recipient: Maybe<User>;
};

export type PrivateMessagePreview = {
  __typename?: 'PrivateMessagePreview';
  avatar: Scalars['String'];
  content: Scalars['String'];
  userId: Scalars['ID'];
  username: Scalars['String'];
};

export type GetConversationPayload = {
  __typename?: 'GetConversationPayload';
  hasNextPage: Scalars['Boolean'];
  messages: Array<PrivateMessage>;
};

export type SendPrivateMessageInput = {
  content: Scalars['String'];
  recipientId: Scalars['ID'];
};

export type Reaction = {
  __typename?: 'Reaction';
  count: Scalars['Int'];
  emojiId: Scalars['ID'];
  isLiked: Scalars['Boolean'];
};


export type Task = {
  __typename?: 'Task';
  assignedBy: Maybe<User>;
  assignee: Maybe<User>;
  author: User;
  authorId: Scalars['ID'];
  collab: Collab;
  comments: Array<TaskComment>;
  commentsCount: Scalars['Int'];
  description: Scalars['ID'];
  id: Scalars['ID'];
  order: Scalars['Int'];
  taskListId: Scalars['ID'];
};

export type UpdateTaskInput = {
  assigneeId: Maybe<Scalars['ID']>;
  description: Scalars['String'];
  taskId: Scalars['ID'];
};

export type CreateTaskInput = {
  assigneeId: Maybe<Scalars['ID']>;
  collabId: Scalars['ID'];
  description: Scalars['String'];
  taskListId: Scalars['ID'];
};

export type UpdateTaskAssigneeInput = {
  assigneeId: Scalars['ID'];
  taskId: Scalars['ID'];
};

export type UpdateTaskPositionInput = {
  newTaskPosition: Scalars['Int'];
  oldTaskPosition: Scalars['Int'];
  taskListId: Scalars['ID'];
};

export type MoveTaskToListInput = {
  newTaskListId: Scalars['ID'];
  newTaskPosition: Scalars['Int'];
  oldTaskListId: Scalars['ID'];
  oldTaskPosition: Scalars['Int'];
};

export type TaskComment = {
  __typename?: 'TaskComment';
  author: Maybe<User>;
  content: Scalars['String'];
  id: Scalars['ID'];
  reactions: Array<Reaction>;
  task: Maybe<Task>;
};

export type CreateTaskCommentInput = {
  collabId: Scalars['ID'];
  content: Scalars['String'];
  taskId: Scalars['ID'];
};

export type CreateTaskListInput = {
  collabId: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateTaskListNameInput = {
  name: Scalars['String'];
  taskListId: Scalars['ID'];
};

export type UpdateTaskListPositionInput = {
  collabId: Scalars['ID'];
  newTaskListPosition: Scalars['Int'];
  oldTaskListPosition: Scalars['Int'];
};

export type TaskListPayload = {
  __typename?: 'TaskListPayload';
  taskList: Array<TaskList>;
};

export type TaskList = {
  __typename?: 'TaskList';
  collab: Collab;
  id: Scalars['ID'];
  name: Scalars['String'];
  order: Scalars['Int'];
  tasks: Array<Task>;
};


export type NewFriendRequestPayload = {
  __typename?: 'NewFriendRequestPayload';
  user: User;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  avatar: Maybe<Scalars['String']>;
  bio: Scalars['String'];
  collabInvites: Array<Collab>;
  collabRequests: Array<CollabRequest>;
  collabs: Array<Collab>;
  conversationsPreview: Array<PrivateMessagePreview>;
  country: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  friendRequests: Array<User>;
  friendRequestsCount: Scalars['Int'];
  friends: Array<User>;
  github: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  linkedin: Scalars['String'];
  notifications: Array<Notification>;
  notificationsCount: Scalars['Int'];
  tasks: Array<Task>;
  /** the user's engineering title */
  title: Scalars['String'];
  twitter: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar: Maybe<Scalars['String']>;
  bio: Scalars['String'];
  canRequestFriendship: Scalars['Boolean'];
  collabs: Array<Collab>;
  country: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  isFriend: Scalars['Boolean'];
  isSelf: Scalars['Boolean'];
  lastName: Scalars['String'];
  /** the user's engineering title */
  title: Scalars['String'];
  username: Scalars['String'];
};

export type SearchUsersInput = {
  username: Scalars['String'];
};

export type UpdateUserInfoInput = {
  bio: Scalars['String'];
  country: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  github: Scalars['String'];
  lastName: Scalars['String'];
  linkedin: Scalars['String'];
  title: Scalars['String'];
  twitter: Scalars['String'];
};

export type CollabRequest = {
  __typename?: 'CollabRequest';
  collab: Collab;
  id: Scalars['ID'];
  member: User;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
};

export type SignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpMutationVariables = {
  credentials: SignUpArgs;
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  ) }
);

export type LoginMutationVariables = {
  credentials: LoginArgs;
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  ) }
);

export type UpdateUserInfoMutationVariables = {
  input: UpdateUserInfoInput;
};


export type UpdateUserInfoMutation = (
  { __typename?: 'Mutation' }
  & { updateUserInfo: (
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'firstName' | 'lastName' | 'title' | 'country' | 'bio'>
  ) }
);

export type MarkNotificationAsReadMutationVariables = {
  notificationId: Scalars['ID'];
};


export type MarkNotificationAsReadMutation = (
  { __typename?: 'Mutation' }
  & { markNotificationAsRead: (
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'isRead'>
  ) }
);

export type MarkAllNotificationsAsReadMutationVariables = {};


export type MarkAllNotificationsAsReadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'markAllNotificationsAsRead'>
);

export type DeleteNotificationMutationVariables = {
  notificationId: Scalars['ID'];
};


export type DeleteNotificationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteNotification'>
);

export type DeleteAllNotificationsMutationVariables = {};


export type DeleteAllNotificationsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAllNotifications'>
);

export type AcceptFriendRequestMutationVariables = {
  friendId: Scalars['ID'];
};


export type AcceptFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & { acceptFriendRequest: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  ) }
);

export type SendPrivateMessageMutationVariables = {
  input: SendPrivateMessageInput;
};


export type SendPrivateMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendPrivateMessage: (
    { __typename?: 'PrivateMessage' }
    & Pick<PrivateMessage, 'id' | 'content' | 'creationDate' | 'isRead'>
    & { author: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>, recipient: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )> }
  ) }
);

export type DeletePrivateMessageMutationVariables = {
  messageId: Scalars['ID'];
};


export type DeletePrivateMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePrivateMessage'>
);

export type DeclineFriendRequestMutationVariables = {
  senderId: Scalars['ID'];
};


export type DeclineFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'declineFriendRequest'>
);

export type SendFriendRequestMutationVariables = {
  friendId: Scalars['ID'];
};


export type SendFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendFriendRequest'>
);

export type CreateCollabPostMutationVariables = {
  post: CollabPostArgs;
};


export type CreateCollabPostMutation = (
  { __typename?: 'Mutation' }
  & { createCollabPost: (
    { __typename?: 'CollabPost' }
    & Pick<CollabPost, 'id'>
  ) }
);

export type AddCollabPostCommentMutationVariables = {
  content: Scalars['String'];
  postId: Scalars['ID'];
};


export type AddCollabPostCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'CollabPostComment' }
    & Pick<CollabPostComment, 'id' | 'content'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ) }
  ) }
);

export type AddCollabPostReactionMutationVariables = {
  reaction: AddCollabPostReactionInput;
};


export type AddCollabPostReactionMutation = (
  { __typename?: 'Mutation' }
  & { addCollabPostReaction: (
    { __typename?: 'CollabPost' }
    & Pick<CollabPost, 'id'>
    & { reactions: Array<(
      { __typename?: 'Reaction' }
      & Pick<Reaction, 'emojiId' | 'count' | 'isLiked'>
    )> }
  ) }
);

export type RemoveCollabPostReactionMutationVariables = {
  reaction: RemoveCollabPostReactionInput;
};


export type RemoveCollabPostReactionMutation = (
  { __typename?: 'Mutation' }
  & { removeCollabPostReaction: (
    { __typename?: 'CollabPost' }
    & Pick<CollabPost, 'id'>
    & { reactions: Array<(
      { __typename?: 'Reaction' }
      & Pick<Reaction, 'emojiId' | 'count' | 'isLiked'>
    )> }
  ) }
);

export type AddCollabPostCommentReactionMutationVariables = {
  reaction: AddCollabPostCommentReactionInput;
};


export type AddCollabPostCommentReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCollabPostCommentReaction'>
);

export type RemoveCollabPostCommentReactionMutationVariables = {
  reaction: RemoveCollabPostCommentReactionInput;
};


export type RemoveCollabPostCommentReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCollabPostCommentReaction'>
);

export type AddCollabDiscussionThreadReactionMutationVariables = {
  reaction: AddCollabDiscussionThreadReactionInput;
};


export type AddCollabDiscussionThreadReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCollabDiscussionThreadReaction'>
);

export type RemoveCollabDiscussionThreadReactionMutationVariables = {
  reaction: RemoveCollabDiscussionThreadReactionInput;
};


export type RemoveCollabDiscussionThreadReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCollabDiscussionThreadReaction'>
);

export type AddDiscussionThreadCommentReactionMutationVariables = {
  reaction: AddDiscussionThreadCommentReactionInput;
};


export type AddDiscussionThreadCommentReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCollabDiscussionThreadCommentReaction'>
);

export type RemoveDiscussionThreadCommentReactionMutationVariables = {
  reaction: RemoveDiscussionThreadCommentReactionInput;
};


export type RemoveDiscussionThreadCommentReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCollabDiscussionThreadCommentReaction'>
);

export type InviteMemberMutationVariables = {
  collabId: Scalars['ID'];
  memberId: Scalars['ID'];
};


export type InviteMemberMutation = (
  { __typename?: 'Mutation' }
  & { inviteMember: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  ) }
);

export type RequestToJoinMutationVariables = {
  collabId: Scalars['ID'];
};


export type RequestToJoinMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'requestToJoin'>
);

export type CancelCollabRequestToJoinMutationVariables = {
  collabId: Scalars['ID'];
};


export type CancelCollabRequestToJoinMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancelRequestToJoin'>
);

export type AcceptCollabInvitationMutationVariables = {
  collabId: Scalars['ID'];
};


export type AcceptCollabInvitationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptCollabInvitation'>
);

export type DeclineCollabInvitationMutationVariables = {
  collabId: Scalars['ID'];
};


export type DeclineCollabInvitationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'declineCollabInvitation'>
);

export type AcceptMemberRequestMutationVariables = {
  collabId: Scalars['ID'];
  memberId: Scalars['ID'];
};


export type AcceptMemberRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptMemberRequest'>
);

export type DeclineMemberRequestMutationVariables = {
  collabId: Scalars['ID'];
  memberId: Scalars['ID'];
};


export type DeclineMemberRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'declineMemberRequest'>
);

export type RemoveMemberMutationVariables = {
  collabId: Scalars['ID'];
  memberId: Scalars['ID'];
};


export type RemoveMemberMutation = (
  { __typename?: 'Mutation' }
  & { removeMember: (
    { __typename?: 'Collab' }
    & Pick<Collab, 'id'>
    & { members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )> }
  ) }
);

export type CreateWallMessageMutationVariables = {
  input: CreateWallMessageInput;
};


export type CreateWallMessageMutation = (
  { __typename?: 'Mutation' }
  & { createWallMessage: (
    { __typename?: 'WallMessage' }
    & Pick<WallMessage, 'id' | 'content' | 'creationDate' | 'isAuthor'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ) }
  ) }
);

export type DeleteWallMessageMutationVariables = {
  messageId: Scalars['ID'];
};


export type DeleteWallMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteWallMessage'>
);

export type CreateTaskListMutationVariables = {
  input: CreateTaskListInput;
};


export type CreateTaskListMutation = (
  { __typename?: 'Mutation' }
  & { createTaskList: (
    { __typename?: 'TaskList' }
    & Pick<TaskList, 'id' | 'name' | 'order'>
  ) }
);

export type UpdateTaskListNameMutationVariables = {
  input: UpdateTaskListNameInput;
};


export type UpdateTaskListNameMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskListName: (
    { __typename?: 'TaskList' }
    & Pick<TaskList, 'id' | 'name'>
  ) }
);

export type UpdateTaskListPositionMutationVariables = {
  input: UpdateTaskListPositionInput;
};


export type UpdateTaskListPositionMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskListPosition: (
    { __typename?: 'TaskList' }
    & Pick<TaskList, 'id'>
  ) }
);

export type DeleteTaskListMutationVariables = {
  taskListId: Scalars['ID'];
};


export type DeleteTaskListMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTaskList'>
);

export type CreateTaskMutationVariables = {
  input: CreateTaskInput;
};


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'description' | 'order' | 'taskListId' | 'commentsCount'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ), assignee: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>, assignedBy: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )> }
  ) }
);

export type DeleteTaskMutationVariables = {
  taskId: Scalars['ID'];
};


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTask'>
);

export type UpdateTaskMutationVariables = {
  input: UpdateTaskInput;
};


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'description'>
    & { assignee: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>, assignedBy: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )> }
  ) }
);

export type MoveTaskToListMutationVariables = {
  input: MoveTaskToListInput;
};


export type MoveTaskToListMutation = (
  { __typename?: 'Mutation' }
  & { moveTaskToList: (
    { __typename?: 'Task' }
    & Pick<Task, 'id'>
  ) }
);

export type UpdateTaskPositionMutationVariables = {
  input: UpdateTaskPositionInput;
};


export type UpdateTaskPositionMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskPosition: (
    { __typename?: 'Task' }
    & Pick<Task, 'id'>
  ) }
);

export type UpdateTaskAssigneeMutationVariables = {
  input: UpdateTaskAssigneeInput;
};


export type UpdateTaskAssigneeMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskAssignee: (
    { __typename?: 'Task' }
    & Pick<Task, 'id'>
    & { assignee: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>, assignedBy: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )> }
  ) }
);

export type CreateTaskCommentMutationVariables = {
  input: CreateTaskCommentInput;
};


export type CreateTaskCommentMutation = (
  { __typename?: 'Mutation' }
  & { createTaskComment: (
    { __typename?: 'TaskComment' }
    & Pick<TaskComment, 'id' | 'content'>
    & { author: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>, reactions: Array<(
      { __typename?: 'Reaction' }
      & Pick<Reaction, 'emojiId' | 'count'>
    )> }
  ) }
);

export type AddTaskCommentReactionMutationVariables = {
  reaction: AddCollabTaskCommentReactionInput;
};


export type AddTaskCommentReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCollabTaskCommentReaction'>
);

export type RemoveTaskCommentReactionMutationVariables = {
  reaction: RemoveCollabTaskCommentReactionInput;
};


export type RemoveTaskCommentReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCollabTaskCommentReaction'>
);

export type CreateDiscussionThreadCommentMutationVariables = {
  input: CreateCollabDiscussionThreadCommentInput;
};


export type CreateDiscussionThreadCommentMutation = (
  { __typename?: 'Mutation' }
  & { createCollabDiscussionThreadComment: (
    { __typename?: 'CollabDiscussionThreadComment' }
    & Pick<CollabDiscussionThreadComment, 'id' | 'content'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ), reactions: Array<(
      { __typename?: 'Reaction' }
      & Pick<Reaction, 'emojiId' | 'count' | 'isLiked'>
    )> }
  ) }
);

export type ConnectToChatMutationVariables = {
  status: UserChatStatus;
};


export type ConnectToChatMutation = (
  { __typename?: 'Mutation' }
  & { connectToChat: (
    { __typename?: 'ConnectToChatPayload' }
    & { users: Array<(
      { __typename?: 'ChatUsersPayload' }
      & Pick<ChatUsersPayload, 'status'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  ) }
);

export type SendPrivateChatMessageMutationVariables = {
  input: SendPrivateChatMessageInput;
};


export type SendPrivateChatMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendPrivateChatMessage: (
    { __typename?: 'PrivateChatMessage' }
    & Pick<PrivateChatMessage, 'id' | 'authorId' | 'content' | 'creationDate'>
  ) }
);

export type UpdateStatusMutationVariables = {
  status: UserChatStatus;
};


export type UpdateStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateStatus'>
);

export type FriendStatusChangeSubscriptionVariables = {};


export type FriendStatusChangeSubscription = (
  { __typename?: 'Subscription' }
  & { friendStatusChange: (
    { __typename?: 'ChatUsersPayload' }
    & Pick<ChatUsersPayload, 'status'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ) }
  ) }
);

export type NewPrivateChatMessageSubscriptionVariables = {};


export type NewPrivateChatMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newPrivateChatMessage: (
    { __typename?: 'PrivateChatMessage' }
    & Pick<PrivateChatMessage, 'id' | 'authorId' | 'content' | 'creationDate'>
  ) }
);

export type GetCurrentUserQueryVariables = {};


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'username' | 'avatar' | 'friendRequestsCount' | 'notificationsCount'>
  )> }
);

export type CurrentUserFriendsQueryVariables = {};


export type CurrentUserFriendsQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { friends: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar' | 'bio' | 'title' | 'country' | 'isSelf' | 'isFriend' | 'canRequestFriendship'>
    )> }
  )> }
);

export type CurrentUserNotificationsQueryVariables = {};


export type CurrentUserNotificationsQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { notifications: Array<(
      { __typename?: 'Notification' }
      & Pick<Notification, 'id' | 'type' | 'message' | 'title' | 'url' | 'isRead' | 'creationDate'>
    )> }
  )> }
);

export type CurrentUserFriendRequestsQueryVariables = {};


export type CurrentUserFriendRequestsQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { friendRequests: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )> }
  )> }
);

export type SearchFriendsQueryVariables = {
  input: SearchUsersInput;
};


export type SearchFriendsQuery = (
  { __typename?: 'Query' }
  & { searchFriends: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  )> }
);

export type SearchUsersQueryVariables = {
  input: SearchUsersInput;
};


export type SearchUsersQuery = (
  { __typename?: 'Query' }
  & { searchUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  )> }
);

export type GetCurrentUserInfoQueryVariables = {};


export type GetCurrentUserInfoQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'firstName' | 'lastName' | 'title' | 'country' | 'bio' | 'github' | 'twitter' | 'linkedin'>
  )> }
);

export type CurrentUserConversationsPreviewQueryVariables = {};


export type CurrentUserConversationsPreviewQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { conversationsPreview: Array<(
      { __typename?: 'PrivateMessagePreview' }
      & Pick<PrivateMessagePreview, 'userId' | 'username' | 'avatar' | 'content'>
    )> }
  )> }
);

export type CurrentUserConversationQueryVariables = {
  userId: Scalars['ID'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type CurrentUserConversationQuery = (
  { __typename?: 'Query' }
  & { getConversation: (
    { __typename?: 'GetConversationPayload' }
    & Pick<GetConversationPayload, 'hasNextPage'>
    & { messages: Array<(
      { __typename?: 'PrivateMessage' }
      & Pick<PrivateMessage, 'id' | 'content' | 'creationDate' | 'isRead'>
      & { author: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      )>, recipient: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      )> }
    )> }
  ) }
);

export type GetCurrentUserCollabsQueryVariables = {};


export type GetCurrentUserCollabsQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { collabs: Array<(
      { __typename?: 'Collab' }
      & Pick<Collab, 'id' | 'name'>
    )> }
  )> }
);

export type GetCurrentUserCollabInvitationsQueryVariables = {};


export type GetCurrentUserCollabInvitationsQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { collabInvites: Array<(
      { __typename?: 'Collab' }
      & Pick<Collab, 'id' | 'name'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  )> }
);

export type GetCurrentUserCollabRequestsQueryVariables = {};


export type GetCurrentUserCollabRequestsQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { collabRequests: Array<(
      { __typename?: 'CollabRequest' }
      & Pick<CollabRequest, 'id'>
      & { collab: (
        { __typename?: 'Collab' }
        & Pick<Collab, 'id' | 'name'>
      ), member: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  )> }
);

export type GetCurrentUserTasksQueryVariables = {};


export type GetCurrentUserTasksQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'description'>
      & { assignedBy: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      )>, collab: (
        { __typename?: 'Collab' }
        & Pick<Collab, 'id' | 'name'>
      ) }
    )> }
  )> }
);

export type UserQueryVariables = {
  id: Scalars['ID'];
};


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar' | 'bio' | 'title' | 'country' | 'isSelf' | 'isFriend' | 'canRequestFriendship'>
  )> }
);

export type CollabPostsQueryVariables = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type CollabPostsQuery = (
  { __typename?: 'Query' }
  & { collabPosts: (
    { __typename?: 'CollabPostsPayload' }
    & Pick<CollabPostsPayload, 'hasNextPage'>
    & { posts: Array<(
      { __typename?: 'CollabPost' }
      & Pick<CollabPost, 'id' | 'title' | 'stack' | 'experience' | 'hasStarted' | 'languages' | 'creationDate' | 'isNew' | 'membersCount' | 'reactionsCount' | 'commentsCount'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  ) }
);

export type CollabPostsByStackQueryVariables = {
  stack: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type CollabPostsByStackQuery = (
  { __typename?: 'Query' }
  & { collabPostsByStack: (
    { __typename?: 'CollabPostsSearchResultsPayload' }
    & Pick<CollabPostsSearchResultsPayload, 'hasNextPage'>
    & { posts: Array<(
      { __typename?: 'CollabPost' }
      & Pick<CollabPost, 'id' | 'title' | 'stack' | 'experience' | 'hasStarted' | 'languages' | 'creationDate' | 'isNew' | 'membersCount' | 'reactionsCount' | 'commentsCount'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  ) }
);

export type AdvancedPostsSearchQueryVariables = {
  input: AdvancedPostsSearchInput;
};


export type AdvancedPostsSearchQuery = (
  { __typename?: 'Query' }
  & { advancedPostsSearch: (
    { __typename?: 'CollabPostsSearchResultsPayload' }
    & Pick<CollabPostsSearchResultsPayload, 'hasNextPage'>
    & { posts: Array<(
      { __typename?: 'CollabPost' }
      & Pick<CollabPost, 'id' | 'title' | 'stack' | 'experience' | 'hasStarted' | 'languages' | 'creationDate' | 'isNew' | 'membersCount' | 'reactionsCount' | 'commentsCount'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  ) }
);

export type SearchPostsByTitleQueryVariables = {
  input: SearchPostsInput;
};


export type SearchPostsByTitleQuery = (
  { __typename?: 'Query' }
  & { searchPostsByTitle: (
    { __typename?: 'CollabPostsSearchResultsPayload' }
    & Pick<CollabPostsSearchResultsPayload, 'hasNextPage'>
    & { posts: Array<(
      { __typename?: 'CollabPost' }
      & Pick<CollabPost, 'id' | 'title' | 'reactionsCount' | 'commentsCount'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  ) }
);

export type GetCollabPostQueryVariables = {
  postId: Scalars['ID'];
};


export type GetCollabPostQuery = (
  { __typename?: 'Query' }
  & { collabPost: Maybe<(
    { __typename?: 'CollabPost' }
    & Pick<CollabPost, 'id' | 'name' | 'title' | 'description' | 'isNew' | 'collabId' | 'experience' | 'stack' | 'hasStarted' | 'languages' | 'acceptsInvites' | 'isOwner' | 'isMember' | 'invitationPending' | 'requestToJoinPending' | 'creationDate'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ), members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>, reactions: Array<(
      { __typename?: 'Reaction' }
      & Pick<Reaction, 'emojiId' | 'count' | 'isLiked'>
    )> }
  )> }
);

export type CollabPostLanguagesQueryVariables = {};


export type CollabPostLanguagesQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'languages'>
);

export type CollabPostCommentsQueryVariables = {
  postId: Scalars['ID'];
};


export type CollabPostCommentsQuery = (
  { __typename?: 'Query' }
  & { collabPost: Maybe<(
    { __typename?: 'CollabPost' }
    & Pick<CollabPost, 'id'>
    & { comments: Array<(
      { __typename?: 'CollabPostComment' }
      & Pick<CollabPostComment, 'id' | 'content' | 'isAuthor' | 'creationDate'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ), reactions: Array<(
        { __typename?: 'Reaction' }
        & Pick<Reaction, 'emojiId' | 'count' | 'isLiked'>
      )> }
    )> }
  )> }
);

export type CollabQueryVariables = {
  collabId: Scalars['ID'];
};


export type CollabQuery = (
  { __typename?: 'Query' }
  & { collab: Maybe<(
    { __typename?: 'Collab' }
    & Pick<Collab, 'id' | 'name' | 'collabPostId' | 'acceptsInvites' | 'isOwner'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ), pendingInvites: Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>>, pendingRequests: Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>> }
  )> }
);

export type CollabMembersQueryVariables = {
  collabId: Scalars['ID'];
};


export type CollabMembersQuery = (
  { __typename?: 'Query' }
  & { collab: Maybe<(
    { __typename?: 'Collab' }
    & Pick<Collab, 'id'>
    & { members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'bio' | 'avatar' | 'title' | 'country' | 'isSelf' | 'canRequestFriendship' | 'isFriend'>
    )> }
  )> }
);

export type CollabWallMessagesQueryVariables = {
  input: CollabWallMessagesInput;
};


export type CollabWallMessagesQuery = (
  { __typename?: 'Query' }
  & { collabWallMessages: (
    { __typename?: 'CollabWallMessagesPayload' }
    & Pick<CollabWallMessagesPayload, 'hasNextPage'>
    & { messages: Array<(
      { __typename?: 'WallMessage' }
      & Pick<WallMessage, 'id' | 'content' | 'creationDate' | 'isAuthor'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  ) }
);

export type CollabDiscussionThreadsQueryVariables = {
  collabId: Scalars['ID'];
};


export type CollabDiscussionThreadsQuery = (
  { __typename?: 'Query' }
  & { collab: Maybe<(
    { __typename?: 'Collab' }
    & Pick<Collab, 'id'>
    & { discussionThreads: Array<(
      { __typename?: 'CollabDiscussionThread' }
      & Pick<CollabDiscussionThread, 'id' | 'title' | 'creationDate' | 'commentsCount' | 'reactionsCount'>
      & { author: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      )> }
    )> }
  )> }
);

export type CollabThreadQueryVariables = {
  threadId: Scalars['ID'];
};


export type CollabThreadQuery = (
  { __typename?: 'Query' }
  & { thread: Maybe<(
    { __typename?: 'CollabDiscussionThread' }
    & Pick<CollabDiscussionThread, 'id' | 'title' | 'content' | 'creationDate'>
    & { author: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>, reactions: Array<(
      { __typename?: 'Reaction' }
      & Pick<Reaction, 'emojiId' | 'count' | 'isLiked'>
    )> }
  )> }
);

export type CollabThreadCommentsQueryVariables = {
  threadId: Scalars['ID'];
};


export type CollabThreadCommentsQuery = (
  { __typename?: 'Query' }
  & { thread: Maybe<(
    { __typename?: 'CollabDiscussionThread' }
    & Pick<CollabDiscussionThread, 'id'>
    & { comments: Array<(
      { __typename?: 'CollabDiscussionThreadComment' }
      & Pick<CollabDiscussionThreadComment, 'id' | 'content' | 'creationDate' | 'isAuthor'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ), reactions: Array<(
        { __typename?: 'Reaction' }
        & Pick<Reaction, 'emojiId' | 'count' | 'isLiked'>
      )> }
    )> }
  )> }
);

export type TaskListQueryVariables = {
  collabId: Scalars['ID'];
};


export type TaskListQuery = (
  { __typename?: 'Query' }
  & { taskList: (
    { __typename?: 'TaskListPayload' }
    & { taskList: Array<(
      { __typename?: 'TaskList' }
      & Pick<TaskList, 'id' | 'name' | 'order'>
      & { tasks: Array<(
        { __typename?: 'Task' }
        & Pick<Task, 'id' | 'description' | 'order' | 'commentsCount' | 'taskListId'>
        & { assignee: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'username' | 'avatar'>
        )>, assignedBy: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'username' | 'avatar'>
        )>, author: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'username' | 'avatar'>
        ) }
      )> }
    )> }
  ) }
);

export type TaskCommentsQueryVariables = {
  taskId: Scalars['ID'];
};


export type TaskCommentsQuery = (
  { __typename?: 'Query' }
  & { task: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, 'id'>
    & { comments: Array<(
      { __typename?: 'TaskComment' }
      & Pick<TaskComment, 'id' | 'content'>
      & { author: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      )>, reactions: Array<(
        { __typename?: 'Reaction' }
        & Pick<Reaction, 'emojiId' | 'count' | 'isLiked'>
      )> }
    )> }
  )> }
);

export type NewNotificationSubscriptionVariables = {};


export type NewNotificationSubscription = (
  { __typename?: 'Subscription' }
  & { newNotification: (
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'message' | 'title' | 'type' | 'isRead' | 'url' | 'creationDate'>
  ) }
);

export type NewFriendRequestSubscriptionVariables = {};


export type NewFriendRequestSubscription = (
  { __typename?: 'Subscription' }
  & { newFriendRequest: (
    { __typename?: 'NewFriendRequestPayload' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ) }
  ) }
);


export const SignUpDocument = gql`
    mutation SignUp($credentials: SignUpArgs!) {
  signUp(credentials: $credentials) {
    token
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const LoginDocument = gql`
    mutation Login($credentials: LoginArgs!) {
  login(credentials: $credentials) {
    token
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const UpdateUserInfoDocument = gql`
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
    `;
export type UpdateUserInfoMutationFn = ApolloReactCommon.MutationFunction<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;

/**
 * __useUpdateUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInfoMutation, { data, loading, error }] = useUpdateUserInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserInfoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>(UpdateUserInfoDocument, baseOptions);
      }
export type UpdateUserInfoMutationHookResult = ReturnType<typeof useUpdateUserInfoMutation>;
export type UpdateUserInfoMutationResult = ApolloReactCommon.MutationResult<UpdateUserInfoMutation>;
export type UpdateUserInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($notificationId: ID!) {
  markNotificationAsRead(notificationId: $notificationId) {
    id
    isRead
  }
}
    `;
export type MarkNotificationAsReadMutationFn = ApolloReactCommon.MutationFunction<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;

/**
 * __useMarkNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationAsReadMutation, { data, loading, error }] = useMarkNotificationAsReadMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useMarkNotificationAsReadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        return ApolloReactHooks.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, baseOptions);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = ApolloReactCommon.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const MarkAllNotificationsAsReadDocument = gql`
    mutation MarkAllNotificationsAsRead {
  markAllNotificationsAsRead
}
    `;
export type MarkAllNotificationsAsReadMutationFn = ApolloReactCommon.MutationFunction<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;

/**
 * __useMarkAllNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAllNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllNotificationsAsReadMutation, { data, loading, error }] = useMarkAllNotificationsAsReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkAllNotificationsAsReadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>) {
        return ApolloReactHooks.useMutation<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>(MarkAllNotificationsAsReadDocument, baseOptions);
      }
export type MarkAllNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationResult = ApolloReactCommon.MutationResult<MarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($notificationId: ID!) {
  deleteNotification(notificationId: $notificationId)
}
    `;
export type DeleteNotificationMutationFn = ApolloReactCommon.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useDeleteNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, baseOptions);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = ApolloReactCommon.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const DeleteAllNotificationsDocument = gql`
    mutation DeleteAllNotifications {
  deleteAllNotifications
}
    `;
export type DeleteAllNotificationsMutationFn = ApolloReactCommon.MutationFunction<DeleteAllNotificationsMutation, DeleteAllNotificationsMutationVariables>;

/**
 * __useDeleteAllNotificationsMutation__
 *
 * To run a mutation, you first call `useDeleteAllNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAllNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAllNotificationsMutation, { data, loading, error }] = useDeleteAllNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAllNotificationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAllNotificationsMutation, DeleteAllNotificationsMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteAllNotificationsMutation, DeleteAllNotificationsMutationVariables>(DeleteAllNotificationsDocument, baseOptions);
      }
export type DeleteAllNotificationsMutationHookResult = ReturnType<typeof useDeleteAllNotificationsMutation>;
export type DeleteAllNotificationsMutationResult = ApolloReactCommon.MutationResult<DeleteAllNotificationsMutation>;
export type DeleteAllNotificationsMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteAllNotificationsMutation, DeleteAllNotificationsMutationVariables>;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($friendId: ID!) {
  acceptFriendRequest(friendId: $friendId) {
    id
    username
    avatar
  }
}
    `;
export type AcceptFriendRequestMutationFn = ApolloReactCommon.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, baseOptions);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = ApolloReactCommon.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const SendPrivateMessageDocument = gql`
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
    `;
export type SendPrivateMessageMutationFn = ApolloReactCommon.MutationFunction<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>;

/**
 * __useSendPrivateMessageMutation__
 *
 * To run a mutation, you first call `useSendPrivateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPrivateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPrivateMessageMutation, { data, loading, error }] = useSendPrivateMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendPrivateMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>(SendPrivateMessageDocument, baseOptions);
      }
export type SendPrivateMessageMutationHookResult = ReturnType<typeof useSendPrivateMessageMutation>;
export type SendPrivateMessageMutationResult = ApolloReactCommon.MutationResult<SendPrivateMessageMutation>;
export type SendPrivateMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>;
export const DeletePrivateMessageDocument = gql`
    mutation DeletePrivateMessage($messageId: ID!) {
  deletePrivateMessage(messageId: $messageId)
}
    `;
export type DeletePrivateMessageMutationFn = ApolloReactCommon.MutationFunction<DeletePrivateMessageMutation, DeletePrivateMessageMutationVariables>;

/**
 * __useDeletePrivateMessageMutation__
 *
 * To run a mutation, you first call `useDeletePrivateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePrivateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePrivateMessageMutation, { data, loading, error }] = useDeletePrivateMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeletePrivateMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePrivateMessageMutation, DeletePrivateMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePrivateMessageMutation, DeletePrivateMessageMutationVariables>(DeletePrivateMessageDocument, baseOptions);
      }
export type DeletePrivateMessageMutationHookResult = ReturnType<typeof useDeletePrivateMessageMutation>;
export type DeletePrivateMessageMutationResult = ApolloReactCommon.MutationResult<DeletePrivateMessageMutation>;
export type DeletePrivateMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePrivateMessageMutation, DeletePrivateMessageMutationVariables>;
export const DeclineFriendRequestDocument = gql`
    mutation DeclineFriendRequest($senderId: ID!) {
  declineFriendRequest(senderId: $senderId)
}
    `;
export type DeclineFriendRequestMutationFn = ApolloReactCommon.MutationFunction<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;

/**
 * __useDeclineFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeclineFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineFriendRequestMutation, { data, loading, error }] = useDeclineFriendRequestMutation({
 *   variables: {
 *      senderId: // value for 'senderId'
 *   },
 * });
 */
export function useDeclineFriendRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>(DeclineFriendRequestDocument, baseOptions);
      }
export type DeclineFriendRequestMutationHookResult = ReturnType<typeof useDeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationResult = ApolloReactCommon.MutationResult<DeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($friendId: ID!) {
  sendFriendRequest(friendId: $friendId)
}
    `;
export type SendFriendRequestMutationFn = ApolloReactCommon.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, baseOptions);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = ApolloReactCommon.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const CreateCollabPostDocument = gql`
    mutation CreateCollabPost($post: CollabPostArgs!) {
  createCollabPost(post: $post) {
    id
  }
}
    `;
export type CreateCollabPostMutationFn = ApolloReactCommon.MutationFunction<CreateCollabPostMutation, CreateCollabPostMutationVariables>;

/**
 * __useCreateCollabPostMutation__
 *
 * To run a mutation, you first call `useCreateCollabPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollabPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollabPostMutation, { data, loading, error }] = useCreateCollabPostMutation({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function useCreateCollabPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCollabPostMutation, CreateCollabPostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCollabPostMutation, CreateCollabPostMutationVariables>(CreateCollabPostDocument, baseOptions);
      }
export type CreateCollabPostMutationHookResult = ReturnType<typeof useCreateCollabPostMutation>;
export type CreateCollabPostMutationResult = ApolloReactCommon.MutationResult<CreateCollabPostMutation>;
export type CreateCollabPostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCollabPostMutation, CreateCollabPostMutationVariables>;
export const AddCollabPostCommentDocument = gql`
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
    `;
export type AddCollabPostCommentMutationFn = ApolloReactCommon.MutationFunction<AddCollabPostCommentMutation, AddCollabPostCommentMutationVariables>;

/**
 * __useAddCollabPostCommentMutation__
 *
 * To run a mutation, you first call `useAddCollabPostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCollabPostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCollabPostCommentMutation, { data, loading, error }] = useAddCollabPostCommentMutation({
 *   variables: {
 *      content: // value for 'content'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useAddCollabPostCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCollabPostCommentMutation, AddCollabPostCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCollabPostCommentMutation, AddCollabPostCommentMutationVariables>(AddCollabPostCommentDocument, baseOptions);
      }
export type AddCollabPostCommentMutationHookResult = ReturnType<typeof useAddCollabPostCommentMutation>;
export type AddCollabPostCommentMutationResult = ApolloReactCommon.MutationResult<AddCollabPostCommentMutation>;
export type AddCollabPostCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCollabPostCommentMutation, AddCollabPostCommentMutationVariables>;
export const AddCollabPostReactionDocument = gql`
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
    `;
export type AddCollabPostReactionMutationFn = ApolloReactCommon.MutationFunction<AddCollabPostReactionMutation, AddCollabPostReactionMutationVariables>;

/**
 * __useAddCollabPostReactionMutation__
 *
 * To run a mutation, you first call `useAddCollabPostReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCollabPostReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCollabPostReactionMutation, { data, loading, error }] = useAddCollabPostReactionMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *   },
 * });
 */
export function useAddCollabPostReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCollabPostReactionMutation, AddCollabPostReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCollabPostReactionMutation, AddCollabPostReactionMutationVariables>(AddCollabPostReactionDocument, baseOptions);
      }
export type AddCollabPostReactionMutationHookResult = ReturnType<typeof useAddCollabPostReactionMutation>;
export type AddCollabPostReactionMutationResult = ApolloReactCommon.MutationResult<AddCollabPostReactionMutation>;
export type AddCollabPostReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCollabPostReactionMutation, AddCollabPostReactionMutationVariables>;
export const RemoveCollabPostReactionDocument = gql`
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
    `;
export type RemoveCollabPostReactionMutationFn = ApolloReactCommon.MutationFunction<RemoveCollabPostReactionMutation, RemoveCollabPostReactionMutationVariables>;

/**
 * __useRemoveCollabPostReactionMutation__
 *
 * To run a mutation, you first call `useRemoveCollabPostReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCollabPostReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCollabPostReactionMutation, { data, loading, error }] = useRemoveCollabPostReactionMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *   },
 * });
 */
export function useRemoveCollabPostReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveCollabPostReactionMutation, RemoveCollabPostReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveCollabPostReactionMutation, RemoveCollabPostReactionMutationVariables>(RemoveCollabPostReactionDocument, baseOptions);
      }
export type RemoveCollabPostReactionMutationHookResult = ReturnType<typeof useRemoveCollabPostReactionMutation>;
export type RemoveCollabPostReactionMutationResult = ApolloReactCommon.MutationResult<RemoveCollabPostReactionMutation>;
export type RemoveCollabPostReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveCollabPostReactionMutation, RemoveCollabPostReactionMutationVariables>;
export const AddCollabPostCommentReactionDocument = gql`
    mutation AddCollabPostCommentReaction($reaction: AddCollabPostCommentReactionInput!) {
  addCollabPostCommentReaction(reaction: $reaction)
}
    `;
export type AddCollabPostCommentReactionMutationFn = ApolloReactCommon.MutationFunction<AddCollabPostCommentReactionMutation, AddCollabPostCommentReactionMutationVariables>;

/**
 * __useAddCollabPostCommentReactionMutation__
 *
 * To run a mutation, you first call `useAddCollabPostCommentReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCollabPostCommentReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCollabPostCommentReactionMutation, { data, loading, error }] = useAddCollabPostCommentReactionMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *   },
 * });
 */
export function useAddCollabPostCommentReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCollabPostCommentReactionMutation, AddCollabPostCommentReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCollabPostCommentReactionMutation, AddCollabPostCommentReactionMutationVariables>(AddCollabPostCommentReactionDocument, baseOptions);
      }
export type AddCollabPostCommentReactionMutationHookResult = ReturnType<typeof useAddCollabPostCommentReactionMutation>;
export type AddCollabPostCommentReactionMutationResult = ApolloReactCommon.MutationResult<AddCollabPostCommentReactionMutation>;
export type AddCollabPostCommentReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCollabPostCommentReactionMutation, AddCollabPostCommentReactionMutationVariables>;
export const RemoveCollabPostCommentReactionDocument = gql`
    mutation RemoveCollabPostCommentReaction($reaction: RemoveCollabPostCommentReactionInput!) {
  removeCollabPostCommentReaction(reaction: $reaction)
}
    `;
export type RemoveCollabPostCommentReactionMutationFn = ApolloReactCommon.MutationFunction<RemoveCollabPostCommentReactionMutation, RemoveCollabPostCommentReactionMutationVariables>;

/**
 * __useRemoveCollabPostCommentReactionMutation__
 *
 * To run a mutation, you first call `useRemoveCollabPostCommentReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCollabPostCommentReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCollabPostCommentReactionMutation, { data, loading, error }] = useRemoveCollabPostCommentReactionMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *   },
 * });
 */
export function useRemoveCollabPostCommentReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveCollabPostCommentReactionMutation, RemoveCollabPostCommentReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveCollabPostCommentReactionMutation, RemoveCollabPostCommentReactionMutationVariables>(RemoveCollabPostCommentReactionDocument, baseOptions);
      }
export type RemoveCollabPostCommentReactionMutationHookResult = ReturnType<typeof useRemoveCollabPostCommentReactionMutation>;
export type RemoveCollabPostCommentReactionMutationResult = ApolloReactCommon.MutationResult<RemoveCollabPostCommentReactionMutation>;
export type RemoveCollabPostCommentReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveCollabPostCommentReactionMutation, RemoveCollabPostCommentReactionMutationVariables>;
export const AddCollabDiscussionThreadReactionDocument = gql`
    mutation AddCollabDiscussionThreadReaction($reaction: AddCollabDiscussionThreadReactionInput!) {
  addCollabDiscussionThreadReaction(reaction: $reaction)
}
    `;
export type AddCollabDiscussionThreadReactionMutationFn = ApolloReactCommon.MutationFunction<AddCollabDiscussionThreadReactionMutation, AddCollabDiscussionThreadReactionMutationVariables>;

/**
 * __useAddCollabDiscussionThreadReactionMutation__
 *
 * To run a mutation, you first call `useAddCollabDiscussionThreadReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCollabDiscussionThreadReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCollabDiscussionThreadReactionMutation, { data, loading, error }] = useAddCollabDiscussionThreadReactionMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *   },
 * });
 */
export function useAddCollabDiscussionThreadReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCollabDiscussionThreadReactionMutation, AddCollabDiscussionThreadReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCollabDiscussionThreadReactionMutation, AddCollabDiscussionThreadReactionMutationVariables>(AddCollabDiscussionThreadReactionDocument, baseOptions);
      }
export type AddCollabDiscussionThreadReactionMutationHookResult = ReturnType<typeof useAddCollabDiscussionThreadReactionMutation>;
export type AddCollabDiscussionThreadReactionMutationResult = ApolloReactCommon.MutationResult<AddCollabDiscussionThreadReactionMutation>;
export type AddCollabDiscussionThreadReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCollabDiscussionThreadReactionMutation, AddCollabDiscussionThreadReactionMutationVariables>;
export const RemoveCollabDiscussionThreadReactionDocument = gql`
    mutation RemoveCollabDiscussionThreadReaction($reaction: RemoveCollabDiscussionThreadReactionInput!) {
  removeCollabDiscussionThreadReaction(reaction: $reaction)
}
    `;
export type RemoveCollabDiscussionThreadReactionMutationFn = ApolloReactCommon.MutationFunction<RemoveCollabDiscussionThreadReactionMutation, RemoveCollabDiscussionThreadReactionMutationVariables>;

/**
 * __useRemoveCollabDiscussionThreadReactionMutation__
 *
 * To run a mutation, you first call `useRemoveCollabDiscussionThreadReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCollabDiscussionThreadReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCollabDiscussionThreadReactionMutation, { data, loading, error }] = useRemoveCollabDiscussionThreadReactionMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *   },
 * });
 */
export function useRemoveCollabDiscussionThreadReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveCollabDiscussionThreadReactionMutation, RemoveCollabDiscussionThreadReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveCollabDiscussionThreadReactionMutation, RemoveCollabDiscussionThreadReactionMutationVariables>(RemoveCollabDiscussionThreadReactionDocument, baseOptions);
      }
export type RemoveCollabDiscussionThreadReactionMutationHookResult = ReturnType<typeof useRemoveCollabDiscussionThreadReactionMutation>;
export type RemoveCollabDiscussionThreadReactionMutationResult = ApolloReactCommon.MutationResult<RemoveCollabDiscussionThreadReactionMutation>;
export type RemoveCollabDiscussionThreadReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveCollabDiscussionThreadReactionMutation, RemoveCollabDiscussionThreadReactionMutationVariables>;
export const AddDiscussionThreadCommentReactionDocument = gql`
    mutation AddDiscussionThreadCommentReaction($reaction: AddDiscussionThreadCommentReactionInput!) {
  addCollabDiscussionThreadCommentReaction(reaction: $reaction)
}
    `;
export type AddDiscussionThreadCommentReactionMutationFn = ApolloReactCommon.MutationFunction<AddDiscussionThreadCommentReactionMutation, AddDiscussionThreadCommentReactionMutationVariables>;

/**
 * __useAddDiscussionThreadCommentReactionMutation__
 *
 * To run a mutation, you first call `useAddDiscussionThreadCommentReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDiscussionThreadCommentReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDiscussionThreadCommentReactionMutation, { data, loading, error }] = useAddDiscussionThreadCommentReactionMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *   },
 * });
 */
export function useAddDiscussionThreadCommentReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddDiscussionThreadCommentReactionMutation, AddDiscussionThreadCommentReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<AddDiscussionThreadCommentReactionMutation, AddDiscussionThreadCommentReactionMutationVariables>(AddDiscussionThreadCommentReactionDocument, baseOptions);
      }
export type AddDiscussionThreadCommentReactionMutationHookResult = ReturnType<typeof useAddDiscussionThreadCommentReactionMutation>;
export type AddDiscussionThreadCommentReactionMutationResult = ApolloReactCommon.MutationResult<AddDiscussionThreadCommentReactionMutation>;
export type AddDiscussionThreadCommentReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<AddDiscussionThreadCommentReactionMutation, AddDiscussionThreadCommentReactionMutationVariables>;
export const RemoveDiscussionThreadCommentReactionDocument = gql`
    mutation RemoveDiscussionThreadCommentReaction($reaction: RemoveDiscussionThreadCommentReactionInput!) {
  removeCollabDiscussionThreadCommentReaction(reaction: $reaction)
}
    `;
export type RemoveDiscussionThreadCommentReactionMutationFn = ApolloReactCommon.MutationFunction<RemoveDiscussionThreadCommentReactionMutation, RemoveDiscussionThreadCommentReactionMutationVariables>;

/**
 * __useRemoveDiscussionThreadCommentReactionMutation__
 *
 * To run a mutation, you first call `useRemoveDiscussionThreadCommentReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDiscussionThreadCommentReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDiscussionThreadCommentReactionMutation, { data, loading, error }] = useRemoveDiscussionThreadCommentReactionMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *   },
 * });
 */
export function useRemoveDiscussionThreadCommentReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveDiscussionThreadCommentReactionMutation, RemoveDiscussionThreadCommentReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveDiscussionThreadCommentReactionMutation, RemoveDiscussionThreadCommentReactionMutationVariables>(RemoveDiscussionThreadCommentReactionDocument, baseOptions);
      }
export type RemoveDiscussionThreadCommentReactionMutationHookResult = ReturnType<typeof useRemoveDiscussionThreadCommentReactionMutation>;
export type RemoveDiscussionThreadCommentReactionMutationResult = ApolloReactCommon.MutationResult<RemoveDiscussionThreadCommentReactionMutation>;
export type RemoveDiscussionThreadCommentReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveDiscussionThreadCommentReactionMutation, RemoveDiscussionThreadCommentReactionMutationVariables>;
export const InviteMemberDocument = gql`
    mutation InviteMember($collabId: ID!, $memberId: ID!) {
  inviteMember(collabId: $collabId, memberId: $memberId) {
    id
    username
    avatar
  }
}
    `;
export type InviteMemberMutationFn = ApolloReactCommon.MutationFunction<InviteMemberMutation, InviteMemberMutationVariables>;

/**
 * __useInviteMemberMutation__
 *
 * To run a mutation, you first call `useInviteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteMemberMutation, { data, loading, error }] = useInviteMemberMutation({
 *   variables: {
 *      collabId: // value for 'collabId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useInviteMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InviteMemberMutation, InviteMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<InviteMemberMutation, InviteMemberMutationVariables>(InviteMemberDocument, baseOptions);
      }
export type InviteMemberMutationHookResult = ReturnType<typeof useInviteMemberMutation>;
export type InviteMemberMutationResult = ApolloReactCommon.MutationResult<InviteMemberMutation>;
export type InviteMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<InviteMemberMutation, InviteMemberMutationVariables>;
export const RequestToJoinDocument = gql`
    mutation RequestToJoin($collabId: ID!) {
  requestToJoin(collabId: $collabId)
}
    `;
export type RequestToJoinMutationFn = ApolloReactCommon.MutationFunction<RequestToJoinMutation, RequestToJoinMutationVariables>;

/**
 * __useRequestToJoinMutation__
 *
 * To run a mutation, you first call `useRequestToJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestToJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestToJoinMutation, { data, loading, error }] = useRequestToJoinMutation({
 *   variables: {
 *      collabId: // value for 'collabId'
 *   },
 * });
 */
export function useRequestToJoinMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RequestToJoinMutation, RequestToJoinMutationVariables>) {
        return ApolloReactHooks.useMutation<RequestToJoinMutation, RequestToJoinMutationVariables>(RequestToJoinDocument, baseOptions);
      }
export type RequestToJoinMutationHookResult = ReturnType<typeof useRequestToJoinMutation>;
export type RequestToJoinMutationResult = ApolloReactCommon.MutationResult<RequestToJoinMutation>;
export type RequestToJoinMutationOptions = ApolloReactCommon.BaseMutationOptions<RequestToJoinMutation, RequestToJoinMutationVariables>;
export const CancelCollabRequestToJoinDocument = gql`
    mutation CancelCollabRequestToJoin($collabId: ID!) {
  cancelRequestToJoin(collabId: $collabId)
}
    `;
export type CancelCollabRequestToJoinMutationFn = ApolloReactCommon.MutationFunction<CancelCollabRequestToJoinMutation, CancelCollabRequestToJoinMutationVariables>;

/**
 * __useCancelCollabRequestToJoinMutation__
 *
 * To run a mutation, you first call `useCancelCollabRequestToJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelCollabRequestToJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelCollabRequestToJoinMutation, { data, loading, error }] = useCancelCollabRequestToJoinMutation({
 *   variables: {
 *      collabId: // value for 'collabId'
 *   },
 * });
 */
export function useCancelCollabRequestToJoinMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelCollabRequestToJoinMutation, CancelCollabRequestToJoinMutationVariables>) {
        return ApolloReactHooks.useMutation<CancelCollabRequestToJoinMutation, CancelCollabRequestToJoinMutationVariables>(CancelCollabRequestToJoinDocument, baseOptions);
      }
export type CancelCollabRequestToJoinMutationHookResult = ReturnType<typeof useCancelCollabRequestToJoinMutation>;
export type CancelCollabRequestToJoinMutationResult = ApolloReactCommon.MutationResult<CancelCollabRequestToJoinMutation>;
export type CancelCollabRequestToJoinMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelCollabRequestToJoinMutation, CancelCollabRequestToJoinMutationVariables>;
export const AcceptCollabInvitationDocument = gql`
    mutation AcceptCollabInvitation($collabId: ID!) {
  acceptCollabInvitation(collabId: $collabId)
}
    `;
export type AcceptCollabInvitationMutationFn = ApolloReactCommon.MutationFunction<AcceptCollabInvitationMutation, AcceptCollabInvitationMutationVariables>;

/**
 * __useAcceptCollabInvitationMutation__
 *
 * To run a mutation, you first call `useAcceptCollabInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptCollabInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptCollabInvitationMutation, { data, loading, error }] = useAcceptCollabInvitationMutation({
 *   variables: {
 *      collabId: // value for 'collabId'
 *   },
 * });
 */
export function useAcceptCollabInvitationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptCollabInvitationMutation, AcceptCollabInvitationMutationVariables>) {
        return ApolloReactHooks.useMutation<AcceptCollabInvitationMutation, AcceptCollabInvitationMutationVariables>(AcceptCollabInvitationDocument, baseOptions);
      }
export type AcceptCollabInvitationMutationHookResult = ReturnType<typeof useAcceptCollabInvitationMutation>;
export type AcceptCollabInvitationMutationResult = ApolloReactCommon.MutationResult<AcceptCollabInvitationMutation>;
export type AcceptCollabInvitationMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptCollabInvitationMutation, AcceptCollabInvitationMutationVariables>;
export const DeclineCollabInvitationDocument = gql`
    mutation DeclineCollabInvitation($collabId: ID!) {
  declineCollabInvitation(collabId: $collabId)
}
    `;
export type DeclineCollabInvitationMutationFn = ApolloReactCommon.MutationFunction<DeclineCollabInvitationMutation, DeclineCollabInvitationMutationVariables>;

/**
 * __useDeclineCollabInvitationMutation__
 *
 * To run a mutation, you first call `useDeclineCollabInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineCollabInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineCollabInvitationMutation, { data, loading, error }] = useDeclineCollabInvitationMutation({
 *   variables: {
 *      collabId: // value for 'collabId'
 *   },
 * });
 */
export function useDeclineCollabInvitationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeclineCollabInvitationMutation, DeclineCollabInvitationMutationVariables>) {
        return ApolloReactHooks.useMutation<DeclineCollabInvitationMutation, DeclineCollabInvitationMutationVariables>(DeclineCollabInvitationDocument, baseOptions);
      }
export type DeclineCollabInvitationMutationHookResult = ReturnType<typeof useDeclineCollabInvitationMutation>;
export type DeclineCollabInvitationMutationResult = ApolloReactCommon.MutationResult<DeclineCollabInvitationMutation>;
export type DeclineCollabInvitationMutationOptions = ApolloReactCommon.BaseMutationOptions<DeclineCollabInvitationMutation, DeclineCollabInvitationMutationVariables>;
export const AcceptMemberRequestDocument = gql`
    mutation AcceptMemberRequest($collabId: ID!, $memberId: ID!) {
  acceptMemberRequest(collabId: $collabId, memberId: $memberId)
}
    `;
export type AcceptMemberRequestMutationFn = ApolloReactCommon.MutationFunction<AcceptMemberRequestMutation, AcceptMemberRequestMutationVariables>;

/**
 * __useAcceptMemberRequestMutation__
 *
 * To run a mutation, you first call `useAcceptMemberRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptMemberRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptMemberRequestMutation, { data, loading, error }] = useAcceptMemberRequestMutation({
 *   variables: {
 *      collabId: // value for 'collabId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useAcceptMemberRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptMemberRequestMutation, AcceptMemberRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<AcceptMemberRequestMutation, AcceptMemberRequestMutationVariables>(AcceptMemberRequestDocument, baseOptions);
      }
export type AcceptMemberRequestMutationHookResult = ReturnType<typeof useAcceptMemberRequestMutation>;
export type AcceptMemberRequestMutationResult = ApolloReactCommon.MutationResult<AcceptMemberRequestMutation>;
export type AcceptMemberRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptMemberRequestMutation, AcceptMemberRequestMutationVariables>;
export const DeclineMemberRequestDocument = gql`
    mutation DeclineMemberRequest($collabId: ID!, $memberId: ID!) {
  declineMemberRequest(collabId: $collabId, memberId: $memberId)
}
    `;
export type DeclineMemberRequestMutationFn = ApolloReactCommon.MutationFunction<DeclineMemberRequestMutation, DeclineMemberRequestMutationVariables>;

/**
 * __useDeclineMemberRequestMutation__
 *
 * To run a mutation, you first call `useDeclineMemberRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineMemberRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineMemberRequestMutation, { data, loading, error }] = useDeclineMemberRequestMutation({
 *   variables: {
 *      collabId: // value for 'collabId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useDeclineMemberRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeclineMemberRequestMutation, DeclineMemberRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<DeclineMemberRequestMutation, DeclineMemberRequestMutationVariables>(DeclineMemberRequestDocument, baseOptions);
      }
export type DeclineMemberRequestMutationHookResult = ReturnType<typeof useDeclineMemberRequestMutation>;
export type DeclineMemberRequestMutationResult = ApolloReactCommon.MutationResult<DeclineMemberRequestMutation>;
export type DeclineMemberRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<DeclineMemberRequestMutation, DeclineMemberRequestMutationVariables>;
export const RemoveMemberDocument = gql`
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
    `;
export type RemoveMemberMutationFn = ApolloReactCommon.MutationFunction<RemoveMemberMutation, RemoveMemberMutationVariables>;

/**
 * __useRemoveMemberMutation__
 *
 * To run a mutation, you first call `useRemoveMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMemberMutation, { data, loading, error }] = useRemoveMemberMutation({
 *   variables: {
 *      collabId: // value for 'collabId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useRemoveMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveMemberMutation, RemoveMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveMemberMutation, RemoveMemberMutationVariables>(RemoveMemberDocument, baseOptions);
      }
export type RemoveMemberMutationHookResult = ReturnType<typeof useRemoveMemberMutation>;
export type RemoveMemberMutationResult = ApolloReactCommon.MutationResult<RemoveMemberMutation>;
export type RemoveMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveMemberMutation, RemoveMemberMutationVariables>;
export const CreateWallMessageDocument = gql`
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
    `;
export type CreateWallMessageMutationFn = ApolloReactCommon.MutationFunction<CreateWallMessageMutation, CreateWallMessageMutationVariables>;

/**
 * __useCreateWallMessageMutation__
 *
 * To run a mutation, you first call `useCreateWallMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWallMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWallMessageMutation, { data, loading, error }] = useCreateWallMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWallMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateWallMessageMutation, CreateWallMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateWallMessageMutation, CreateWallMessageMutationVariables>(CreateWallMessageDocument, baseOptions);
      }
export type CreateWallMessageMutationHookResult = ReturnType<typeof useCreateWallMessageMutation>;
export type CreateWallMessageMutationResult = ApolloReactCommon.MutationResult<CreateWallMessageMutation>;
export type CreateWallMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateWallMessageMutation, CreateWallMessageMutationVariables>;
export const DeleteWallMessageDocument = gql`
    mutation DeleteWallMessage($messageId: ID!) {
  deleteWallMessage(messageId: $messageId)
}
    `;
export type DeleteWallMessageMutationFn = ApolloReactCommon.MutationFunction<DeleteWallMessageMutation, DeleteWallMessageMutationVariables>;

/**
 * __useDeleteWallMessageMutation__
 *
 * To run a mutation, you first call `useDeleteWallMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWallMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWallMessageMutation, { data, loading, error }] = useDeleteWallMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteWallMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteWallMessageMutation, DeleteWallMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteWallMessageMutation, DeleteWallMessageMutationVariables>(DeleteWallMessageDocument, baseOptions);
      }
export type DeleteWallMessageMutationHookResult = ReturnType<typeof useDeleteWallMessageMutation>;
export type DeleteWallMessageMutationResult = ApolloReactCommon.MutationResult<DeleteWallMessageMutation>;
export type DeleteWallMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteWallMessageMutation, DeleteWallMessageMutationVariables>;
export const CreateTaskListDocument = gql`
    mutation CreateTaskList($input: CreateTaskListInput!) {
  createTaskList(input: $input) {
    id
    name
    order
  }
}
    `;
export type CreateTaskListMutationFn = ApolloReactCommon.MutationFunction<CreateTaskListMutation, CreateTaskListMutationVariables>;

/**
 * __useCreateTaskListMutation__
 *
 * To run a mutation, you first call `useCreateTaskListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskListMutation, { data, loading, error }] = useCreateTaskListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskListMutation, CreateTaskListMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTaskListMutation, CreateTaskListMutationVariables>(CreateTaskListDocument, baseOptions);
      }
export type CreateTaskListMutationHookResult = ReturnType<typeof useCreateTaskListMutation>;
export type CreateTaskListMutationResult = ApolloReactCommon.MutationResult<CreateTaskListMutation>;
export type CreateTaskListMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskListMutation, CreateTaskListMutationVariables>;
export const UpdateTaskListNameDocument = gql`
    mutation UpdateTaskListName($input: UpdateTaskListNameInput!) {
  updateTaskListName(input: $input) {
    id
    name
  }
}
    `;
export type UpdateTaskListNameMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskListNameMutation, UpdateTaskListNameMutationVariables>;

/**
 * __useUpdateTaskListNameMutation__
 *
 * To run a mutation, you first call `useUpdateTaskListNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskListNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskListNameMutation, { data, loading, error }] = useUpdateTaskListNameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskListNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskListNameMutation, UpdateTaskListNameMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskListNameMutation, UpdateTaskListNameMutationVariables>(UpdateTaskListNameDocument, baseOptions);
      }
export type UpdateTaskListNameMutationHookResult = ReturnType<typeof useUpdateTaskListNameMutation>;
export type UpdateTaskListNameMutationResult = ApolloReactCommon.MutationResult<UpdateTaskListNameMutation>;
export type UpdateTaskListNameMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskListNameMutation, UpdateTaskListNameMutationVariables>;
export const UpdateTaskListPositionDocument = gql`
    mutation UpdateTaskListPosition($input: UpdateTaskListPositionInput!) {
  updateTaskListPosition(input: $input) {
    id
  }
}
    `;
export type UpdateTaskListPositionMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskListPositionMutation, UpdateTaskListPositionMutationVariables>;

/**
 * __useUpdateTaskListPositionMutation__
 *
 * To run a mutation, you first call `useUpdateTaskListPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskListPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskListPositionMutation, { data, loading, error }] = useUpdateTaskListPositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskListPositionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskListPositionMutation, UpdateTaskListPositionMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskListPositionMutation, UpdateTaskListPositionMutationVariables>(UpdateTaskListPositionDocument, baseOptions);
      }
export type UpdateTaskListPositionMutationHookResult = ReturnType<typeof useUpdateTaskListPositionMutation>;
export type UpdateTaskListPositionMutationResult = ApolloReactCommon.MutationResult<UpdateTaskListPositionMutation>;
export type UpdateTaskListPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskListPositionMutation, UpdateTaskListPositionMutationVariables>;
export const DeleteTaskListDocument = gql`
    mutation DeleteTaskList($taskListId: ID!) {
  deleteTaskList(taskListId: $taskListId)
}
    `;
export type DeleteTaskListMutationFn = ApolloReactCommon.MutationFunction<DeleteTaskListMutation, DeleteTaskListMutationVariables>;

/**
 * __useDeleteTaskListMutation__
 *
 * To run a mutation, you first call `useDeleteTaskListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskListMutation, { data, loading, error }] = useDeleteTaskListMutation({
 *   variables: {
 *      taskListId: // value for 'taskListId'
 *   },
 * });
 */
export function useDeleteTaskListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTaskListMutation, DeleteTaskListMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTaskListMutation, DeleteTaskListMutationVariables>(DeleteTaskListDocument, baseOptions);
      }
export type DeleteTaskListMutationHookResult = ReturnType<typeof useDeleteTaskListMutation>;
export type DeleteTaskListMutationResult = ApolloReactCommon.MutationResult<DeleteTaskListMutation>;
export type DeleteTaskListMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTaskListMutation, DeleteTaskListMutationVariables>;
export const CreateTaskDocument = gql`
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
    `;
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($taskId: ID!) {
  deleteTask(taskId: $taskId)
}
    `;
export type DeleteTaskMutationFn = ApolloReactCommon.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = ApolloReactCommon.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const UpdateTaskDocument = gql`
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
    `;
export type UpdateTaskMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, baseOptions);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = ApolloReactCommon.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const MoveTaskToListDocument = gql`
    mutation MoveTaskToList($input: MoveTaskToListInput!) {
  moveTaskToList(input: $input) {
    id
  }
}
    `;
export type MoveTaskToListMutationFn = ApolloReactCommon.MutationFunction<MoveTaskToListMutation, MoveTaskToListMutationVariables>;

/**
 * __useMoveTaskToListMutation__
 *
 * To run a mutation, you first call `useMoveTaskToListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveTaskToListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveTaskToListMutation, { data, loading, error }] = useMoveTaskToListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveTaskToListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MoveTaskToListMutation, MoveTaskToListMutationVariables>) {
        return ApolloReactHooks.useMutation<MoveTaskToListMutation, MoveTaskToListMutationVariables>(MoveTaskToListDocument, baseOptions);
      }
export type MoveTaskToListMutationHookResult = ReturnType<typeof useMoveTaskToListMutation>;
export type MoveTaskToListMutationResult = ApolloReactCommon.MutationResult<MoveTaskToListMutation>;
export type MoveTaskToListMutationOptions = ApolloReactCommon.BaseMutationOptions<MoveTaskToListMutation, MoveTaskToListMutationVariables>;
export const UpdateTaskPositionDocument = gql`
    mutation UpdateTaskPosition($input: UpdateTaskPositionInput!) {
  updateTaskPosition(input: $input) {
    id
  }
}
    `;
export type UpdateTaskPositionMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskPositionMutation, UpdateTaskPositionMutationVariables>;

/**
 * __useUpdateTaskPositionMutation__
 *
 * To run a mutation, you first call `useUpdateTaskPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskPositionMutation, { data, loading, error }] = useUpdateTaskPositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskPositionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskPositionMutation, UpdateTaskPositionMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskPositionMutation, UpdateTaskPositionMutationVariables>(UpdateTaskPositionDocument, baseOptions);
      }
export type UpdateTaskPositionMutationHookResult = ReturnType<typeof useUpdateTaskPositionMutation>;
export type UpdateTaskPositionMutationResult = ApolloReactCommon.MutationResult<UpdateTaskPositionMutation>;
export type UpdateTaskPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskPositionMutation, UpdateTaskPositionMutationVariables>;
export const UpdateTaskAssigneeDocument = gql`
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
    `;
export type UpdateTaskAssigneeMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskAssigneeMutation, UpdateTaskAssigneeMutationVariables>;

/**
 * __useUpdateTaskAssigneeMutation__
 *
 * To run a mutation, you first call `useUpdateTaskAssigneeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskAssigneeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskAssigneeMutation, { data, loading, error }] = useUpdateTaskAssigneeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskAssigneeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskAssigneeMutation, UpdateTaskAssigneeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskAssigneeMutation, UpdateTaskAssigneeMutationVariables>(UpdateTaskAssigneeDocument, baseOptions);
      }
export type UpdateTaskAssigneeMutationHookResult = ReturnType<typeof useUpdateTaskAssigneeMutation>;
export type UpdateTaskAssigneeMutationResult = ApolloReactCommon.MutationResult<UpdateTaskAssigneeMutation>;
export type UpdateTaskAssigneeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskAssigneeMutation, UpdateTaskAssigneeMutationVariables>;
export const CreateTaskCommentDocument = gql`
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
    `;
export type CreateTaskCommentMutationFn = ApolloReactCommon.MutationFunction<CreateTaskCommentMutation, CreateTaskCommentMutationVariables>;

/**
 * __useCreateTaskCommentMutation__
 *
 * To run a mutation, you first call `useCreateTaskCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskCommentMutation, { data, loading, error }] = useCreateTaskCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskCommentMutation, CreateTaskCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTaskCommentMutation, CreateTaskCommentMutationVariables>(CreateTaskCommentDocument, baseOptions);
      }
export type CreateTaskCommentMutationHookResult = ReturnType<typeof useCreateTaskCommentMutation>;
export type CreateTaskCommentMutationResult = ApolloReactCommon.MutationResult<CreateTaskCommentMutation>;
export type CreateTaskCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskCommentMutation, CreateTaskCommentMutationVariables>;
export const AddTaskCommentReactionDocument = gql`
    mutation AddTaskCommentReaction($reaction: AddCollabTaskCommentReactionInput!) {
  addCollabTaskCommentReaction(reaction: $reaction)
}
    `;
export type AddTaskCommentReactionMutationFn = ApolloReactCommon.MutationFunction<AddTaskCommentReactionMutation, AddTaskCommentReactionMutationVariables>;

/**
 * __useAddTaskCommentReactionMutation__
 *
 * To run a mutation, you first call `useAddTaskCommentReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskCommentReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskCommentReactionMutation, { data, loading, error }] = useAddTaskCommentReactionMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *   },
 * });
 */
export function useAddTaskCommentReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTaskCommentReactionMutation, AddTaskCommentReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<AddTaskCommentReactionMutation, AddTaskCommentReactionMutationVariables>(AddTaskCommentReactionDocument, baseOptions);
      }
export type AddTaskCommentReactionMutationHookResult = ReturnType<typeof useAddTaskCommentReactionMutation>;
export type AddTaskCommentReactionMutationResult = ApolloReactCommon.MutationResult<AddTaskCommentReactionMutation>;
export type AddTaskCommentReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTaskCommentReactionMutation, AddTaskCommentReactionMutationVariables>;
export const RemoveTaskCommentReactionDocument = gql`
    mutation RemoveTaskCommentReaction($reaction: RemoveCollabTaskCommentReactionInput!) {
  removeCollabTaskCommentReaction(reaction: $reaction)
}
    `;
export type RemoveTaskCommentReactionMutationFn = ApolloReactCommon.MutationFunction<RemoveTaskCommentReactionMutation, RemoveTaskCommentReactionMutationVariables>;

/**
 * __useRemoveTaskCommentReactionMutation__
 *
 * To run a mutation, you first call `useRemoveTaskCommentReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTaskCommentReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTaskCommentReactionMutation, { data, loading, error }] = useRemoveTaskCommentReactionMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *   },
 * });
 */
export function useRemoveTaskCommentReactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveTaskCommentReactionMutation, RemoveTaskCommentReactionMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveTaskCommentReactionMutation, RemoveTaskCommentReactionMutationVariables>(RemoveTaskCommentReactionDocument, baseOptions);
      }
export type RemoveTaskCommentReactionMutationHookResult = ReturnType<typeof useRemoveTaskCommentReactionMutation>;
export type RemoveTaskCommentReactionMutationResult = ApolloReactCommon.MutationResult<RemoveTaskCommentReactionMutation>;
export type RemoveTaskCommentReactionMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveTaskCommentReactionMutation, RemoveTaskCommentReactionMutationVariables>;
export const CreateDiscussionThreadCommentDocument = gql`
    mutation CreateDiscussionThreadComment($input: CreateCollabDiscussionThreadCommentInput!) {
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
    `;
export type CreateDiscussionThreadCommentMutationFn = ApolloReactCommon.MutationFunction<CreateDiscussionThreadCommentMutation, CreateDiscussionThreadCommentMutationVariables>;

/**
 * __useCreateDiscussionThreadCommentMutation__
 *
 * To run a mutation, you first call `useCreateDiscussionThreadCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDiscussionThreadCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDiscussionThreadCommentMutation, { data, loading, error }] = useCreateDiscussionThreadCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDiscussionThreadCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDiscussionThreadCommentMutation, CreateDiscussionThreadCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateDiscussionThreadCommentMutation, CreateDiscussionThreadCommentMutationVariables>(CreateDiscussionThreadCommentDocument, baseOptions);
      }
export type CreateDiscussionThreadCommentMutationHookResult = ReturnType<typeof useCreateDiscussionThreadCommentMutation>;
export type CreateDiscussionThreadCommentMutationResult = ApolloReactCommon.MutationResult<CreateDiscussionThreadCommentMutation>;
export type CreateDiscussionThreadCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDiscussionThreadCommentMutation, CreateDiscussionThreadCommentMutationVariables>;
export const ConnectToChatDocument = gql`
    mutation ConnectToChat($status: UserChatStatus!) {
  connectToChat(status: $status) {
    users {
      user {
        id
        username
        avatar
      }
      status
    }
  }
}
    `;
export type ConnectToChatMutationFn = ApolloReactCommon.MutationFunction<ConnectToChatMutation, ConnectToChatMutationVariables>;

/**
 * __useConnectToChatMutation__
 *
 * To run a mutation, you first call `useConnectToChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectToChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectToChatMutation, { data, loading, error }] = useConnectToChatMutation({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useConnectToChatMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ConnectToChatMutation, ConnectToChatMutationVariables>) {
        return ApolloReactHooks.useMutation<ConnectToChatMutation, ConnectToChatMutationVariables>(ConnectToChatDocument, baseOptions);
      }
export type ConnectToChatMutationHookResult = ReturnType<typeof useConnectToChatMutation>;
export type ConnectToChatMutationResult = ApolloReactCommon.MutationResult<ConnectToChatMutation>;
export type ConnectToChatMutationOptions = ApolloReactCommon.BaseMutationOptions<ConnectToChatMutation, ConnectToChatMutationVariables>;
export const SendPrivateChatMessageDocument = gql`
    mutation SendPrivateChatMessage($input: SendPrivateChatMessageInput!) {
  sendPrivateChatMessage(input: $input) {
    id
    authorId
    content
    creationDate
  }
}
    `;
export type SendPrivateChatMessageMutationFn = ApolloReactCommon.MutationFunction<SendPrivateChatMessageMutation, SendPrivateChatMessageMutationVariables>;

/**
 * __useSendPrivateChatMessageMutation__
 *
 * To run a mutation, you first call `useSendPrivateChatMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPrivateChatMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPrivateChatMessageMutation, { data, loading, error }] = useSendPrivateChatMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendPrivateChatMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendPrivateChatMessageMutation, SendPrivateChatMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<SendPrivateChatMessageMutation, SendPrivateChatMessageMutationVariables>(SendPrivateChatMessageDocument, baseOptions);
      }
export type SendPrivateChatMessageMutationHookResult = ReturnType<typeof useSendPrivateChatMessageMutation>;
export type SendPrivateChatMessageMutationResult = ApolloReactCommon.MutationResult<SendPrivateChatMessageMutation>;
export type SendPrivateChatMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<SendPrivateChatMessageMutation, SendPrivateChatMessageMutationVariables>;
export const UpdateStatusDocument = gql`
    mutation UpdateStatus($status: UserChatStatus!) {
  updateStatus(status: $status)
}
    `;
export type UpdateStatusMutationFn = ApolloReactCommon.MutationFunction<UpdateStatusMutation, UpdateStatusMutationVariables>;

/**
 * __useUpdateStatusMutation__
 *
 * To run a mutation, you first call `useUpdateStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStatusMutation, { data, loading, error }] = useUpdateStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateStatusMutation, UpdateStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateStatusMutation, UpdateStatusMutationVariables>(UpdateStatusDocument, baseOptions);
      }
export type UpdateStatusMutationHookResult = ReturnType<typeof useUpdateStatusMutation>;
export type UpdateStatusMutationResult = ApolloReactCommon.MutationResult<UpdateStatusMutation>;
export type UpdateStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateStatusMutation, UpdateStatusMutationVariables>;
export const FriendStatusChangeDocument = gql`
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
    `;

/**
 * __useFriendStatusChangeSubscription__
 *
 * To run a query within a React component, call `useFriendStatusChangeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFriendStatusChangeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendStatusChangeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useFriendStatusChangeSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<FriendStatusChangeSubscription, FriendStatusChangeSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<FriendStatusChangeSubscription, FriendStatusChangeSubscriptionVariables>(FriendStatusChangeDocument, baseOptions);
      }
export type FriendStatusChangeSubscriptionHookResult = ReturnType<typeof useFriendStatusChangeSubscription>;
export type FriendStatusChangeSubscriptionResult = ApolloReactCommon.SubscriptionResult<FriendStatusChangeSubscription>;
export const NewPrivateChatMessageDocument = gql`
    subscription NewPrivateChatMessage {
  newPrivateChatMessage {
    id
    authorId
    content
    creationDate
  }
}
    `;

/**
 * __useNewPrivateChatMessageSubscription__
 *
 * To run a query within a React component, call `useNewPrivateChatMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewPrivateChatMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewPrivateChatMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewPrivateChatMessageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewPrivateChatMessageSubscription, NewPrivateChatMessageSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewPrivateChatMessageSubscription, NewPrivateChatMessageSubscriptionVariables>(NewPrivateChatMessageDocument, baseOptions);
      }
export type NewPrivateChatMessageSubscriptionHookResult = ReturnType<typeof useNewPrivateChatMessageSubscription>;
export type NewPrivateChatMessageSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewPrivateChatMessageSubscription>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    id
    username
    avatar
    friendRequestsCount
    notificationsCount
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const CurrentUserFriendsDocument = gql`
    query CurrentUserFriends {
  currentUser {
    id
    friends {
      id
      username
      avatar
      bio
      title
      country
      isSelf
      isFriend
      canRequestFriendship
    }
  }
}
    `;

/**
 * __useCurrentUserFriendsQuery__
 *
 * To run a query within a React component, call `useCurrentUserFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserFriendsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserFriendsQuery, CurrentUserFriendsQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserFriendsQuery, CurrentUserFriendsQueryVariables>(CurrentUserFriendsDocument, baseOptions);
      }
export function useCurrentUserFriendsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserFriendsQuery, CurrentUserFriendsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserFriendsQuery, CurrentUserFriendsQueryVariables>(CurrentUserFriendsDocument, baseOptions);
        }
export type CurrentUserFriendsQueryHookResult = ReturnType<typeof useCurrentUserFriendsQuery>;
export type CurrentUserFriendsLazyQueryHookResult = ReturnType<typeof useCurrentUserFriendsLazyQuery>;
export type CurrentUserFriendsQueryResult = ApolloReactCommon.QueryResult<CurrentUserFriendsQuery, CurrentUserFriendsQueryVariables>;
export const CurrentUserNotificationsDocument = gql`
    query CurrentUserNotifications {
  currentUser {
    id
    notifications {
      id
      type
      message
      title
      url
      isRead
      creationDate
    }
  }
}
    `;

/**
 * __useCurrentUserNotificationsQuery__
 *
 * To run a query within a React component, call `useCurrentUserNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserNotificationsQuery, CurrentUserNotificationsQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserNotificationsQuery, CurrentUserNotificationsQueryVariables>(CurrentUserNotificationsDocument, baseOptions);
      }
export function useCurrentUserNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserNotificationsQuery, CurrentUserNotificationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserNotificationsQuery, CurrentUserNotificationsQueryVariables>(CurrentUserNotificationsDocument, baseOptions);
        }
export type CurrentUserNotificationsQueryHookResult = ReturnType<typeof useCurrentUserNotificationsQuery>;
export type CurrentUserNotificationsLazyQueryHookResult = ReturnType<typeof useCurrentUserNotificationsLazyQuery>;
export type CurrentUserNotificationsQueryResult = ApolloReactCommon.QueryResult<CurrentUserNotificationsQuery, CurrentUserNotificationsQueryVariables>;
export const CurrentUserFriendRequestsDocument = gql`
    query CurrentUserFriendRequests {
  currentUser {
    id
    friendRequests {
      id
      username
      avatar
    }
  }
}
    `;

/**
 * __useCurrentUserFriendRequestsQuery__
 *
 * To run a query within a React component, call `useCurrentUserFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserFriendRequestsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserFriendRequestsQuery, CurrentUserFriendRequestsQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserFriendRequestsQuery, CurrentUserFriendRequestsQueryVariables>(CurrentUserFriendRequestsDocument, baseOptions);
      }
export function useCurrentUserFriendRequestsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserFriendRequestsQuery, CurrentUserFriendRequestsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserFriendRequestsQuery, CurrentUserFriendRequestsQueryVariables>(CurrentUserFriendRequestsDocument, baseOptions);
        }
export type CurrentUserFriendRequestsQueryHookResult = ReturnType<typeof useCurrentUserFriendRequestsQuery>;
export type CurrentUserFriendRequestsLazyQueryHookResult = ReturnType<typeof useCurrentUserFriendRequestsLazyQuery>;
export type CurrentUserFriendRequestsQueryResult = ApolloReactCommon.QueryResult<CurrentUserFriendRequestsQuery, CurrentUserFriendRequestsQueryVariables>;
export const SearchFriendsDocument = gql`
    query SearchFriends($input: SearchUsersInput!) {
  searchFriends(input: $input) {
    id
    username
    avatar
  }
}
    `;

/**
 * __useSearchFriendsQuery__
 *
 * To run a query within a React component, call `useSearchFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchFriendsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchFriendsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchFriendsQuery, SearchFriendsQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchFriendsQuery, SearchFriendsQueryVariables>(SearchFriendsDocument, baseOptions);
      }
export function useSearchFriendsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchFriendsQuery, SearchFriendsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchFriendsQuery, SearchFriendsQueryVariables>(SearchFriendsDocument, baseOptions);
        }
export type SearchFriendsQueryHookResult = ReturnType<typeof useSearchFriendsQuery>;
export type SearchFriendsLazyQueryHookResult = ReturnType<typeof useSearchFriendsLazyQuery>;
export type SearchFriendsQueryResult = ApolloReactCommon.QueryResult<SearchFriendsQuery, SearchFriendsQueryVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($input: SearchUsersInput!) {
  searchUsers(input: $input) {
    id
    username
    avatar
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, baseOptions);
      }
export function useSearchUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, baseOptions);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = ApolloReactCommon.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const GetCurrentUserInfoDocument = gql`
    query GetCurrentUserInfo {
  currentUser {
    id
    firstName
    lastName
    title
    country
    bio
    github
    twitter
    linkedin
  }
}
    `;

/**
 * __useGetCurrentUserInfoQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>(GetCurrentUserInfoDocument, baseOptions);
      }
export function useGetCurrentUserInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>(GetCurrentUserInfoDocument, baseOptions);
        }
export type GetCurrentUserInfoQueryHookResult = ReturnType<typeof useGetCurrentUserInfoQuery>;
export type GetCurrentUserInfoLazyQueryHookResult = ReturnType<typeof useGetCurrentUserInfoLazyQuery>;
export type GetCurrentUserInfoQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>;
export const CurrentUserConversationsPreviewDocument = gql`
    query CurrentUserConversationsPreview {
  currentUser {
    id
    conversationsPreview {
      userId
      username
      avatar
      content
    }
  }
}
    `;

/**
 * __useCurrentUserConversationsPreviewQuery__
 *
 * To run a query within a React component, call `useCurrentUserConversationsPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserConversationsPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserConversationsPreviewQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserConversationsPreviewQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserConversationsPreviewQuery, CurrentUserConversationsPreviewQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserConversationsPreviewQuery, CurrentUserConversationsPreviewQueryVariables>(CurrentUserConversationsPreviewDocument, baseOptions);
      }
export function useCurrentUserConversationsPreviewLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserConversationsPreviewQuery, CurrentUserConversationsPreviewQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserConversationsPreviewQuery, CurrentUserConversationsPreviewQueryVariables>(CurrentUserConversationsPreviewDocument, baseOptions);
        }
export type CurrentUserConversationsPreviewQueryHookResult = ReturnType<typeof useCurrentUserConversationsPreviewQuery>;
export type CurrentUserConversationsPreviewLazyQueryHookResult = ReturnType<typeof useCurrentUserConversationsPreviewLazyQuery>;
export type CurrentUserConversationsPreviewQueryResult = ApolloReactCommon.QueryResult<CurrentUserConversationsPreviewQuery, CurrentUserConversationsPreviewQueryVariables>;
export const CurrentUserConversationDocument = gql`
    query CurrentUserConversation($userId: ID!, $offset: Int!, $limit: Int!) {
  getConversation(userId: $userId, offset: $offset, limit: $limit) {
    hasNextPage
    messages {
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
}
    `;

/**
 * __useCurrentUserConversationQuery__
 *
 * To run a query within a React component, call `useCurrentUserConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserConversationQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCurrentUserConversationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserConversationQuery, CurrentUserConversationQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserConversationQuery, CurrentUserConversationQueryVariables>(CurrentUserConversationDocument, baseOptions);
      }
export function useCurrentUserConversationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserConversationQuery, CurrentUserConversationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserConversationQuery, CurrentUserConversationQueryVariables>(CurrentUserConversationDocument, baseOptions);
        }
export type CurrentUserConversationQueryHookResult = ReturnType<typeof useCurrentUserConversationQuery>;
export type CurrentUserConversationLazyQueryHookResult = ReturnType<typeof useCurrentUserConversationLazyQuery>;
export type CurrentUserConversationQueryResult = ApolloReactCommon.QueryResult<CurrentUserConversationQuery, CurrentUserConversationQueryVariables>;
export const GetCurrentUserCollabsDocument = gql`
    query GetCurrentUserCollabs {
  currentUser {
    id
    collabs {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCurrentUserCollabsQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserCollabsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserCollabsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserCollabsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserCollabsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserCollabsQuery, GetCurrentUserCollabsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserCollabsQuery, GetCurrentUserCollabsQueryVariables>(GetCurrentUserCollabsDocument, baseOptions);
      }
export function useGetCurrentUserCollabsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserCollabsQuery, GetCurrentUserCollabsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserCollabsQuery, GetCurrentUserCollabsQueryVariables>(GetCurrentUserCollabsDocument, baseOptions);
        }
export type GetCurrentUserCollabsQueryHookResult = ReturnType<typeof useGetCurrentUserCollabsQuery>;
export type GetCurrentUserCollabsLazyQueryHookResult = ReturnType<typeof useGetCurrentUserCollabsLazyQuery>;
export type GetCurrentUserCollabsQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserCollabsQuery, GetCurrentUserCollabsQueryVariables>;
export const GetCurrentUserCollabInvitationsDocument = gql`
    query GetCurrentUserCollabInvitations {
  currentUser {
    id
    collabInvites {
      id
      name
      owner {
        id
        username
        avatar
      }
    }
  }
}
    `;

/**
 * __useGetCurrentUserCollabInvitationsQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserCollabInvitationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserCollabInvitationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserCollabInvitationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserCollabInvitationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserCollabInvitationsQuery, GetCurrentUserCollabInvitationsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserCollabInvitationsQuery, GetCurrentUserCollabInvitationsQueryVariables>(GetCurrentUserCollabInvitationsDocument, baseOptions);
      }
export function useGetCurrentUserCollabInvitationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserCollabInvitationsQuery, GetCurrentUserCollabInvitationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserCollabInvitationsQuery, GetCurrentUserCollabInvitationsQueryVariables>(GetCurrentUserCollabInvitationsDocument, baseOptions);
        }
export type GetCurrentUserCollabInvitationsQueryHookResult = ReturnType<typeof useGetCurrentUserCollabInvitationsQuery>;
export type GetCurrentUserCollabInvitationsLazyQueryHookResult = ReturnType<typeof useGetCurrentUserCollabInvitationsLazyQuery>;
export type GetCurrentUserCollabInvitationsQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserCollabInvitationsQuery, GetCurrentUserCollabInvitationsQueryVariables>;
export const GetCurrentUserCollabRequestsDocument = gql`
    query GetCurrentUserCollabRequests {
  currentUser {
    id
    collabRequests {
      id
      collab {
        id
        name
      }
      member {
        id
        username
        avatar
      }
    }
  }
}
    `;

/**
 * __useGetCurrentUserCollabRequestsQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserCollabRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserCollabRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserCollabRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserCollabRequestsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserCollabRequestsQuery, GetCurrentUserCollabRequestsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserCollabRequestsQuery, GetCurrentUserCollabRequestsQueryVariables>(GetCurrentUserCollabRequestsDocument, baseOptions);
      }
export function useGetCurrentUserCollabRequestsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserCollabRequestsQuery, GetCurrentUserCollabRequestsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserCollabRequestsQuery, GetCurrentUserCollabRequestsQueryVariables>(GetCurrentUserCollabRequestsDocument, baseOptions);
        }
export type GetCurrentUserCollabRequestsQueryHookResult = ReturnType<typeof useGetCurrentUserCollabRequestsQuery>;
export type GetCurrentUserCollabRequestsLazyQueryHookResult = ReturnType<typeof useGetCurrentUserCollabRequestsLazyQuery>;
export type GetCurrentUserCollabRequestsQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserCollabRequestsQuery, GetCurrentUserCollabRequestsQueryVariables>;
export const GetCurrentUserTasksDocument = gql`
    query GetCurrentUserTasks {
  currentUser {
    id
    tasks {
      id
      description
      assignedBy {
        id
        username
      }
      collab {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetCurrentUserTasksQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserTasksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserTasksQuery, GetCurrentUserTasksQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserTasksQuery, GetCurrentUserTasksQueryVariables>(GetCurrentUserTasksDocument, baseOptions);
      }
export function useGetCurrentUserTasksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserTasksQuery, GetCurrentUserTasksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserTasksQuery, GetCurrentUserTasksQueryVariables>(GetCurrentUserTasksDocument, baseOptions);
        }
export type GetCurrentUserTasksQueryHookResult = ReturnType<typeof useGetCurrentUserTasksQuery>;
export type GetCurrentUserTasksLazyQueryHookResult = ReturnType<typeof useGetCurrentUserTasksLazyQuery>;
export type GetCurrentUserTasksQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserTasksQuery, GetCurrentUserTasksQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
    id
    username
    avatar
    bio
    title
    country
    isSelf
    isFriend
    canRequestFriendship
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const CollabPostsDocument = gql`
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
      creationDate
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
    `;

/**
 * __useCollabPostsQuery__
 *
 * To run a query within a React component, call `useCollabPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollabPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollabPostsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCollabPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollabPostsQuery, CollabPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<CollabPostsQuery, CollabPostsQueryVariables>(CollabPostsDocument, baseOptions);
      }
export function useCollabPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollabPostsQuery, CollabPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollabPostsQuery, CollabPostsQueryVariables>(CollabPostsDocument, baseOptions);
        }
export type CollabPostsQueryHookResult = ReturnType<typeof useCollabPostsQuery>;
export type CollabPostsLazyQueryHookResult = ReturnType<typeof useCollabPostsLazyQuery>;
export type CollabPostsQueryResult = ApolloReactCommon.QueryResult<CollabPostsQuery, CollabPostsQueryVariables>;
export const CollabPostsByStackDocument = gql`
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
      creationDate
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
    `;

/**
 * __useCollabPostsByStackQuery__
 *
 * To run a query within a React component, call `useCollabPostsByStackQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollabPostsByStackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollabPostsByStackQuery({
 *   variables: {
 *      stack: // value for 'stack'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCollabPostsByStackQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollabPostsByStackQuery, CollabPostsByStackQueryVariables>) {
        return ApolloReactHooks.useQuery<CollabPostsByStackQuery, CollabPostsByStackQueryVariables>(CollabPostsByStackDocument, baseOptions);
      }
export function useCollabPostsByStackLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollabPostsByStackQuery, CollabPostsByStackQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollabPostsByStackQuery, CollabPostsByStackQueryVariables>(CollabPostsByStackDocument, baseOptions);
        }
export type CollabPostsByStackQueryHookResult = ReturnType<typeof useCollabPostsByStackQuery>;
export type CollabPostsByStackLazyQueryHookResult = ReturnType<typeof useCollabPostsByStackLazyQuery>;
export type CollabPostsByStackQueryResult = ApolloReactCommon.QueryResult<CollabPostsByStackQuery, CollabPostsByStackQueryVariables>;
export const AdvancedPostsSearchDocument = gql`
    query AdvancedPostsSearch($input: AdvancedPostsSearchInput!) {
  advancedPostsSearch(input: $input) {
    hasNextPage
    posts {
      id
      title
      stack
      experience
      hasStarted
      languages
      creationDate
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
    `;

/**
 * __useAdvancedPostsSearchQuery__
 *
 * To run a query within a React component, call `useAdvancedPostsSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdvancedPostsSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdvancedPostsSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdvancedPostsSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdvancedPostsSearchQuery, AdvancedPostsSearchQueryVariables>) {
        return ApolloReactHooks.useQuery<AdvancedPostsSearchQuery, AdvancedPostsSearchQueryVariables>(AdvancedPostsSearchDocument, baseOptions);
      }
export function useAdvancedPostsSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdvancedPostsSearchQuery, AdvancedPostsSearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AdvancedPostsSearchQuery, AdvancedPostsSearchQueryVariables>(AdvancedPostsSearchDocument, baseOptions);
        }
export type AdvancedPostsSearchQueryHookResult = ReturnType<typeof useAdvancedPostsSearchQuery>;
export type AdvancedPostsSearchLazyQueryHookResult = ReturnType<typeof useAdvancedPostsSearchLazyQuery>;
export type AdvancedPostsSearchQueryResult = ApolloReactCommon.QueryResult<AdvancedPostsSearchQuery, AdvancedPostsSearchQueryVariables>;
export const SearchPostsByTitleDocument = gql`
    query SearchPostsByTitle($input: SearchPostsInput!) {
  searchPostsByTitle(input: $input) {
    hasNextPage
    posts {
      id
      title
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
    `;

/**
 * __useSearchPostsByTitleQuery__
 *
 * To run a query within a React component, call `useSearchPostsByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPostsByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPostsByTitleQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchPostsByTitleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchPostsByTitleQuery, SearchPostsByTitleQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchPostsByTitleQuery, SearchPostsByTitleQueryVariables>(SearchPostsByTitleDocument, baseOptions);
      }
export function useSearchPostsByTitleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchPostsByTitleQuery, SearchPostsByTitleQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchPostsByTitleQuery, SearchPostsByTitleQueryVariables>(SearchPostsByTitleDocument, baseOptions);
        }
export type SearchPostsByTitleQueryHookResult = ReturnType<typeof useSearchPostsByTitleQuery>;
export type SearchPostsByTitleLazyQueryHookResult = ReturnType<typeof useSearchPostsByTitleLazyQuery>;
export type SearchPostsByTitleQueryResult = ApolloReactCommon.QueryResult<SearchPostsByTitleQuery, SearchPostsByTitleQueryVariables>;
export const GetCollabPostDocument = gql`
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
      avatar
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
    creationDate
    reactions {
      emojiId
      count
      isLiked
    }
  }
}
    `;

/**
 * __useGetCollabPostQuery__
 *
 * To run a query within a React component, call `useGetCollabPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollabPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollabPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetCollabPostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCollabPostQuery, GetCollabPostQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCollabPostQuery, GetCollabPostQueryVariables>(GetCollabPostDocument, baseOptions);
      }
export function useGetCollabPostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCollabPostQuery, GetCollabPostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCollabPostQuery, GetCollabPostQueryVariables>(GetCollabPostDocument, baseOptions);
        }
export type GetCollabPostQueryHookResult = ReturnType<typeof useGetCollabPostQuery>;
export type GetCollabPostLazyQueryHookResult = ReturnType<typeof useGetCollabPostLazyQuery>;
export type GetCollabPostQueryResult = ApolloReactCommon.QueryResult<GetCollabPostQuery, GetCollabPostQueryVariables>;
export const CollabPostLanguagesDocument = gql`
    query CollabPostLanguages {
  languages
}
    `;

/**
 * __useCollabPostLanguagesQuery__
 *
 * To run a query within a React component, call `useCollabPostLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollabPostLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollabPostLanguagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCollabPostLanguagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollabPostLanguagesQuery, CollabPostLanguagesQueryVariables>) {
        return ApolloReactHooks.useQuery<CollabPostLanguagesQuery, CollabPostLanguagesQueryVariables>(CollabPostLanguagesDocument, baseOptions);
      }
export function useCollabPostLanguagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollabPostLanguagesQuery, CollabPostLanguagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollabPostLanguagesQuery, CollabPostLanguagesQueryVariables>(CollabPostLanguagesDocument, baseOptions);
        }
export type CollabPostLanguagesQueryHookResult = ReturnType<typeof useCollabPostLanguagesQuery>;
export type CollabPostLanguagesLazyQueryHookResult = ReturnType<typeof useCollabPostLanguagesLazyQuery>;
export type CollabPostLanguagesQueryResult = ApolloReactCommon.QueryResult<CollabPostLanguagesQuery, CollabPostLanguagesQueryVariables>;
export const CollabPostCommentsDocument = gql`
    query CollabPostComments($postId: ID!) {
  collabPost(postId: $postId) {
    id
    comments {
      id
      content
      isAuthor
      creationDate
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
    `;

/**
 * __useCollabPostCommentsQuery__
 *
 * To run a query within a React component, call `useCollabPostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollabPostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollabPostCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCollabPostCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollabPostCommentsQuery, CollabPostCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<CollabPostCommentsQuery, CollabPostCommentsQueryVariables>(CollabPostCommentsDocument, baseOptions);
      }
export function useCollabPostCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollabPostCommentsQuery, CollabPostCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollabPostCommentsQuery, CollabPostCommentsQueryVariables>(CollabPostCommentsDocument, baseOptions);
        }
export type CollabPostCommentsQueryHookResult = ReturnType<typeof useCollabPostCommentsQuery>;
export type CollabPostCommentsLazyQueryHookResult = ReturnType<typeof useCollabPostCommentsLazyQuery>;
export type CollabPostCommentsQueryResult = ApolloReactCommon.QueryResult<CollabPostCommentsQuery, CollabPostCommentsQueryVariables>;
export const CollabDocument = gql`
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
    `;

/**
 * __useCollabQuery__
 *
 * To run a query within a React component, call `useCollabQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollabQuery({
 *   variables: {
 *      collabId: // value for 'collabId'
 *   },
 * });
 */
export function useCollabQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollabQuery, CollabQueryVariables>) {
        return ApolloReactHooks.useQuery<CollabQuery, CollabQueryVariables>(CollabDocument, baseOptions);
      }
export function useCollabLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollabQuery, CollabQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollabQuery, CollabQueryVariables>(CollabDocument, baseOptions);
        }
export type CollabQueryHookResult = ReturnType<typeof useCollabQuery>;
export type CollabLazyQueryHookResult = ReturnType<typeof useCollabLazyQuery>;
export type CollabQueryResult = ApolloReactCommon.QueryResult<CollabQuery, CollabQueryVariables>;
export const CollabMembersDocument = gql`
    query CollabMembers($collabId: ID!) {
  collab(collabId: $collabId) {
    id
    members {
      id
      username
      bio
      avatar
      title
      country
      isSelf
      canRequestFriendship
      isFriend
    }
  }
}
    `;

/**
 * __useCollabMembersQuery__
 *
 * To run a query within a React component, call `useCollabMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollabMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollabMembersQuery({
 *   variables: {
 *      collabId: // value for 'collabId'
 *   },
 * });
 */
export function useCollabMembersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollabMembersQuery, CollabMembersQueryVariables>) {
        return ApolloReactHooks.useQuery<CollabMembersQuery, CollabMembersQueryVariables>(CollabMembersDocument, baseOptions);
      }
export function useCollabMembersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollabMembersQuery, CollabMembersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollabMembersQuery, CollabMembersQueryVariables>(CollabMembersDocument, baseOptions);
        }
export type CollabMembersQueryHookResult = ReturnType<typeof useCollabMembersQuery>;
export type CollabMembersLazyQueryHookResult = ReturnType<typeof useCollabMembersLazyQuery>;
export type CollabMembersQueryResult = ApolloReactCommon.QueryResult<CollabMembersQuery, CollabMembersQueryVariables>;
export const CollabWallMessagesDocument = gql`
    query CollabWallMessages($input: CollabWallMessagesInput!) {
  collabWallMessages(input: $input) {
    hasNextPage
    messages {
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
}
    `;

/**
 * __useCollabWallMessagesQuery__
 *
 * To run a query within a React component, call `useCollabWallMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollabWallMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollabWallMessagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCollabWallMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollabWallMessagesQuery, CollabWallMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<CollabWallMessagesQuery, CollabWallMessagesQueryVariables>(CollabWallMessagesDocument, baseOptions);
      }
export function useCollabWallMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollabWallMessagesQuery, CollabWallMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollabWallMessagesQuery, CollabWallMessagesQueryVariables>(CollabWallMessagesDocument, baseOptions);
        }
export type CollabWallMessagesQueryHookResult = ReturnType<typeof useCollabWallMessagesQuery>;
export type CollabWallMessagesLazyQueryHookResult = ReturnType<typeof useCollabWallMessagesLazyQuery>;
export type CollabWallMessagesQueryResult = ApolloReactCommon.QueryResult<CollabWallMessagesQuery, CollabWallMessagesQueryVariables>;
export const CollabDiscussionThreadsDocument = gql`
    query CollabDiscussionThreads($collabId: ID!) {
  collab(collabId: $collabId) {
    id
    discussionThreads {
      id
      title
      creationDate
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
    `;

/**
 * __useCollabDiscussionThreadsQuery__
 *
 * To run a query within a React component, call `useCollabDiscussionThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollabDiscussionThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollabDiscussionThreadsQuery({
 *   variables: {
 *      collabId: // value for 'collabId'
 *   },
 * });
 */
export function useCollabDiscussionThreadsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollabDiscussionThreadsQuery, CollabDiscussionThreadsQueryVariables>) {
        return ApolloReactHooks.useQuery<CollabDiscussionThreadsQuery, CollabDiscussionThreadsQueryVariables>(CollabDiscussionThreadsDocument, baseOptions);
      }
export function useCollabDiscussionThreadsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollabDiscussionThreadsQuery, CollabDiscussionThreadsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollabDiscussionThreadsQuery, CollabDiscussionThreadsQueryVariables>(CollabDiscussionThreadsDocument, baseOptions);
        }
export type CollabDiscussionThreadsQueryHookResult = ReturnType<typeof useCollabDiscussionThreadsQuery>;
export type CollabDiscussionThreadsLazyQueryHookResult = ReturnType<typeof useCollabDiscussionThreadsLazyQuery>;
export type CollabDiscussionThreadsQueryResult = ApolloReactCommon.QueryResult<CollabDiscussionThreadsQuery, CollabDiscussionThreadsQueryVariables>;
export const CollabThreadDocument = gql`
    query CollabThread($threadId: ID!) {
  thread(threadId: $threadId) {
    id
    title
    content
    creationDate
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
    `;

/**
 * __useCollabThreadQuery__
 *
 * To run a query within a React component, call `useCollabThreadQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollabThreadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollabThreadQuery({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useCollabThreadQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollabThreadQuery, CollabThreadQueryVariables>) {
        return ApolloReactHooks.useQuery<CollabThreadQuery, CollabThreadQueryVariables>(CollabThreadDocument, baseOptions);
      }
export function useCollabThreadLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollabThreadQuery, CollabThreadQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollabThreadQuery, CollabThreadQueryVariables>(CollabThreadDocument, baseOptions);
        }
export type CollabThreadQueryHookResult = ReturnType<typeof useCollabThreadQuery>;
export type CollabThreadLazyQueryHookResult = ReturnType<typeof useCollabThreadLazyQuery>;
export type CollabThreadQueryResult = ApolloReactCommon.QueryResult<CollabThreadQuery, CollabThreadQueryVariables>;
export const CollabThreadCommentsDocument = gql`
    query CollabThreadComments($threadId: ID!) {
  thread(threadId: $threadId) {
    id
    comments {
      id
      content
      creationDate
      isAuthor
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
    `;

/**
 * __useCollabThreadCommentsQuery__
 *
 * To run a query within a React component, call `useCollabThreadCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollabThreadCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollabThreadCommentsQuery({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useCollabThreadCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollabThreadCommentsQuery, CollabThreadCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<CollabThreadCommentsQuery, CollabThreadCommentsQueryVariables>(CollabThreadCommentsDocument, baseOptions);
      }
export function useCollabThreadCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollabThreadCommentsQuery, CollabThreadCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollabThreadCommentsQuery, CollabThreadCommentsQueryVariables>(CollabThreadCommentsDocument, baseOptions);
        }
export type CollabThreadCommentsQueryHookResult = ReturnType<typeof useCollabThreadCommentsQuery>;
export type CollabThreadCommentsLazyQueryHookResult = ReturnType<typeof useCollabThreadCommentsLazyQuery>;
export type CollabThreadCommentsQueryResult = ApolloReactCommon.QueryResult<CollabThreadCommentsQuery, CollabThreadCommentsQueryVariables>;
export const TaskListDocument = gql`
    query TaskList($collabId: ID!) {
  taskList(collabId: $collabId) {
    taskList {
      id
      name
      order
      tasks {
        id
        description
        order
        commentsCount
        taskListId
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
        author {
          id
          username
          avatar
        }
      }
    }
  }
}
    `;

/**
 * __useTaskListQuery__
 *
 * To run a query within a React component, call `useTaskListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskListQuery({
 *   variables: {
 *      collabId: // value for 'collabId'
 *   },
 * });
 */
export function useTaskListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TaskListQuery, TaskListQueryVariables>) {
        return ApolloReactHooks.useQuery<TaskListQuery, TaskListQueryVariables>(TaskListDocument, baseOptions);
      }
export function useTaskListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TaskListQuery, TaskListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TaskListQuery, TaskListQueryVariables>(TaskListDocument, baseOptions);
        }
export type TaskListQueryHookResult = ReturnType<typeof useTaskListQuery>;
export type TaskListLazyQueryHookResult = ReturnType<typeof useTaskListLazyQuery>;
export type TaskListQueryResult = ApolloReactCommon.QueryResult<TaskListQuery, TaskListQueryVariables>;
export const TaskCommentsDocument = gql`
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
      reactions {
        emojiId
        count
        isLiked
      }
    }
  }
}
    `;

/**
 * __useTaskCommentsQuery__
 *
 * To run a query within a React component, call `useTaskCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskCommentsQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useTaskCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TaskCommentsQuery, TaskCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<TaskCommentsQuery, TaskCommentsQueryVariables>(TaskCommentsDocument, baseOptions);
      }
export function useTaskCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TaskCommentsQuery, TaskCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TaskCommentsQuery, TaskCommentsQueryVariables>(TaskCommentsDocument, baseOptions);
        }
export type TaskCommentsQueryHookResult = ReturnType<typeof useTaskCommentsQuery>;
export type TaskCommentsLazyQueryHookResult = ReturnType<typeof useTaskCommentsLazyQuery>;
export type TaskCommentsQueryResult = ApolloReactCommon.QueryResult<TaskCommentsQuery, TaskCommentsQueryVariables>;
export const NewNotificationDocument = gql`
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
    `;

/**
 * __useNewNotificationSubscription__
 *
 * To run a query within a React component, call `useNewNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewNotificationSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewNotificationSubscription, NewNotificationSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewNotificationSubscription, NewNotificationSubscriptionVariables>(NewNotificationDocument, baseOptions);
      }
export type NewNotificationSubscriptionHookResult = ReturnType<typeof useNewNotificationSubscription>;
export type NewNotificationSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewNotificationSubscription>;
export const NewFriendRequestDocument = gql`
    subscription NewFriendRequest {
  newFriendRequest {
    user {
      id
      username
      avatar
    }
  }
}
    `;

/**
 * __useNewFriendRequestSubscription__
 *
 * To run a query within a React component, call `useNewFriendRequestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewFriendRequestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewFriendRequestSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewFriendRequestSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewFriendRequestSubscription, NewFriendRequestSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewFriendRequestSubscription, NewFriendRequestSubscriptionVariables>(NewFriendRequestDocument, baseOptions);
      }
export type NewFriendRequestSubscriptionHookResult = ReturnType<typeof useNewFriendRequestSubscription>;
export type NewFriendRequestSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewFriendRequestSubscription>;