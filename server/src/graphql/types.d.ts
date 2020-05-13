import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GQLCollab } from '../db/models/Collab';
import { GQLCollabDiscussionThreadComment } from '../db/models/CollabDiscussionThreadComment';
import { GQLCollabDiscussionThread } from '../db/models/CollabDiscussionThread';
import { GQLCollabPost } from '../db/models/CollabPost';
import { GQLCollabPostComment } from '../db/models/CollabPostComment';
import { GQLCollabTask } from '../db/models/CollabTask';
import { GQLCollabTaskComment } from '../db/models/CollabTaskComment';
import { GQLCollabTaskList } from '../db/models/CollabTaskList';
import { GQLUser } from '../db/models/User';
import { GQLPrivateMessage } from '../db/models/PrivateMessage';
import { CollabContext, CollabContextWithUser } from './context/CollabContext';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Query = {
   __typename?: 'Query';
  advancedPostsSearch: CollabPostsSearchResultsPaload;
  collab?: Maybe<Collab>;
  collabPost?: Maybe<CollabPost>;
  collabPosts: CollabPostsPayload;
  collabPostsByStack: CollabPostsSearchResultsPaload;
  collabs: Array<Collab>;
  currentUser?: Maybe<CurrentUser>;
  getConversation: GetConversationPayload;
  languages: Array<Scalars['String']>;
  searchPostsByTitle: CollabPostsSearchResultsPaload;
  task?: Maybe<Task>;
  taskList?: Maybe<Array<TaskList>>;
  thread?: Maybe<CollabDiscussionThread>;
  user?: Maybe<User>;
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


export type QueryGetConversationArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  userId: Scalars['ID'];
};


