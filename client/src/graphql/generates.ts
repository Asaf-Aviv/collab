import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AddCollabDiscussionThreadReactionInput = {
  emojiId: Scalars['ID'],
  threadId: Scalars['ID'],
};

export type AddCollabPostCommentReactionInput = {
  commentId: Scalars['ID'],
  emojiId: Scalars['ID'],
};

export type AddCollabPostReactionInput = {
  emojiId: Scalars['ID'],
  postId: Scalars['ID'],
};

export type AddCollabTaskCommentReactionInput = {
  commentId: Scalars['ID'],
  emojiId: Scalars['ID'],
};

export type AddDiscussionThreadCommentReactionInput = {
  commentId: Scalars['ID'],
  emojiId: Scalars['ID'],
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  token: Scalars['String'],
};

export type Collab = {
   __typename?: 'Collab',
  acceptsInvites: Scalars['Boolean'],
  collabPostId?: Maybe<Scalars['ID']>,
  discussionThreads: Array<CollabDiscussionThread>,
  id: Scalars['ID'],
  invitationPending: Scalars['Boolean'],
  isMember: Scalars['Boolean'],
  isOwner: Scalars['Boolean'],
  members: Array<User>,
  name: Scalars['String'],
  owner?: Maybe<User>,
  pendingInvites: Array<Maybe<User>>,
  pendingRequests: Array<Maybe<User>>,
  requestToJoinPending: Scalars['Boolean'],
  taskList: Array<TaskList>,
};

export type CollabDiscussionThread = {
   __typename?: 'CollabDiscussionThread',
  author: User,
  collab?: Maybe<Collab>,
  comments: Array<CollabDiscussionThreadComment>,
  commentsCount: Scalars['Int'],
  content: Scalars['String'],
  id: Scalars['ID'],
  reactions: Array<Reaction>,
  reactionsCount: Scalars['Int'],
  title: Scalars['String'],
};

export type CollabDiscussionThreadComment = {
   __typename?: 'CollabDiscussionThreadComment',
  author: User,
  collab?: Maybe<Collab>,
  content: Scalars['String'],
  id: Scalars['ID'],
  reactions: Array<Reaction>,
  thread?: Maybe<CollabDiscussionThread>,
};

export type CollabPost = {
   __typename?: 'CollabPost',
  acceptsInvites: Scalars['Boolean'],
  collabId: Scalars['ID'],
  comments: Array<CollabPostComment>,
  commentsCount: Scalars['Int'],
  createdAt: Scalars['String'],
  description: Scalars['String'],
  experience: Scalars['String'],
  hasStarted: Scalars['Boolean'],
  id: Scalars['ID'],
  invitationPending: Scalars['Boolean'],
  isMember: Scalars['Boolean'],
  isNew: Scalars['Boolean'],
  isOwner: Scalars['Boolean'],
  languages: Array<Scalars['String']>,
  members: Array<User>,
  membersCount: Scalars['Int'],
  name: Scalars['String'],
  owner: User,
  pendingInvites: Array<User>,
  pendingRequests: Array<User>,
  reactions: Array<Reaction>,
  reactionsCount: Scalars['Int'],
  requestToJoinPending: Scalars['Boolean'],
  stack: Array<Scalars['String']>,
  title: Scalars['String'],
  updatedAt: Scalars['String'],
};

export type CollabPostArgs = {
  description: Scalars['String'],
  experience: Experience,
  hasStarted: Scalars['Boolean'],
  languages: Array<Scalars['String']>,
  name: Scalars['String'],
  stack: Array<Scalars['String']>,
  title: Scalars['String'],
};

export type CollabPostComment = {
   __typename?: 'CollabPostComment',
  author: User,
  content: Scalars['String'],
  id: Scalars['ID'],
  reactions: Array<Reaction>,
};

export type CollabPostsPayload = {
   __typename?: 'CollabPostsPayload',
  hasNextPage: Scalars['Boolean'],
  posts: Array<CollabPost>,
};

export type CollabRequest = {
   __typename?: 'CollabRequest',
  collab: Collab,
  member: User,
};

export type CreateCollabDiscussionThreadCommentInput = {
  collabId: Scalars['ID'],
  content: Scalars['String'],
  threadId: Scalars['ID'],
};

export type CreateTaskInput = {
  collabId: Scalars['ID'],
  description: Scalars['String'],
  taskListId: Scalars['ID'],
};

