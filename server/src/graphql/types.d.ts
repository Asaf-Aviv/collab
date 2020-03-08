import { GraphQLResolveInfo } from 'graphql';
import { GQLCollab } from '../db/models/Collab';
import { GQLCollabDiscussionThreadComment } from '../db/models/CollabDiscussionThreadComment';
import { GQLCollabDiscussionThread } from '../db/models/CollabDiscussionThread';
import { GQLCollabPost } from '../db/models/CollabPost';
import { GQLCollabPostComment } from '../db/models/CollabPostComment';
import { GQLCollabTask } from '../db/models/CollabTask';
import { GQLCollabTaskComment } from '../db/models/CollabTaskComment';
import { GQLCollabTaskList } from '../db/models/CollabTaskList';
import { GQLUser } from '../db/models/User';
import { CollabContext, CollabContextWithUser } from './context/CollabContext';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
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
  members: Array<Maybe<User>>,
  name: Scalars['String'],
  owner?: Maybe<User>,
  pendingInvites: Array<Maybe<User>>,
  pendingRequests: Array<Maybe<User>>,
  requestToJoinPending: Scalars['Boolean'],
  taskList: Array<TaskList>,
};

export type CollabDiscussionThread = {
   __typename?: 'CollabDiscussionThread',
  author?: Maybe<User>,
  collab?: Maybe<Collab>,
  comments: Array<CollabDiscussionThreadComment>,
  id: Scalars['ID'],
  title: Scalars['String'],
};

export type CollabDiscussionThreadComment = {
   __typename?: 'CollabDiscussionThreadComment',
  author?: Maybe<User>,
  collab?: Maybe<Collab>,
  content: Scalars['String'],
  id: Scalars['ID'],
  thread?: Maybe<CollabDiscussionThread>,
};

export type CollabPost = {
   __typename?: 'CollabPost',
  acceptsInvites: Scalars['Boolean'],
  collabId: Scalars['ID'],
  comments: Array<CollabPostComment>,
  description: Scalars['String'],
  experience: Scalars['String'],
  hasStarted: Scalars['Boolean'],
  id: Scalars['ID'],
  invitationPending: Scalars['Boolean'],
  isMember: Scalars['Boolean'],
  isOwner: Scalars['Boolean'],
  members: Array<User>,
  name: Scalars['String'],
  owner: User,
  pendingInvites: Array<User>,
  pendingRequests: Array<User>,
  requestToJoinPending: Scalars['Boolean'],
  stack: Array<Scalars['String']>,
  title: Scalars['String'],
};

export type CollabPostArgs = {
  description: Scalars['String'],
  experience: Experience,
  hasStarted: Scalars['Boolean'],
  name: Scalars['String'],
  stack: Array<Scalars['String']>,
  title: Scalars['String'],
};

export type CollabPostComment = {
   __typename?: 'CollabPostComment',
  author?: Maybe<User>,
  content: Scalars['String'],
  id: Scalars['ID'],
};

export type CollabRequest = {
   __typename?: 'CollabRequest',
  collab: Collab,
  member: User,
};

