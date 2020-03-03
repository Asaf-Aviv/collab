import { GraphQLResolveInfo } from 'graphql';
import { CollabContext, CollabContextWithUser } from './context/CollabContext';
export type Maybe<T> = T | null;
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
  user: CurrentUser,
};

export type Collab = {
   __typename?: 'Collab',
  acceptsInvites: Scalars['Boolean'],
  comments: Array<CollabComment>,
  description: Scalars['String'],
  discussionMessages: Array<CollabDiscussionMessage>,
  experience: Scalars['String'],
  hasStarted: Scalars['Boolean'],
  id: Scalars['ID'],
  members: Array<Maybe<User>>,
  name: Scalars['String'],
  owner?: Maybe<User>,
  ownerId: Scalars['ID'],
  pendingInvites: Array<Maybe<User>>,
  pendingRequests: Array<Maybe<User>>,
  stack: Array<Scalars['String']>,
  taskList: Array<TaskList>,
  title: Scalars['String'],
};

export type CollabArgs = {
  description: Scalars['String'],
  experience: Experience,
  hasStarted: Scalars['Boolean'],
  name: Scalars['String'],
  stack: Array<Scalars['String']>,
  title: Scalars['String'],
};

export type CollabComment = {
   __typename?: 'CollabComment',
  author?: Maybe<User>,
  authorId: Scalars['ID'],
  collab?: Maybe<Collab>,
  collabId: Scalars['ID'],
  content: Scalars['String'],
  id: Scalars['ID'],
};

export type CollabDiscussionMessage = {
   __typename?: 'CollabDiscussionMessage',
  author?: Maybe<User>,
  authorId: Scalars['ID'],
  collabId: Scalars['ID'],
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
  acceptCollabInvite: User,
  addComment: CollabComment,
  addMember: Collab,
  createCollab: Collab,
  createCollabDiscussionMessage: CollabDiscussionMessage,
  createTask: Task,
  createTaskComment: TaskComment,
  createTaskList: TaskList,
  declineCollabInvite: Scalars['Boolean'],
  declineMemberRequest: Scalars['Boolean'],
  deleteCollab: Scalars['Boolean'],
  deleteCollabDiscussionMessage: Scalars['Boolean'],
  deleteComment: Scalars['Boolean'],
  deleteTask: Scalars['Boolean'],
  deleteTaskComment: Scalars['Boolean'],
  deleteTaskList: Scalars['Boolean'],
  deleteUser: Scalars['Boolean'],
  inviteMember: User,
  login: AuthPayload,
  removeMember: Collab,
  requestToJoin: Scalars['Boolean'],
  signUp: Scalars['Boolean'],
  toggleAcceptInvites: Collab,
  validateToken: AuthPayload,
};


export type MutationAcceptCollabInviteArgs = {
  collabId: Scalars['ID']
};


export type MutationAddCommentArgs = {
  collabId: Scalars['ID'],
  content: Scalars['String']
};


export type MutationAddMemberArgs = {
  collabId: Scalars['ID'],
  memberId: Scalars['ID']
};


export type MutationCreateCollabArgs = {
  collab: CollabArgs
};