export type CreateTaskListInput = {
  collabId: Scalars['ID'],
  name: Scalars['String'],
};

export type CreateThreadArgs = {
  collabId: Scalars['ID'],
  content: Scalars['String'],
  title: Scalars['String'],
};

export type CurrentUser = {
   __typename?: 'CurrentUser',
  avatar?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>,
  collabInvites: Array<Collab>,
  collabRequests: Array<CollabRequest>,
  collabs: Array<Collab>,
  email: Scalars['String'],
  id: Scalars['ID'],
  username: Scalars['String'],
};

export enum Experience {
  All = 'ALL',
  Junior = 'JUNIOR',
  JuniorMid = 'JUNIOR_MID',
  Mid = 'MID',
  MidSenior = 'MID_SENIOR',
  Senior = 'SENIOR'
}

export type LoginArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type MoveTaskToListInput = {
  newTaskListId: Scalars['ID'],
  newTaskPosition: Scalars['Int'],
  oldTaskListId: Scalars['ID'],
  oldTaskPosition: Scalars['Int'],
};

export type Mutation = {
   __typename?: 'Mutation',
  acceptCollabInvitation: User,
  acceptMemberRequest: Collab,
  addCollabDiscussionThreadCommentReaction: Scalars['Boolean'],
  addCollabDiscussionThreadReaction: Scalars['Boolean'],
  addCollabPostCommentReaction: Scalars['Boolean'],
  addCollabPostReaction: CollabPost,
  addCollabTaskCommentReaction: Scalars['Boolean'],
  cancelRequestToJoin: Scalars['Boolean'],
  createCollabDiscussionThread: CollabDiscussionThread,
  createCollabDiscussionThreadComment: CollabDiscussionThreadComment,
  createCollabPost: CollabPost,
  createComment: CollabPostComment,
  createTask: Task,
  createTaskComment: TaskComment,
  createTaskList: TaskList,
  declineCollabInvitation: Scalars['Boolean'],
  declineMemberRequest: Scalars['Boolean'],
  deleteCollab: Scalars['Boolean'],
  deleteCollabDiscussionThread: Scalars['Boolean'],
  deleteCollabDiscussionThreadComment: Scalars['Boolean'],
  deleteCollabPost: Scalars['Boolean'],
  deleteComment: Scalars['Boolean'],
  deleteTask: Scalars['Boolean'],
  deleteTaskComment: Scalars['Boolean'],
  deleteTaskList: Scalars['Boolean'],
  deleteUser: Scalars['Boolean'],
  inviteMember: User,
  login: AuthPayload,
  moveTaskToList: Task,
  removeCollabDiscussionThreadCommentReaction: Scalars['Boolean'],
  removeCollabDiscussionThreadReaction: Scalars['Boolean'],
  removeCollabPostCommentReaction: Scalars['Boolean'],
  removeCollabPostReaction: CollabPost,
  removeCollabTaskCommentReaction: Scalars['Boolean'],
  removeMember: Collab,
  requestToJoin: Scalars['Boolean'],
  signUp: AuthPayload,
  toggleAcceptInvites: Collab,
  updateTaskListPosition: TaskList,
  updateTaskPosition: Task,
};


export type MutationAcceptCollabInvitationArgs = {
  collabId: Scalars['ID']
};


export type MutationAcceptMemberRequestArgs = {
  collabId: Scalars['ID'],
  memberId: Scalars['ID']
};


export type MutationAddCollabDiscussionThreadCommentReactionArgs = {
  reaction: AddDiscussionThreadCommentReactionInput
};


export type MutationAddCollabDiscussionThreadReactionArgs = {
  reaction: AddCollabDiscussionThreadReactionInput
};


export type MutationAddCollabPostCommentReactionArgs = {
  reaction: AddCollabPostCommentReactionInput
};


export type MutationAddCollabPostReactionArgs = {
  reaction: AddCollabPostReactionInput
};


export type MutationAddCollabTaskCommentReactionArgs = {
  reaction: AddCollabTaskCommentReactionInput
};


export type MutationCancelRequestToJoinArgs = {
  collabId: Scalars['ID']
};


export type MutationCreateCollabDiscussionThreadArgs = {
  thread: CreateThreadArgs
};