export type CurrentUser = {
   __typename?: 'CurrentUser',
  avatar?: Maybe<Scalars['String']>,
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

export type Mutation = {
   __typename?: 'Mutation',
  acceptCollabInvitation: User,
  acceptMemberRequest: Collab,
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
  removeMember: Collab,
  requestToJoin: Scalars['Boolean'],
  signUp: AuthPayload,
  toggleAcceptInvites: Collab,
};


export type MutationAcceptCollabInvitationArgs = {
  collabId: Scalars['ID']
};


export type MutationAcceptMemberRequestArgs = {
  collabId: Scalars['ID'],
  memberId: Scalars['ID']
};


export type MutationCancelRequestToJoinArgs = {
  collabId: Scalars['ID']
};


export type MutationCreateCollabDiscussionThreadArgs = {
  collabId: Scalars['ID'],
  title: Scalars['String']
};


export type MutationCreateCollabDiscussionThreadCommentArgs = {
  collabId: Scalars['String'],
  content: Scalars['String'],
  threadId: Scalars['ID']
};


export type MutationCreateCollabPostArgs = {
  post: CollabPostArgs
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'],
  postId: Scalars['ID']
};


export type MutationCreateTaskArgs = {
  collabId: Scalars['ID'],
  description: Scalars['String'],
  taskListId: Scalars['ID']
};


export type MutationCreateTaskCommentArgs = {
  collabId: Scalars['ID'],
  content: Scalars['String'],
  taskId: Scalars['ID']
};


export type MutationCreateTaskListArgs = {
  collabId: Scalars['ID'],
  name: Scalars['String'],
  order: Scalars['Int']
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

export type Query = {
   __typename?: 'Query',
  collab?: Maybe<Collab>,
  collabPost?: Maybe<CollabPost>,
  collabPosts: Array<CollabPost>,
  collabs: Array<Collab>,
  currentUser?: Maybe<CurrentUser>,
  user?: Maybe<User>,
  users: Array<User>,
};


export type QueryCollabArgs = {
  collabId: Scalars['ID']
};


export type QueryCollabPostArgs = {
  postId: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
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
  description: Scalars['ID'],
  id: Scalars['ID'],
};

export type TaskComment = {
   __typename?: 'TaskComment',
  author?: Maybe<User>,
  content: Scalars['String'],
  id: Scalars['ID'],
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

export type User = {
   __typename?: 'User',
  avatar?: Maybe<Scalars['String']>,
  collabs: Array<Collab>,
  id: Scalars['ID'],
  username: Scalars['String'],
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

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
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Collab: ResolverTypeWrapper<GQLCollab>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  CollabDiscussionThread: ResolverTypeWrapper<GQLCollabDiscussionThread>,
  User: ResolverTypeWrapper<GQLUser>,
  String: ResolverTypeWrapper<Scalars['String']>,
  CollabDiscussionThreadComment: ResolverTypeWrapper<GQLCollabDiscussionThreadComment>,
  TaskList: ResolverTypeWrapper<GQLCollabTaskList>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Task: ResolverTypeWrapper<GQLCollabTask>,
  TaskComment: ResolverTypeWrapper<GQLCollabTaskComment>,
  CollabPost: ResolverTypeWrapper<GQLCollabPost>,
  CollabPostComment: ResolverTypeWrapper<GQLCollabPostComment>,
  CurrentUser: ResolverTypeWrapper<Omit<CurrentUser, 'collabInvites' | 'collabRequests' | 'collabs'> & { collabInvites: Array<ResolversTypes['Collab']>, collabRequests: Array<ResolversTypes['CollabRequest']>, collabs: Array<ResolversTypes['Collab']> }>,
  CollabRequest: ResolverTypeWrapper<Omit<CollabRequest, 'collab' | 'member'> & { collab: ResolversTypes['Collab'], member: ResolversTypes['User'] }>,
  Mutation: ResolverTypeWrapper<{}>,
  CollabPostArgs: CollabPostArgs,
  Experience: Experience,
  LoginArgs: LoginArgs,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  SignUpArgs: SignUpArgs,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  ID: Scalars['ID'],
  Collab: GQLCollab,
  Boolean: Scalars['Boolean'],
  CollabDiscussionThread: GQLCollabDiscussionThread,
  User: GQLUser,
  String: Scalars['String'],
  CollabDiscussionThreadComment: GQLCollabDiscussionThreadComment,
  TaskList: GQLCollabTaskList,
  Int: Scalars['Int'],
  Task: GQLCollabTask,
  TaskComment: GQLCollabTaskComment,
  CollabPost: GQLCollabPost,
  CollabPostComment: GQLCollabPostComment,
  CurrentUser: Omit<CurrentUser, 'collabInvites' | 'collabRequests' | 'collabs'> & { collabInvites: Array<ResolversParentTypes['Collab']>, collabRequests: Array<ResolversParentTypes['CollabRequest']>, collabs: Array<ResolversParentTypes['Collab']> },
  CollabRequest: Omit<CollabRequest, 'collab' | 'member'> & { collab: ResolversParentTypes['Collab'], member: ResolversParentTypes['User'] },
  Mutation: {},
  CollabPostArgs: CollabPostArgs,
  Experience: Experience,
  LoginArgs: LoginArgs,
  AuthPayload: AuthPayload,
  SignUpArgs: SignUpArgs,
}>;

export type AuthPayloadResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Collab'] = ResolversParentTypes['Collab']> = ResolversObject<{
  acceptsInvites?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  collabPostId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  discussionThreads?: Resolver<Array<ResolversTypes['CollabDiscussionThread']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  invitationPending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  isMember?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  isOwner?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  members?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  pendingInvites?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  pendingRequests?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  requestToJoinPending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  taskList?: Resolver<Array<ResolversTypes['TaskList']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabDiscussionThreadResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabDiscussionThread'] = ResolversParentTypes['CollabDiscussionThread']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  collab?: Resolver<Maybe<ResolversTypes['Collab']>, ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['CollabDiscussionThreadComment']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabDiscussionThreadCommentResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabDiscussionThreadComment'] = ResolversParentTypes['CollabDiscussionThreadComment']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  collab?: Resolver<Maybe<ResolversTypes['Collab']>, ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  thread?: Resolver<Maybe<ResolversTypes['CollabDiscussionThread']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabPostResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabPost'] = ResolversParentTypes['CollabPost']> = ResolversObject<{
  acceptsInvites?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  collabId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['CollabPostComment']>, ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  experience?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hasStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  invitationPending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  isMember?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  isOwner?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  pendingInvites?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  pendingRequests?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  requestToJoinPending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  stack?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabPostCommentResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabPostComment'] = ResolversParentTypes['CollabPostComment']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabRequestResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabRequest'] = ResolversParentTypes['CollabRequest']> = ResolversObject<{
  collab?: Resolver<ResolversTypes['Collab'], ParentType, ContextType>,
  member?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CurrentUserResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CurrentUser'] = ResolversParentTypes['CurrentUser']> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  collabInvites?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  collabRequests?: Resolver<Array<ResolversTypes['CollabRequest']>, ParentType, ContextType>,
  collabs?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MutationResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  acceptCollabInvitation?: Resolver<ResolversTypes['User'], ParentType, CollabContextWithUser, RequireFields<MutationAcceptCollabInvitationArgs, 'collabId'>>,
  acceptMemberRequest?: Resolver<ResolversTypes['Collab'], ParentType, CollabContextWithUser, RequireFields<MutationAcceptMemberRequestArgs, 'collabId' | 'memberId'>>,
  cancelRequestToJoin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCancelRequestToJoinArgs, 'collabId'>>,
  createCollabDiscussionThread?: Resolver<ResolversTypes['CollabDiscussionThread'], ParentType, ContextType, RequireFields<MutationCreateCollabDiscussionThreadArgs, 'collabId' | 'title'>>,
  createCollabDiscussionThreadComment?: Resolver<ResolversTypes['CollabDiscussionThreadComment'], ParentType, ContextType, RequireFields<MutationCreateCollabDiscussionThreadCommentArgs, 'collabId' | 'content' | 'threadId'>>,
  createCollabPost?: Resolver<ResolversTypes['CollabPost'], ParentType, ContextType, RequireFields<MutationCreateCollabPostArgs, 'post'>>,
  createComment?: Resolver<ResolversTypes['CollabPostComment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'content' | 'postId'>>,
  createTask?: Resolver<ResolversTypes['Task'], ParentType, CollabContextWithUser, RequireFields<MutationCreateTaskArgs, 'collabId' | 'description' | 'taskListId'>>,
  createTaskComment?: Resolver<ResolversTypes['TaskComment'], ParentType, CollabContextWithUser, RequireFields<MutationCreateTaskCommentArgs, 'collabId' | 'content' | 'taskId'>>,
  createTaskList?: Resolver<ResolversTypes['TaskList'], ParentType, CollabContextWithUser, RequireFields<MutationCreateTaskListArgs, 'collabId' | 'name' | 'order'>>,
  declineCollabInvitation?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeclineCollabInvitationArgs, 'collabId'>>,
  declineMemberRequest?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeclineMemberRequestArgs, 'collabId' | 'memberId'>>,
  deleteCollab?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteCollabArgs, 'collabId'>>,
  deleteCollabDiscussionThread?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCollabDiscussionThreadArgs, 'threadId'>>,
  deleteCollabDiscussionThreadComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCollabDiscussionThreadCommentArgs, 'commentId'>>,
  deleteCollabPost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCollabPostArgs, 'postId'>>,
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteCommentArgs, 'commentId'>>,
  deleteTask?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteTaskArgs, 'taskId'>>,
  deleteTaskComment?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteTaskCommentArgs, 'commentId'>>,
  deleteTaskList?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteTaskListArgs, 'taskListId'>>,
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser>,
  inviteMember?: Resolver<ResolversTypes['User'], ParentType, CollabContextWithUser, RequireFields<MutationInviteMemberArgs, 'collabId' | 'memberId'>>,
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'credentials'>>,
  removeMember?: Resolver<ResolversTypes['Collab'], ParentType, CollabContextWithUser, RequireFields<MutationRemoveMemberArgs, 'collabId' | 'memberId'>>,
  requestToJoin?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationRequestToJoinArgs, 'collabId'>>,
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'credentials'>>,
  toggleAcceptInvites?: Resolver<ResolversTypes['Collab'], ParentType, CollabContextWithUser, RequireFields<MutationToggleAcceptInvitesArgs, 'collabId'>>,
}>;

export type QueryResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  collab?: Resolver<Maybe<ResolversTypes['Collab']>, ParentType, ContextType, RequireFields<QueryCollabArgs, 'collabId'>>,
  collabPost?: Resolver<Maybe<ResolversTypes['CollabPost']>, ParentType, ContextType, RequireFields<QueryCollabPostArgs, 'postId'>>,
  collabPosts?: Resolver<Array<ResolversTypes['CollabPost']>, ParentType, ContextType>,
  collabs?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  currentUser?: Resolver<Maybe<ResolversTypes['CurrentUser']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type TaskResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['TaskComment']>, ParentType, ContextType>,
  description?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TaskCommentResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['TaskComment'] = ResolversParentTypes['TaskComment']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
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

export type UserResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  collabs?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = CollabContext> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Collab?: CollabResolvers<ContextType>,
  CollabDiscussionThread?: CollabDiscussionThreadResolvers<ContextType>,
  CollabDiscussionThreadComment?: CollabDiscussionThreadCommentResolvers<ContextType>,
  CollabPost?: CollabPostResolvers<ContextType>,
  CollabPostComment?: CollabPostCommentResolvers<ContextType>,
  CollabRequest?: CollabRequestResolvers<ContextType>,
  CurrentUser?: CurrentUserResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Task?: TaskResolvers<ContextType>,
  TaskComment?: TaskCommentResolvers<ContextType>,
  TaskList?: TaskListResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = CollabContext> = Resolvers<ContextType>;