export type MutationCreateCollabDiscussionMessageArgs = {
  collabId: Scalars['ID'],
  content: Scalars['String']
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


export type MutationDeclineCollabInviteArgs = {
  collabId: Scalars['ID']
};


export type MutationDeclineMemberRequestArgs = {
  collabId: Scalars['ID'],
  memberId: Scalars['ID']
};


export type MutationDeleteCollabArgs = {
  collabId: Scalars['ID']
};


export type MutationDeleteCollabDiscussionMessageArgs = {
  messageId: Scalars['ID']
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
  credentials: SignupArgs
};


export type MutationToggleAcceptInvitesArgs = {
  collabId: Scalars['ID']
};

export type Query = {
   __typename?: 'Query',
  collab?: Maybe<Collab>,
  collabs: Array<Collab>,
  user?: Maybe<User>,
  users: Array<User>,
};


export type QueryCollabArgs = {
  collabId: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type SignupArgs = {
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
  author: User,
  authorId: Scalars['ID'],
  content: Scalars['String'],
  id: Scalars['ID'],
};

export type TaskList = {
   __typename?: 'TaskList',
  id: Scalars['ID'],
  name: Scalars['String'],
  order: Scalars['Int'],
  tasks: Array<Task>,
};

export type User = {
   __typename?: 'User',
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
  Collab: ResolverTypeWrapper<Collab>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  CollabComment: ResolverTypeWrapper<CollabComment>,
  User: ResolverTypeWrapper<User>,
  String: ResolverTypeWrapper<Scalars['String']>,
  CollabDiscussionMessage: ResolverTypeWrapper<CollabDiscussionMessage>,
  TaskList: ResolverTypeWrapper<TaskList>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Task: ResolverTypeWrapper<Task>,
  TaskComment: ResolverTypeWrapper<TaskComment>,
  Mutation: ResolverTypeWrapper<{}>,
  CollabArgs: CollabArgs,
  Experience: Experience,
  LoginArgs: LoginArgs,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  CurrentUser: ResolverTypeWrapper<CurrentUser>,
  CollabRequest: ResolverTypeWrapper<CollabRequest>,
  SignupArgs: SignupArgs,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  ID: Scalars['ID'],
  Collab: Collab,
  Boolean: Scalars['Boolean'],
  CollabComment: CollabComment,
  User: User,
  String: Scalars['String'],
  CollabDiscussionMessage: CollabDiscussionMessage,
  TaskList: TaskList,
  Int: Scalars['Int'],
  Task: Task,
  TaskComment: TaskComment,
  Mutation: {},
  CollabArgs: CollabArgs,
  Experience: Experience,
  LoginArgs: LoginArgs,
  AuthPayload: AuthPayload,
  CurrentUser: CurrentUser,
  CollabRequest: CollabRequest,
  SignupArgs: SignupArgs,
}>;

export type AuthPayloadResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['CurrentUser'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Collab'] = ResolversParentTypes['Collab']> = ResolversObject<{
  acceptsInvites?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['CollabComment']>, ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  discussionMessages?: Resolver<Array<ResolversTypes['CollabDiscussionMessage']>, ParentType, ContextType>,
  experience?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hasStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  members?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  pendingInvites?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  pendingRequests?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  stack?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  taskList?: Resolver<Array<ResolversTypes['TaskList']>, ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabCommentResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabComment'] = ResolversParentTypes['CollabComment']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  collab?: Resolver<Maybe<ResolversTypes['Collab']>, ParentType, ContextType>,
  collabId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabDiscussionMessageResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['CollabDiscussionMessage'] = ResolversParentTypes['CollabDiscussionMessage']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  collabId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
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
  collabInvites?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  collabRequests?: Resolver<Array<ResolversTypes['CollabRequest']>, ParentType, ContextType>,
  collabs?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MutationResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  acceptCollabInvite?: Resolver<ResolversTypes['User'], ParentType, CollabContextWithUser, RequireFields<MutationAcceptCollabInviteArgs, 'collabId'>>,
  addComment?: Resolver<ResolversTypes['CollabComment'], ParentType, CollabContextWithUser, RequireFields<MutationAddCommentArgs, 'collabId' | 'content'>>,
  addMember?: Resolver<ResolversTypes['Collab'], ParentType, CollabContextWithUser, RequireFields<MutationAddMemberArgs, 'collabId' | 'memberId'>>,
  createCollab?: Resolver<ResolversTypes['Collab'], ParentType, CollabContextWithUser, RequireFields<MutationCreateCollabArgs, 'collab'>>,
  createCollabDiscussionMessage?: Resolver<ResolversTypes['CollabDiscussionMessage'], ParentType, CollabContextWithUser, RequireFields<MutationCreateCollabDiscussionMessageArgs, 'collabId' | 'content'>>,
  createTask?: Resolver<ResolversTypes['Task'], ParentType, CollabContextWithUser, RequireFields<MutationCreateTaskArgs, 'collabId' | 'description' | 'taskListId'>>,
  createTaskComment?: Resolver<ResolversTypes['TaskComment'], ParentType, CollabContextWithUser, RequireFields<MutationCreateTaskCommentArgs, 'collabId' | 'content' | 'taskId'>>,
  createTaskList?: Resolver<ResolversTypes['TaskList'], ParentType, CollabContextWithUser, RequireFields<MutationCreateTaskListArgs, 'collabId' | 'name' | 'order'>>,
  declineCollabInvite?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeclineCollabInviteArgs, 'collabId'>>,
  declineMemberRequest?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeclineMemberRequestArgs, 'collabId' | 'memberId'>>,
  deleteCollab?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteCollabArgs, 'collabId'>>,
  deleteCollabDiscussionMessage?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteCollabDiscussionMessageArgs, 'messageId'>>,
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteCommentArgs, 'commentId'>>,
  deleteTask?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteTaskArgs, 'taskId'>>,
  deleteTaskComment?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteTaskCommentArgs, 'commentId'>>,
  deleteTaskList?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationDeleteTaskListArgs, 'taskListId'>>,
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser>,
  inviteMember?: Resolver<ResolversTypes['User'], ParentType, CollabContextWithUser, RequireFields<MutationInviteMemberArgs, 'collabId' | 'memberId'>>,
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'credentials'>>,
  removeMember?: Resolver<ResolversTypes['Collab'], ParentType, CollabContextWithUser, RequireFields<MutationRemoveMemberArgs, 'collabId' | 'memberId'>>,
  requestToJoin?: Resolver<ResolversTypes['Boolean'], ParentType, CollabContextWithUser, RequireFields<MutationRequestToJoinArgs, 'collabId'>>,
  signUp?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'credentials'>>,
  toggleAcceptInvites?: Resolver<ResolversTypes['Collab'], ParentType, CollabContextWithUser, RequireFields<MutationToggleAcceptInvitesArgs, 'collabId'>>,
  validateToken?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  collab?: Resolver<Maybe<ResolversTypes['Collab']>, ParentType, ContextType, RequireFields<QueryCollabArgs, 'collabId'>>,
  collabs?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
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
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type TaskListResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['TaskList'] = ResolversParentTypes['TaskList']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UserResolvers<ContextType = CollabContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  collabs?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = CollabContext> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Collab?: CollabResolvers<ContextType>,
  CollabComment?: CollabCommentResolvers<ContextType>,
  CollabDiscussionMessage?: CollabDiscussionMessageResolvers<ContextType>,
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