export type MutationCreateCollabDiscussionThreadCommentArgs = {
  input: CreateCollabDiscussionThreadCommentInput
};


export type MutationCreateCollabPostArgs = {
  post: CollabPostArgs
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'],
  postId: Scalars['ID']
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput
};


export type MutationCreateTaskCommentArgs = {
  collabId: Scalars['ID'],
  content: Scalars['String'],
  taskId: Scalars['ID']
};


export type MutationCreateTaskListArgs = {
  input: CreateTaskListInput
};


export type MutationDeclineCollabInvitationArgs = {
  collabId: Scalars['ID']
};


export type MutationDeclineMemberRequestArgs = {
  collabId: Scalars['ID'],
  memberId: Scalars['ID']
};


export type MutationDeleteCollabArgs = {
  collabId: Scalars['ID']
};


export type MutationDeleteCollabDiscussionThreadArgs = {
  threadId: Scalars['ID']
};


export type MutationDeleteCollabDiscussionThreadCommentArgs = {
  commentId: Scalars['ID']
};


export type MutationDeleteCollabPostArgs = {
  postId: Scalars['ID']
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID']
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['ID']
};


export type MutationDeleteTaskCommentArgs = {
  commentId: Scalars['ID']
};


export type MutationDeleteTaskListArgs = {
  taskListId: Scalars['ID']
};


export type MutationInviteMemberArgs = {
  collabId: Scalars['ID'],
  memberId: Scalars['ID']
};


export type MutationLoginArgs = {
  credentials: LoginArgs
};


export type MutationMoveTaskToListArgs = {
  input: MoveTaskToListInput
};


export type MutationRemoveCollabDiscussionThreadCommentReactionArgs = {
  reaction: RemoveDiscussionThreadCommentReactionInput
};


export type MutationRemoveCollabDiscussionThreadReactionArgs = {
  reaction: RemoveCollabDiscussionThreadReactionInput
};


export type MutationRemoveCollabPostCommentReactionArgs = {
  reaction: RemoveCollabPostCommentReactionInput
};


export type MutationRemoveCollabPostReactionArgs = {
  reaction: RemoveCollabPostReactionInput
};


export type MutationRemoveCollabTaskCommentReactionArgs = {
  reaction: RemoveCollabTaskCommentReactionInput
};


export type MutationRemoveMemberArgs = {
  collabId: Scalars['ID'],
  memberId: Scalars['ID']
};


export type MutationRequestToJoinArgs = {
  collabId: Scalars['ID']
};


export type MutationSignUpArgs = {
  credentials: SignUpArgs
};


export type MutationToggleAcceptInvitesArgs = {
  collabId: Scalars['ID']
};


export type MutationUpdateTaskListPositionArgs = {
  input: UpdateTaskListPositionInput
};


export type MutationUpdateTaskPositionArgs = {
  input: UpdateTaskPositionInput
};

export type Query = {
   __typename?: 'Query',
  collab?: Maybe<Collab>,
  collabPost?: Maybe<CollabPost>,
  collabPosts: CollabPostsPayload,
  collabPostsByStack: CollabPostsPayload,
  collabs: Array<Collab>,
  currentUser?: Maybe<CurrentUser>,
  languages: Array<Scalars['String']>,
  task?: Maybe<Task>,
  taskList?: Maybe<Array<TaskList>>,
  thread?: Maybe<CollabDiscussionThread>,
  user?: Maybe<User>,
  users: Array<User>,
};


export type QueryCollabArgs = {
  collabId: Scalars['ID']
};


export type QueryCollabPostArgs = {
  postId: Scalars['ID']
};


export type QueryCollabPostsArgs = {
  limit: Scalars['Int'],
  offset: Scalars['Int']
};


export type QueryCollabPostsByStackArgs = {
  limit: Scalars['Int'],
  offset: Scalars['Int'],
  stack: Scalars['String']
};


export type QueryTaskArgs = {
  taskId: Scalars['ID']
};


export type QueryTaskListArgs = {
  collabId: Scalars['ID']
};


