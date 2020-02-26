import { GraphQLResolveInfo } from 'graphql';
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
  user: User,
};

export type Collab = {
   __typename?: 'Collab',
  comments: Array<CollabComment>,
  description: Scalars['String'],
  experience: Scalars['String'],
  id: Scalars['ID'],
  members: Array<User>,
  owner: User,
  ownerId: Scalars['ID'],
  pendingInvites: Array<User>,
  stack: Array<Scalars['String']>,
  title: Scalars['String'],
};

export type CollabArgs = {
  description: Scalars['String'],
  experience: Experience,
  stack: Array<Scalars['String']>,
  title: Scalars['String'],
};

export type CollabComment = {
   __typename?: 'CollabComment',
  author: User,
  authorId: Scalars['ID'],
  collab: Collab,
  collabId: Scalars['ID'],
  content: Scalars['String'],
  id: Scalars['ID'],
};

export type CollabRequest = {
   __typename?: 'CollabRequest',
  collab: Collab,
  member: User,
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
  declineCollabInvite: Scalars['Boolean'],
  deleteCollab: Scalars['Boolean'],
  deleteComment: Scalars['Boolean'],
  deleteUser: Scalars['Boolean'],
  inviteMember: User,
  login: AuthPayload,
  removeMember: Collab,
  requestToJoin: Scalars['Boolean'],
  signUp: Scalars['Boolean'],
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


export type MutationDeclineCollabInviteArgs = {
  collabId: Scalars['ID']
};


export type MutationDeleteCollabArgs = {
  collabId: Scalars['ID']
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID']
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']
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

export type Query = {
   __typename?: 'Query',
  collab?: Maybe<Collab>,
  collabs: Array<Collab>,
  users: Array<User>,
};


export type QueryCollabArgs = {
  collabId: Scalars['ID']
};

export type SignupArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  collabInvites: Array<Collab>,
  collabRequests: Array<CollabRequest>,
  collabs: Array<Collab>,
  email: Scalars['String'],
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
  CollabComment: ResolverTypeWrapper<CollabComment>,
  User: ResolverTypeWrapper<User>,
  CollabRequest: ResolverTypeWrapper<CollabRequest>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Mutation: ResolverTypeWrapper<{}>,
  CollabArgs: CollabArgs,
  Experience: Experience,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  LoginArgs: LoginArgs,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  SignupArgs: SignupArgs,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  ID: Scalars['ID'],
  Collab: Collab,
  CollabComment: CollabComment,
  User: User,
  CollabRequest: CollabRequest,
  String: Scalars['String'],
  Mutation: {},
  CollabArgs: CollabArgs,
  Experience: Experience,
  Boolean: Scalars['Boolean'],
  LoginArgs: LoginArgs,
  AuthPayload: AuthPayload,
  SignupArgs: SignupArgs,
}>;

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collab'] = ResolversParentTypes['Collab']> = ResolversObject<{
  comments?: Resolver<Array<ResolversTypes['CollabComment']>, ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  experience?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  pendingInvites?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  stack?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabCommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollabComment'] = ResolversParentTypes['CollabComment']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  collab?: Resolver<ResolversTypes['Collab'], ParentType, ContextType>,
  collabId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CollabRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollabRequest'] = ResolversParentTypes['CollabRequest']> = ResolversObject<{
  collab?: Resolver<ResolversTypes['Collab'], ParentType, ContextType>,
  member?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  acceptCollabInvite?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAcceptCollabInviteArgs, 'collabId'>>,
  addComment?: Resolver<ResolversTypes['CollabComment'], ParentType, ContextType, RequireFields<MutationAddCommentArgs, 'collabId' | 'content'>>,
  addMember?: Resolver<ResolversTypes['Collab'], ParentType, ContextType, RequireFields<MutationAddMemberArgs, 'collabId' | 'memberId'>>,
  createCollab?: Resolver<ResolversTypes['Collab'], ParentType, ContextType, RequireFields<MutationCreateCollabArgs, 'collab'>>,
  declineCollabInvite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeclineCollabInviteArgs, 'collabId'>>,
  deleteCollab?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCollabArgs, 'collabId'>>,
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'commentId'>>,
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>,
  inviteMember?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationInviteMemberArgs, 'collabId' | 'memberId'>>,
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'credentials'>>,
  removeMember?: Resolver<ResolversTypes['Collab'], ParentType, ContextType, RequireFields<MutationRemoveMemberArgs, 'collabId' | 'memberId'>>,
  requestToJoin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRequestToJoinArgs, 'collabId'>>,
  signUp?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'credentials'>>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  collab?: Resolver<Maybe<ResolversTypes['Collab']>, ParentType, ContextType, RequireFields<QueryCollabArgs, 'collabId'>>,
  collabs?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  collabInvites?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  collabRequests?: Resolver<Array<ResolversTypes['CollabRequest']>, ParentType, ContextType>,
  collabs?: Resolver<Array<ResolversTypes['Collab']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Collab?: CollabResolvers<ContextType>,
  CollabComment?: CollabCommentResolvers<ContextType>,
  CollabRequest?: CollabRequestResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
