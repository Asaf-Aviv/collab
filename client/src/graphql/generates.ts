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

export type GetCurrentUserQueryVariables = {};


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'username' | 'avatar' | 'email'>
  )> }
);

export type CollabQueryVariables = {
  collabId: Scalars['ID']
};


export type CollabQuery = (
  { __typename?: 'Query' }
  & { collab: Maybe<(
    { __typename?: 'Collab' }
    & Pick<Collab, 'id' | 'name' | 'acceptsInvites' | 'isOwner' | 'isMember' | 'invitationPending' | 'requestToJoinPending'>
    & { owner: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, members: Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>> }
  )> }
);

export type RequestToJoinMutationVariables = {
  collabId: Scalars['ID']
};


export type RequestToJoinMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'requestToJoin'>
);

export type GetCollabPostQueryVariables = {
  postId: Scalars['ID']
};


export type GetCollabPostQuery = (
  { __typename?: 'Query' }
  & { collabPost: Maybe<(
    { __typename?: 'CollabPost' }
    & Pick<CollabPost, 'id' | 'name' | 'title' | 'description' | 'collabId' | 'experience' | 'stack' | 'hasStarted' | 'acceptsInvites' | 'isOwner' | 'isMember' | 'invitationPending' | 'requestToJoinPending'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    )>, comments: Array<(
      { __typename?: 'CollabPostComment' }
      & Pick<CollabPostComment, 'id' | 'content'>
      & { author: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      )> }
    )> }
  )> }
);

export type AcceptCollabInvitationMutationVariables = {
  collabId: Scalars['ID']
};


export type AcceptCollabInvitationMutation = (
  { __typename?: 'Mutation' }
  & { acceptCollabInvitation: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type DeclineCollabInvitationMutationVariables = {
  collabId: Scalars['ID']
};


export type DeclineCollabInvitationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'declineCollabInvitation'>
);

export type CollabPostsQueryVariables = {};


export type CollabPostsQuery = (
  { __typename?: 'Query' }
  & { collabPosts: Array<(
    { __typename?: 'CollabPost' }
    & Pick<CollabPost, 'id' | 'title'>
  )> }
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
export const CollabDocument = gql`
    query Collab($collabId: ID!) {
  collab(collabId: $collabId) {
    id
    name
    acceptsInvites
    isOwner
    isMember
    invitationPending
    requestToJoinPending
    owner {
      id
      username
    }
    members {
      id
      username
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
export const GetCollabPostDocument = gql`
    query GetCollabPost($postId: ID!) {
  collabPost(postId: $postId) {
    id
    name
    title
    description
    owner {
      id
      username
    }
    collabId
    experience
    stack
    hasStarted
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
export const AcceptCollabInvitationDocument = gql`
    mutation AcceptCollabInvitation($collabId: ID!) {
  acceptCollabInvitation(collabId: $collabId) {
    id
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
export const CollabPostsDocument = gql`
    query CollabPosts {
  collabPosts {
    id
    title
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