export type QueryThreadArgs = {
  threadId: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type Reaction = {
   __typename?: 'Reaction',
  count: Scalars['Int'],
  emojiId: Scalars['ID'],
  isLiked: Scalars['Boolean'],
};

export type RemoveCollabDiscussionThreadReactionInput = {
  emojiId: Scalars['ID'],
  threadId: Scalars['ID'],
};

export type RemoveCollabPostCommentReactionInput = {
  commentId: Scalars['ID'],
  emojiId: Scalars['ID'],
};

export type RemoveCollabPostReactionInput = {
  emojiId: Scalars['ID'],
  postId: Scalars['ID'],
};

export type RemoveCollabTaskCommentReactionInput = {
  commentId: Scalars['ID'],
  emojiId: Scalars['ID'],
};

export type RemoveDiscussionThreadCommentReactionInput = {
  commentId: Scalars['ID'],
  emojiId: Scalars['ID'],
};

export type SignUpArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String'],
};

export type Task = {
   __typename?: 'Task',
  author: User,
  authorId: Scalars['ID'],
  comments: Array<TaskComment>,
  commentsCount: Scalars['Int'],
  description: Scalars['ID'],
  id: Scalars['ID'],
  order: Scalars['Int'],
  taskListId: Scalars['ID'],
};

export type TaskComment = {
   __typename?: 'TaskComment',
  author?: Maybe<User>,
  content: Scalars['String'],
  id: Scalars['ID'],
  reactions: Array<Reaction>,
  task?: Maybe<Task>,
};

export type TaskList = {
   __typename?: 'TaskList',
  collab?: Maybe<Collab>,
  id: Scalars['ID'],
  name: Scalars['String'],
  order: Scalars['Int'],
  tasks: Array<Task>,
};

export type UpdateTaskListPositionInput = {
  collabId: Scalars['ID'],
  newTaskListPosition: Scalars['Int'],
  oldTaskListPosition: Scalars['Int'],
};

export type UpdateTaskPositionInput = {
  newTaskPosition: Scalars['Int'],
  oldTaskPosition: Scalars['Int'],
  taskListId: Scalars['ID'],
};

export type User = {
   __typename?: 'User',
  avatar?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>,
  collabs: Array<Collab>,
  id: Scalars['ID'],
  username: Scalars['String'],
};

export type SignUpMutationVariables = {
  credentials: SignUpArgs
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  ) }
);

export type LoginMutationVariables = {
  credentials: LoginArgs
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  ) }
);

export type CreateCollabPostMutationVariables = {
  post: CollabPostArgs
};


export type CreateCollabPostMutation = (
  { __typename?: 'Mutation' }
  & { createCollabPost: (
    { __typename?: 'CollabPost' }
    & Pick<CollabPost, 'id'>
  ) }
);

export type AddCollabPostCommentMutationVariables = {
  content: Scalars['String'],
  postId: Scalars['ID']
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
  reaction: AddCollabPostReactionInput
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
  reaction: RemoveCollabPostReactionInput
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
  reaction: AddCollabPostCommentReactionInput
};


export type AddCollabPostCommentReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCollabPostCommentReaction'>
);

export type RemoveCollabPostCommentReactionMutationVariables = {
  reaction: RemoveCollabPostCommentReactionInput
};


export type RemoveCollabPostCommentReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCollabPostCommentReaction'>
);

export type AddCollabDiscussionThreadReactionMutationVariables = {
  reaction: AddCollabDiscussionThreadReactionInput
};


export type AddCollabDiscussionThreadReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCollabDiscussionThreadReaction'>
);

export type RemoveCollabDiscussionThreadReactionMutationVariables = {
  reaction: RemoveCollabDiscussionThreadReactionInput
};


export type RemoveCollabDiscussionThreadReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCollabDiscussionThreadReaction'>
);

export type AddDiscussionThreadCommentReactionMutationVariables = {
  reaction: AddDiscussionThreadCommentReactionInput
};


export type AddDiscussionThreadCommentReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCollabDiscussionThreadCommentReaction'>
);

export type RemoveDiscussionThreadCommentReactionMutationVariables = {
  reaction: RemoveDiscussionThreadCommentReactionInput
};


export type RemoveDiscussionThreadCommentReactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCollabDiscussionThreadCommentReaction'>
);

export type RequestToJoinMutationVariables = {
  collabId: Scalars['ID']
};


export type RequestToJoinMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'requestToJoin'>
);

export type CancelCollabRequestToJoinMutationVariables = {
  collabId: Scalars['ID']
};


export type CancelCollabRequestToJoinMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancelRequestToJoin'>
);

export type AcceptCollabInvitationMutationVariables = {
  collabId: Scalars['ID']
};