export type QuerySearchPostsByTitleArgs = {
  input: SearchPostsInput;
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
  acceptCollabInvitation: User;
  acceptFriendRequest: User;
  acceptMemberRequest: Collab;
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
  declineCollabInvitation: Scalars['Boolean'];
  /** returns the id of the declined friend */
  declineFriendRequest: Scalars['ID'];
  declineMemberRequest: Scalars['Boolean'];
  deleteCollab: Scalars['Boolean'];
  deleteCollabDiscussionThread: Scalars['Boolean'];
  deleteCollabDiscussionThreadComment: Scalars['Boolean'];
  deleteCollabPost: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  deletePrivateMessage: Scalars['ID'];
  deleteTask: Scalars['Boolean'];
  deleteTaskComment: Scalars['Boolean'];
  deleteTaskList: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  inviteMember: User;
  login: AuthPayload;
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


export type MutationInviteMemberArgs = {
  collabId: Scalars['ID'];
  memberId: Scalars['ID'];
};


export type MutationLoginArgs = {
  credentials: LoginArgs;
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
  input?: Maybe<UpdateUserInfoInput>;
};

export type Collab = {
   __typename?: 'Collab';
  acceptsInvites: Scalars['Boolean'];
  collabPostId?: Maybe<Scalars['ID']>;
  discussionThreads: Array<CollabDiscussionThread>;
  frontPagePost?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  invitationPending: Scalars['Boolean'];
  isMember: Scalars['Boolean'];
  isOwner: Scalars['Boolean'];
  members: Array<User>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  pendingInvites: Array<Maybe<User>>;
  pendingRequests: Array<Maybe<User>>;
  requestToJoinPending: Scalars['Boolean'];
  taskList: Array<TaskList>;
};

export type CollabDiscussionThreadComment = {
   __typename?: 'CollabDiscussionThreadComment';
  author: User;
  collab?: Maybe<Collab>;
  content: Scalars['String'];
  id: Scalars['ID'];
  reactions: Array<Reaction>;
  thread?: Maybe<CollabDiscussionThread>;
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

export type CollabDiscussionThread = {
   __typename?: 'CollabDiscussionThread';
  author: User;
  collab?: Maybe<Collab>;
  comments: Array<CollabDiscussionThreadComment>;
  commentsCount: Scalars['Int'];
  content: Scalars['String'];
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

export type AdvancedPostsSearchInput = {
  experience?: Maybe<Experience>;
  hasStarted?: Maybe<Scalars['Boolean']>;
  isNew?: Maybe<Scalars['Boolean']>;
  languages?: Maybe<Array<Scalars['String']>>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  stack?: Maybe<Array<Scalars['String']>>;
};

export type CollabPostsSearchResultsPaload = {
   __typename?: 'CollabPostsSearchResultsPaload';
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
  createdAt: Scalars['String'];
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
  id: Scalars['ID'];
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

export type Subscription = {
   __typename?: 'Subscription';
  friendStatusChange: ChatUsersPayload;
  newPrivateChatMessage: PrivateChatMessage;
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
  author?: Maybe<User>;
  content: Scalars['String'];
  creationDate: Scalars['Date'];
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  recipient?: Maybe<User>;
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
  assignedBy?: Maybe<User>;
  assignee?: Maybe<User>;
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
  assigneeId?: Maybe<Scalars['ID']>;
  description: Scalars['String'];
  taskId: Scalars['ID'];
};

export type CreateTaskInput = {
  assigneeId?: Maybe<Scalars['ID']>;
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
  author?: Maybe<User>;
  content: Scalars['String'];
  id: Scalars['ID'];
  reactions: Array<Reaction>;
  task?: Maybe<Task>;
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

export type TaskList = {
   __typename?: 'TaskList';
  collab?: Maybe<Collab>;
  id: Scalars['ID'];
  name: Scalars['String'];
  order: Scalars['Int'];
  tasks: Array<Task>;
};

export type CurrentUser = {
   __typename?: 'CurrentUser';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  collabInvites: Array<Collab>;
  collabRequests: Array<CollabRequest>;
  collabs: Array<Collab>;
  conversationsPreview: Array<PrivateMessagePreview>;
  country?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  friendRequests: Array<User>;
  friendRequestsCount: Scalars['Int'];
  friends: Array<User>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  tasks: Array<Task>;
  /** the user's engineering title */
  title?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type User = {
   __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  canRequestFriendship: Scalars['Boolean'];
  collabs: Array<Collab>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isFriend: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  /** the user's engineering title */
  title?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UpdateUserInfoInput = {
  bio?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type CollabRequest = {
   __typename?: 'CollabRequest';
  collab: Collab;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mutation: ResolverTypeWrapper<{}>,
  Collab: ResolverTypeWrapper<GQLCollab>,
  CollabDiscussionThreadComment: ResolverTypeWrapper<GQLCollabDiscussionThreadComment>,
  CreateCollabDiscussionThreadCommentInput: CreateCollabDiscussionThreadCommentInput,
  AddDiscussionThreadCommentReactionInput: AddDiscussionThreadCommentReactionInput,
  RemoveDiscussionThreadCommentReactionInput: RemoveDiscussionThreadCommentReactionInput,
  AddCollabDiscussionThreadReactionInput: AddCollabDiscussionThreadReactionInput,
  RemoveCollabDiscussionThreadReactionInput: RemoveCollabDiscussionThreadReactionInput,
  CollabDiscussionThread: ResolverTypeWrapper<GQLCollabDiscussionThread>,
  CreateThreadArgs: CreateThreadArgs,
  AdvancedPostsSearchInput: AdvancedPostsSearchInput,
  CollabPostsSearchResultsPaload: ResolverTypeWrapper<Omit<CollabPostsSearchResultsPaload, 'posts'> & { posts: Array<ResolversTypes['CollabPost']> }>,
  SearchPostsInput: SearchPostsInput,
  SearchPostsPayload: ResolverTypeWrapper<Omit<SearchPostsPayload, 'posts'> & { posts: Array<ResolversTypes['CollabPost']> }>,
  CollabPost: ResolverTypeWrapper<GQLCollabPost>,
  CollabPostsPayload: ResolverTypeWrapper<Omit<CollabPostsPayload, 'posts'> & { posts: Array<ResolversTypes['CollabPost']> }>,
  CollabPostArgs: CollabPostArgs,
  Experience: Experience,
  CollabPostComment: ResolverTypeWrapper<GQLCollabPostComment>,
  AddCollabPostCommentReactionInput: AddCollabPostCommentReactionInput,
  RemoveCollabPostCommentReactionInput: RemoveCollabPostCommentReactionInput,
  AddCollabPostReactionInput: AddCollabPostReactionInput,
  RemoveCollabPostReactionInput: RemoveCollabPostReactionInput,
  AddCollabTaskCommentReactionInput: AddCollabTaskCommentReactionInput,
  RemoveCollabTaskCommentReactionInput: RemoveCollabTaskCommentReactionInput,
  Subscription: ResolverTypeWrapper<{}>,
  UserChatStatus: UserChatStatus,
  ConnectToChatPayload: ResolverTypeWrapper<Omit<ConnectToChatPayload, 'users'> & { users: Array<ResolversTypes['ChatUsersPayload']> }>,
  ChatUsersPayload: ResolverTypeWrapper<Omit<ChatUsersPayload, 'user'> & { user: ResolversTypes['User'] }>,
  PrivateChatMessage: ResolverTypeWrapper<PrivateChatMessage>,
  SendPrivateChatMessageInput: SendPrivateChatMessageInput,
  PrivateMessage: ResolverTypeWrapper<GQLPrivateMessage>,
  PrivateMessagePreview: ResolverTypeWrapper<PrivateMessagePreview>,
  GetConversationPayload: ResolverTypeWrapper<Omit<GetConversationPayload, 'messages'> & { messages: Array<ResolversTypes['PrivateMessage']> }>,
  SendPrivateMessageInput: SendPrivateMessageInput,
  Reaction: ResolverTypeWrapper<Reaction>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Task: ResolverTypeWrapper<GQLCollabTask>,
  UpdateTaskInput: UpdateTaskInput,
  CreateTaskInput: CreateTaskInput,
  UpdateTaskAssigneeInput: UpdateTaskAssigneeInput,
  UpdateTaskPositionInput: UpdateTaskPositionInput,
  MoveTaskToListInput: MoveTaskToListInput,
  TaskComment: ResolverTypeWrapper<GQLCollabTaskComment>,
  CreateTaskCommentInput: CreateTaskCommentInput,
  CreateTaskListInput: CreateTaskListInput,
  UpdateTaskListNameInput: UpdateTaskListNameInput,
  UpdateTaskListPositionInput: UpdateTaskListPositionInput,
  TaskList: ResolverTypeWrapper<GQLCollabTaskList>,
  CurrentUser: ResolverTypeWrapper<Omit<CurrentUser, 'collabInvites' | 'collabRequests' | 'collabs' | 'friendRequests' | 'friends' | 'tasks'> & { collabInvites: Array<ResolversTypes['Collab']>, collabRequests: Array<ResolversTypes['CollabRequest']>, collabs: Array<ResolversTypes['Collab']>, friendRequests: Array<ResolversTypes['User']>, friends: Array<ResolversTypes['User']>, tasks: Array<ResolversTypes['Task']> }>,
  User: ResolverTypeWrapper<GQLUser>,
  UpdateUserInfoInput: UpdateUserInfoInput,
  CollabRequest: ResolverTypeWrapper<Omit<CollabRequest, 'collab' | 'member'> & { collab: ResolversTypes['Collab'], member: ResolversTypes['User'] }>,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  SignUpArgs: SignUpArgs,
  LoginArgs: LoginArgs,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Query: {},
  ID: Scalars['ID'],
  Int: Scalars['Int'],
  Mutation: {},
  Collab: GQLCollab,
  CollabDiscussionThreadComment: GQLCollabDiscussionThreadComment,
  CreateCollabDiscussionThreadCommentInput: CreateCollabDiscussionThreadCommentInput,
  AddDiscussionThreadCommentReactionInput: AddDiscussionThreadCommentReactionInput,
  RemoveDiscussionThreadCommentReactionInput: RemoveDiscussionThreadCommentReactionInput,
  AddCollabDiscussionThreadReactionInput: AddCollabDiscussionThreadReactionInput,
  RemoveCollabDiscussionThreadReactionInput: RemoveCollabDiscussionThreadReactionInput,
  CollabDiscussionThread: GQLCollabDiscussionThread,
  CreateThreadArgs: CreateThreadArgs,
  AdvancedPostsSearchInput: AdvancedPostsSearchInput,
  CollabPostsSearchResultsPaload: Omit<CollabPostsSearchResultsPaload, 'posts'> & { posts: Array<ResolversParentTypes['CollabPost']> },
  SearchPostsInput: SearchPostsInput,
  SearchPostsPayload: Omit<SearchPostsPayload, 'posts'> & { posts: Array<ResolversParentTypes['CollabPost']> },
  CollabPost: GQLCollabPost,
  CollabPostsPayload: Omit<CollabPostsPayload, 'posts'> & { posts: Array<ResolversParentTypes['CollabPost']> },
  CollabPostArgs: CollabPostArgs,
  Experience: Experience,
  CollabPostComment: GQLCollabPostComment,
  AddCollabPostCommentReactionInput: AddCollabPostCommentReactionInput,
  RemoveCollabPostCommentReactionInput: RemoveCollabPostCommentReactionInput,
  AddCollabPostReactionInput: AddCollabPostReactionInput,
  RemoveCollabPostReactionInput: RemoveCollabPostReactionInput,
  AddCollabTaskCommentReactionInput: AddCollabTaskCommentReactionInput,
  RemoveCollabTaskCommentReactionInput: RemoveCollabTaskCommentReactionInput,
  Subscription: {},
  UserChatStatus: UserChatStatus,
  ConnectToChatPayload: Omit<ConnectToChatPayload, 'users'> & { users: Array<ResolversParentTypes['ChatUsersPayload']> },
  ChatUsersPayload: Omit<ChatUsersPayload, 'user'> & { user: ResolversParentTypes['User'] },
  PrivateChatMessage: PrivateChatMessage,
  SendPrivateChatMessageInput: SendPrivateChatMessageInput,
  PrivateMessage: GQLPrivateMessage,
  PrivateMessagePreview: PrivateMessagePreview,
  GetConversationPayload: Omit<GetConversationPayload, 'messages'> & { messages: Array<ResolversParentTypes['PrivateMessage']> },
  SendPrivateMessageInput: SendPrivateMessageInput,
  Reaction: Reaction,
  Date: Scalars['Date'],
  Task: GQLCollabTask,
  UpdateTaskInput: UpdateTaskInput,
  CreateTaskInput: CreateTaskInput,
  UpdateTaskAssigneeInput: UpdateTaskAssigneeInput,
  UpdateTaskPositionInput: UpdateTaskPositionInput,
  MoveTaskToListInput: MoveTaskToListInput,
  TaskComment: GQLCollabTaskComment,
  CreateTaskCommentInput: CreateTaskCommentInput,
  CreateTaskListInput: CreateTaskListInput,
  UpdateTaskListNameInput: UpdateTaskListNameInput,
  UpdateTaskListPositionInput: UpdateTaskListPositionInput,
  TaskList: GQLCollabTaskList,
  CurrentUser: Omit<CurrentUser, 'collabInvites' | 'collabRequests' | 'collabs' | 'friendRequests' | 'friends' | 'tasks'> & { collabInvites: Array<ResolversParentTypes['Collab']>, collabRequests: Array<ResolversParentTypes['CollabRequest']>, collabs: Array<ResolversParentTypes['Collab']>, friendRequests: Array<ResolversParentTypes['User']>, friends: Array<ResolversParentTypes['User']>, tasks: Array<ResolversParentTypes['Task']> },
  User: GQLUser,
  UpdateUserInfoInput: UpdateUserInfoInput,
  CollabRequest: Omit<CollabRequest, 'collab' | 'member'> & { collab: ResolversParentTypes['Collab'], member: ResolversParentTypes['User'] },
  AuthPayload: AuthPayload,
  SignUpArgs: SignUpArgs,
  LoginArgs: LoginArgs,
}>;

export type QueryResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  advancedPostsSearch?: Resolver<ResolversTypes['CollabPostsSearchResultsPaload'], ParentType, ContextType, RequireFields<QueryAdvancedPostsSearchArgs, 'input'>>,
  collab?: Resolver<Maybe<ResolversTypes['Collab']>, ParentType, ContextType, RequireFields<QueryCollabArgs, 'collabId'>>,
  collabPost?: Resolver<Maybe<ResolversTypes['CollabPost']>, ParentType, ContextType, RequireFields<QueryCollabPostArgs, 'postId'>>,
  collabPosts?: Resolver<ResolversTypes['CollabPostsPayload'], ParentType, ContextType, RequireFields<QueryCollabPostsArgs, 'limit' | 'offset'>>,
  collabPostsByStack?: Resolver<ResolversTypes['CollabPostsSearchResultsPaload'], ParentType, ContextType, RequireFields<QueryCollabPostsByStackArgs, 'limit' | 'offset' | 'stack'>>,
  collabs?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  currentUser?: Resolver<Maybe<ResolversTypes['CurrentUser']>, ParentType, ContextType>,
  getConversation?: Resolver<ResolversTypes['GetConversationPayload'], ParentType, ContextType, RequireFields<QueryGetConversationArgs, 'limit' | 'offset' | 'userId'>>,
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  searchPostsByTitle?: Resolver<ResolversTypes['CollabPostsSearchResultsPaload'], ParentType, ContextType, RequireFields<QuerySearchPostsByTitleArgs, 'input'>>,
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'taskId'>>,
  taskList?: Resolver<Maybe<Array<ResolversTypes['TaskList']>>, ParentType, ContextType, RequireFields<QueryTaskListArgs, 'collabId'>>,
  thread?: Resolver<Maybe<ResolversTypes['CollabDiscussionThread']>, ParentType, ContextType, RequireFields<QueryThreadArgs, 'threadId'>>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  acceptCollabInvitation?: Resolver<ResolversTypes['User'], ParentType, CollabContextWithUser, RequireFields<MutationAcceptCollabInvitationArgs, 'collabId'>>,
  acceptFriendRequest?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAcceptFriendRequestArgs, 'friendId'>>,
  acceptMemberRequest?: Resolver<ResolversTypes['Collab'], ParentType, CollabContextWithUser, RequireFields<MutationAcceptMemberRequestArgs, 'collabId' | 'memberId'>>,
  addCollabDiscussionThreadCommentReaction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddCollabDiscussionThreadCommentReactionArgs, 'reaction'>>,
  addCollabDiscussionThreadReaction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddCollabDiscussionThreadReactionArgs, 'reaction'>>,
  addCollabPostCommentReaction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddCollabPostCommentReactionArgs, 'reaction'>>,
  addCollabPostReaction?: Resolver<ResolversTypes['CollabPost'], ParentType, ContextType, RequireFields<MutationAddCollabPostReactionArgs, 'reaction'>>,
  addCollabTaskCommentReaction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddCollabTaskCommentReactionArgs, 'reaction'>>,
  cancelRequestToJoin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCancelRequestToJoinArgs, 'collabId'>>,
  connectToChat?: Resolver<ResolversTypes['ConnectToChatPayload'], ParentType, ContextType, RequireFields<MutationConnectToChatArgs, 'status'>>,
  createCollabDiscussionThread?: Resolver<ResolversTypes['CollabDiscussionThread'], ParentType, ContextType, RequireFields<MutationCreateCollabDiscussionThreadArgs, 'thread'>>,
  createCollabDiscussionThreadComment?: Resolver<ResolversTypes['CollabDiscussionThreadComment'], ParentType, ContextType, RequireFields<MutationCreateCollabDiscussionThreadCommentArgs, 'input'>>,
  createCollabPost?: Resolver<ResolversTypes['CollabPost'], ParentType, ContextType, RequireFields<MutationCreateCollabPostArgs, 'post'>>,
  createComment?: Resolver<ResolversTypes['CollabPostComment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'content' | 'postId'>>,
  createTask?: Resolver<ResolversTypes['Task'], ParentType, CollabContextWithUser, RequireFields<MutationCreateTaskArgs, 'input'>>,
  createTaskComment?: Resolver<ResolversTypes['TaskComment'], ParentType, CollabContextWithUser, RequireFields<MutationCreateTaskCommentArgs, 'input'>>,
  createTaskList?: Resolver<ResolversTypes['TaskList'], ParentType, CollabContextWithUser, RequireFields<MutationCreateTaskListArgs, 'input'>>,
  declineCollabInvitation?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeclineCollabInvitationArgs, 'collabId'>>,
  declineFriendRequest?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeclineFriendRequestArgs, 'senderId'>>,
  declineMemberRequest?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeclineMemberRequestArgs, 'collabId' | 'memberId'>>,
  deleteCollab?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteCollabArgs, 'collabId'>>,
  deleteCollabDiscussionThread?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCollabDiscussionThreadArgs, 'threadId'>>,
  deleteCollabDiscussionThreadComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCollabDiscussionThreadCommentArgs, 'commentId'>>,
  deleteCollabPost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCollabPostArgs, 'postId'>>,
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteCommentArgs, 'commentId'>>,
  deletePrivateMessage?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeletePrivateMessageArgs, 'messageId'>>,
  deleteTask?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteTaskArgs, 'taskId'>>,
  deleteTaskComment?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteTaskCommentArgs, 'commentId'>>,
  deleteTaskList?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteTaskListArgs, 'taskListId'>>,
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser>,
  inviteMember?: Resolver<ResolversTypes['User'], ParentType, CollabContextWithUser, RequireFields<MutationInviteMemberArgs, 'collabId' | 'memberId'>>,
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'credentials'>>,
  markPrivateMessageAsRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMarkPrivateMessageAsReadArgs, 'messageId'>>,
  moveTaskToList?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationMoveTaskToListArgs, 'input'>>,
  removeCollabDiscussionThreadCommentReaction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveCollabDiscussionThreadCommentReactionArgs, 'reaction'>>,
  removeCollabDiscussionThreadReaction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveCollabDiscussionThreadReactionArgs, 'reaction'>>,
  removeCollabPostCommentReaction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveCollabPostCommentReactionArgs, 'reaction'>>,
  removeCollabPostReaction?: Resolver<ResolversTypes['CollabPost'], ParentType, ContextType, RequireFields<MutationRemoveCollabPostReactionArgs, 'reaction'>>,
  removeCollabTaskCommentReaction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveCollabTaskCommentReactionArgs, 'reaction'>>,
  removeFriend?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationRemoveFriendArgs, 'friendId'>>,
  removeMember?: Resolver<ResolversTypes['Collab'], ParentType, CollabContextWithUser, RequireFields<MutationRemoveMemberArgs, 'collabId' | 'memberId'>>,
  requestToJoin?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationRequestToJoinArgs, 'collabId'>>,
  sendFriendRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSendFriendRequestArgs, 'friendId'>>,
  sendPrivateChatMessage?: Resolver<ResolversTypes['PrivateChatMessage'], ParentType, ContextType, RequireFields<MutationSendPrivateChatMessageArgs, 'input'>>,
  sendPrivateMessage?: Resolver<ResolversTypes['PrivateMessage'], ParentType, ContextType, RequireFields<MutationSendPrivateMessageArgs, 'input'>>,
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'credentials'>>,
  toggleAcceptInvites?: Resolver<ResolversTypes['Collab'], ParentType, CollabContextWithUser, RequireFields<MutationToggleAcceptInvitesArgs, 'collabId'>>,
  updateStatus?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateStatusArgs, 'status'>>,
  updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'input'>>,
  updateTaskAssignee?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskAssigneeArgs, 'input'>>,
  updateTaskListName?: Resolver<ResolversTypes['TaskList'], ParentType, ContextType, RequireFields<MutationUpdateTaskListNameArgs, 'input'>>,
  updateTaskListPosition?: Resolver<ResolversTypes['TaskList'], ParentType, ContextType, RequireFields<MutationUpdateTaskListPositionArgs, 'input'>>,
  updateTaskPosition?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskPositionArgs, 'input'>>,
  updateUserInfo?: Resolver<ResolversTypes['CurrentUser'], ParentType, ContextType, RequireFields<MutationUpdateUserInfoArgs, never>>,
}>;

export type CollabResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Collab'] = ResolversParentTypes['Collab']> = ResolversObject<{
  acceptsInvites?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  collabPostId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  discussionThreads?: Resolver<Array<ResolversTypes['CollabDiscussionThread']>, ParentType, ContextType>,
  frontPagePost?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  invitationPending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  isMember?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  isOwner?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  pendingInvites?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  pendingRequests?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  requestToJoinPending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  taskList?: Resolver<Array<ResolversTypes['TaskList']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabDiscussionThreadCommentResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabDiscussionThreadComment'] = ResolversParentTypes['CollabDiscussionThreadComment']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  collab?: Resolver<Maybe<ResolversTypes['Collab']>, ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  reactions?: Resolver<Array<ResolversTypes['Reaction']>, ParentType, ContextType>,
  thread?: Resolver<Maybe<ResolversTypes['CollabDiscussionThread']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabDiscussionThreadResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabDiscussionThread'] = ResolversParentTypes['CollabDiscussionThread']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  collab?: Resolver<Maybe<ResolversTypes['Collab']>, ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['CollabDiscussionThreadComment']>, ParentType, ContextType>,
  commentsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  reactions?: Resolver<Array<ResolversTypes['Reaction']>, ParentType, ContextType>,
  reactionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabPostsSearchResultsPaloadResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabPostsSearchResultsPaload'] = ResolversParentTypes['CollabPostsSearchResultsPaload']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  posts?: Resolver<Array<ResolversTypes['CollabPost']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type SearchPostsPayloadResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['SearchPostsPayload'] = ResolversParentTypes['SearchPostsPayload']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  posts?: Resolver<Array<ResolversTypes['CollabPost']>, ParentType, ContextType>,
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabPostResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabPost'] = ResolversParentTypes['CollabPost']> = ResolversObject<{
  acceptsInvites?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  collabId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['CollabPostComment']>, ParentType, ContextType>,
  commentsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  experience?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hasStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  invitationPending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  isMember?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  isNew?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  isOwner?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  membersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  pendingInvites?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  pendingRequests?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  reactions?: Resolver<Array<ResolversTypes['Reaction']>, ParentType, ContextType>,
  reactionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  requestToJoinPending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  stack?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabPostsPayloadResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabPostsPayload'] = ResolversParentTypes['CollabPostsPayload']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  posts?: Resolver<Array<ResolversTypes['CollabPost']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabPostCommentResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabPostComment'] = ResolversParentTypes['CollabPostComment']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  reactions?: Resolver<Array<ResolversTypes['Reaction']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type SubscriptionResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  friendStatusChange?: SubscriptionResolver<ResolversTypes['ChatUsersPayload'], "friendStatusChange", ParentType, ContextType>,
  newPrivateChatMessage?: SubscriptionResolver<ResolversTypes['PrivateChatMessage'], "newPrivateChatMessage", ParentType, ContextType>,
}>;

export type ConnectToChatPayloadResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['ConnectToChatPayload'] = ResolversParentTypes['ConnectToChatPayload']> = ResolversObject<{
  users?: Resolver<Array<ResolversTypes['ChatUsersPayload']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type ChatUsersPayloadResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['ChatUsersPayload'] = ResolversParentTypes['ChatUsersPayload']> = ResolversObject<{
  status?: Resolver<ResolversTypes['UserChatStatus'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PrivateChatMessageResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['PrivateChatMessage'] = ResolversParentTypes['PrivateChatMessage']> = ResolversObject<{
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  creationDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PrivateMessageResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['PrivateMessage'] = ResolversParentTypes['PrivateMessage']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  creationDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  isRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  recipient?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type PrivateMessagePreviewResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['PrivateMessagePreview'] = ResolversParentTypes['PrivateMessagePreview']> = ResolversObject<{
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type GetConversationPayloadResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['GetConversationPayload'] = ResolversParentTypes['GetConversationPayload']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  messages?: Resolver<Array<ResolversTypes['PrivateMessage']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type ReactionResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  emojiId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  isLiked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type TaskResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = ResolversObject<{
  assignedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  assignee?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  collab?: Resolver<ResolversTypes['Collab'], ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['TaskComment']>, ParentType, ContextType>,
  commentsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  taskListId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TaskCommentResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['TaskComment'] = ResolversParentTypes['TaskComment']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  reactions?: Resolver<Array<ResolversTypes['Reaction']>, ParentType, ContextType>,
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TaskListResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['TaskList'] = ResolversParentTypes['TaskList']> = ResolversObject<{
  collab?: Resolver<Maybe<ResolversTypes['Collab']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CurrentUserResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CurrentUser'] = ResolversParentTypes['CurrentUser']> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  collabInvites?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  collabRequests?: Resolver<Array<ResolversTypes['CollabRequest']>, ParentType, ContextType>,
  collabs?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  conversationsPreview?: Resolver<Array<ResolversTypes['PrivateMessagePreview']>, ParentType, ContextType>,
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  friendRequests?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  friendRequestsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  friends?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UserResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  canRequestFriendship?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  collabs?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  isFriend?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabRequestResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabRequest'] = ResolversParentTypes['CollabRequest']> = ResolversObject<{
  collab?: Resolver<ResolversTypes['Collab'], ParentType, ContextType>,
  member?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type AuthPayloadResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = CollabContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Collab?: CollabResolvers<ContextType>,
  CollabDiscussionThreadComment?: CollabDiscussionThreadCommentResolvers<ContextType>,
  CollabDiscussionThread?: CollabDiscussionThreadResolvers<ContextType>,
  CollabPostsSearchResultsPaload?: CollabPostsSearchResultsPaloadResolvers<ContextType>,
  SearchPostsPayload?: SearchPostsPayloadResolvers<ContextType>,
  CollabPost?: CollabPostResolvers<ContextType>,
  CollabPostsPayload?: CollabPostsPayloadResolvers<ContextType>,
  CollabPostComment?: CollabPostCommentResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  ConnectToChatPayload?: ConnectToChatPayloadResolvers<ContextType>,
  ChatUsersPayload?: ChatUsersPayloadResolvers<ContextType>,
  PrivateChatMessage?: PrivateChatMessageResolvers<ContextType>,
  PrivateMessage?: PrivateMessageResolvers<ContextType>,
  PrivateMessagePreview?: PrivateMessagePreviewResolvers<ContextType>,
  GetConversationPayload?: GetConversationPayloadResolvers<ContextType>,
  Reaction?: ReactionResolvers<ContextType>,
  Date?: GraphQLScalarType,
  Task?: TaskResolvers<ContextType>,
  TaskComment?: TaskCommentResolvers<ContextType>,
  TaskList?: TaskListResolvers<ContextType>,
  CurrentUser?: CurrentUserResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  CollabRequest?: CollabRequestResolvers<ContextType>,
  AuthPayload?: AuthPayloadResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = CollabContext> = Resolvers<ContextType>;