export type AcceptCollabInvitationMutation = (
  { __typename?: 'Mutation' }
  & { acceptCollabInvitation: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  ) }
);

export type DeclineCollabInvitationMutationVariables = {
  collabId: Scalars['ID']
};


export type DeclineCollabInvitationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'declineCollabInvitation'>
);

export type CreateTaskListMutationVariables = {
  input: CreateTaskListInput
};


export type CreateTaskListMutation = (
  { __typename?: 'Mutation' }
  & { createTaskList: (
    { __typename?: 'TaskList' }
    & Pick<TaskList, 'id'>
  ) }
);

export type UpdateTaskListPositionMutationVariables = {
  input: UpdateTaskListPositionInput
};


export type UpdateTaskListPositionMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskListPosition: (
    { __typename?: 'TaskList' }
    & Pick<TaskList, 'id'>
  ) }
);

export type DeleteTaskListMutationVariables = {
  taskListId: Scalars['ID']
};


export type DeleteTaskListMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTaskList'>
);

export type CreateTaskMutationVariables = {
  input: CreateTaskInput
};


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'taskListId' | 'description' | 'order' | 'commentsCount'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ) }
  ) }
);

export type DeleteTaskMutationVariables = {
  taskId: Scalars['ID']
};


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTask'>
);

export type MoveTaskToListMutationVariables = {
  input: MoveTaskToListInput
};


export type MoveTaskToListMutation = (
  { __typename?: 'Mutation' }
  & { moveTaskToList: (
    { __typename?: 'Task' }
    & Pick<Task, 'id'>
  ) }
);

export type UpdateTaskPositionMutationVariables = {
  input: UpdateTaskPositionInput
};


export type UpdateTaskPositionMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskPosition: (
    { __typename?: 'Task' }
    & Pick<Task, 'id'>
  ) }
);

export type CreateDiscussionThreadCommentMutationVariables = {
  input: CreateCollabDiscussionThreadCommentInput
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

export type GetCurrentUserQueryVariables = {};


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'username' | 'avatar' | 'email'>
  )> }
);

export type GetMyCollabsQueryVariables = {};


export type GetMyCollabsQuery = (
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

export type UserQueryVariables = {
  id: Scalars['ID']
};


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  )> }
);

export type CollabPostsQueryVariables = {
  offset: Scalars['Int'],
  limit: Scalars['Int']
};


export type CollabPostsQuery = (
  { __typename?: 'Query' }
  & { collabPosts: (
    { __typename?: 'CollabPostsPayload' }
    & Pick<CollabPostsPayload, 'hasNextPage'>
    & { posts: Array<(
      { __typename?: 'CollabPost' }
      & Pick<CollabPost, 'id' | 'title' | 'stack' | 'experience' | 'hasStarted' | 'languages' | 'createdAt' | 'isNew' | 'membersCount' | 'reactionsCount' | 'commentsCount'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  ) }
);

export type CollabPostsByStackQueryVariables = {
  stack: Scalars['String'],
  offset: Scalars['Int'],
  limit: Scalars['Int']
};


export type CollabPostsByStackQuery = (
  { __typename?: 'Query' }
  & { collabPostsByStack: (
    { __typename?: 'CollabPostsPayload' }
    & Pick<CollabPostsPayload, 'hasNextPage'>
    & { posts: Array<(
      { __typename?: 'CollabPost' }
      & Pick<CollabPost, 'id' | 'title' | 'stack' | 'experience' | 'hasStarted' | 'languages' | 'createdAt' | 'isNew' | 'membersCount' | 'reactionsCount' | 'commentsCount'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  ) }
);

export type GetCollabPostQueryVariables = {
  postId: Scalars['ID']
};


export type GetCollabPostQuery = (
  { __typename?: 'Query' }
  & { collabPost: Maybe<(
    { __typename?: 'CollabPost' }
    & Pick<CollabPost, 'id' | 'name' | 'title' | 'description' | 'isNew' | 'collabId' | 'experience' | 'stack' | 'hasStarted' | 'languages' | 'acceptsInvites' | 'isOwner' | 'isMember' | 'invitationPending' | 'requestToJoinPending' | 'createdAt'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
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
  postId: Scalars['ID']
};


export type CollabPostCommentsQuery = (
  { __typename?: 'Query' }
  & { collabPost: Maybe<(
    { __typename?: 'CollabPost' }
    & Pick<CollabPost, 'id'>
    & { comments: Array<(
      { __typename?: 'CollabPostComment' }
      & Pick<CollabPostComment, 'id' | 'content'>
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
  collabId: Scalars['ID']
};


export type CollabQuery = (
  { __typename?: 'Query' }
  & { collab: Maybe<(
    { __typename?: 'Collab' }
    & Pick<Collab, 'id' | 'name' | 'collabPostId' | 'acceptsInvites' | 'isOwner'>
    & { owner: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>, pendingInvites: Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>>, pendingRequests: Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>> }
  )> }
);

export type CollabMembersQueryVariables = {
  collabId: Scalars['ID']
};


export type CollabMembersQuery = (
  { __typename?: 'Query' }
  & { collab: Maybe<(
    { __typename?: 'Collab' }
    & Pick<Collab, 'id'>
    & { members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'bio' | 'avatar'>
    )> }
  )> }
);

export type CollabDiscussionThreadsQueryVariables = {
  collabId: Scalars['ID']
};


export type CollabDiscussionThreadsQuery = (
  { __typename?: 'Query' }
  & { collab: Maybe<(
    { __typename?: 'Collab' }
    & Pick<Collab, 'id'>
    & { discussionThreads: Array<(
      { __typename?: 'CollabDiscussionThread' }
      & Pick<CollabDiscussionThread, 'id' | 'title' | 'commentsCount' | 'reactionsCount'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  )> }
);

export type CollabThreadQueryVariables = {
  threadId: Scalars['ID']
};


export type CollabThreadQuery = (
  { __typename?: 'Query' }
  & { thread: Maybe<(
    { __typename?: 'CollabDiscussionThread' }
    & Pick<CollabDiscussionThread, 'id' | 'title' | 'content'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ), reactions: Array<(
      { __typename?: 'Reaction' }
      & Pick<Reaction, 'emojiId' | 'count' | 'isLiked'>
    )> }
  )> }
);

export type CollabThreadCommentsQueryVariables = {
  threadId: Scalars['ID']
};


export type CollabThreadCommentsQuery = (
  { __typename?: 'Query' }
  & { thread: Maybe<(
    { __typename?: 'CollabDiscussionThread' }
    & Pick<CollabDiscussionThread, 'id'>
    & { comments: Array<(
      { __typename?: 'CollabDiscussionThreadComment' }
      & Pick<CollabDiscussionThreadComment, 'id' | 'content'>
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
  collabId: Scalars['ID']
};


export type TaskListQuery = (
  { __typename?: 'Query' }
  & { taskList: Maybe<Array<(
    { __typename?: 'TaskList' }
    & Pick<TaskList, 'id' | 'name' | 'order'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'description' | 'order' | 'commentsCount'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ) }
    )> }
  )>> }
);

export type TaskCommentsQueryVariables = {
  taskId: Scalars['ID']
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
      )> }
    )> }
  )> }
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
  acceptCollabInvitation(collabId: $collabId) {
    id
    username
    avatar
  }
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
export const CreateTaskListDocument = gql`
    mutation CreateTaskList($input: CreateTaskListInput!) {
  createTaskList(input: $input) {
    id
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
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    id
    username
    avatar
    email
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
export const GetMyCollabsDocument = gql`
    query GetMyCollabs {
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
 * __useGetMyCollabsQuery__
 *
 * To run a query within a React component, call `useGetMyCollabsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCollabsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCollabsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyCollabsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyCollabsQuery, GetMyCollabsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMyCollabsQuery, GetMyCollabsQueryVariables>(GetMyCollabsDocument, baseOptions);
      }
export function useGetMyCollabsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyCollabsQuery, GetMyCollabsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMyCollabsQuery, GetMyCollabsQueryVariables>(GetMyCollabsDocument, baseOptions);
        }
export type GetMyCollabsQueryHookResult = ReturnType<typeof useGetMyCollabsQuery>;
export type GetMyCollabsLazyQueryHookResult = ReturnType<typeof useGetMyCollabsLazyQuery>;
export type GetMyCollabsQueryResult = ApolloReactCommon.QueryResult<GetMyCollabsQuery, GetMyCollabsQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
    id
    username
    avatar
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
export const CollabDiscussionThreadsDocument = gql`
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