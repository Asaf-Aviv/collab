import { DataProxy } from 'apollo-cache'
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  CurrentUserFriendRequestsDocument,
  CurrentUserFriendRequestsQuery,
  GetCurrentUserQuery,
  GetCurrentUserDocument,
  useNewFriendRequestSubscription,
  User,
} from '../../../graphql/generates'

const removeFriendRequestFromCache = (store: DataProxy, userId: string) => {
  if (userId === undefined) return

  const { currentUser } = store.readQuery<CurrentUserFriendRequestsQuery>({
    query: CurrentUserFriendRequestsDocument,
  })!

  store.writeQuery({
    query: CurrentUserFriendRequestsDocument,
    data: {
      currentUser: {
        ...currentUser,
        friendRequests: currentUser!.friendRequests.filter(
          ({ id }) => id !== userId,
        ),
      },
    },
  })
}

const updateFriendRequestsCount = (store: DataProxy, amount: number) => {
  const { currentUser } = store.readQuery<GetCurrentUserQuery>({
    query: GetCurrentUserDocument,
  })!

  store.writeQuery({
    query: GetCurrentUserDocument,
    data: {
      currentUser: {
        ...currentUser,
        friendRequestsCount: currentUser!.friendRequestsCount + amount,
      },
    },
  })
}

const addFriendRequestToCache = (
  store: DataProxy,
  user: Pick<User, 'id' | 'avatar' | 'username'>,
) => {
  try {
    // queries for the friend requests might throw an error if the
    // user didnt fetch the friend requests yet
    const { currentUser } = store.readQuery<CurrentUserFriendRequestsQuery>({
      query: CurrentUserFriendRequestsDocument,
    })!

    store.writeQuery({
      query: CurrentUserFriendRequestsDocument,
      data: {
        currentUser: {
          ...currentUser,
          friendRequests: currentUser!.friendRequests.concat(user),
        },
      },
    })
  } catch (err) {
    console.error(err)
  }
}

export const useSubscribeToFriendRequests = ({ skip = false }) => {
  useNewFriendRequestSubscription({
    skip,
    onSubscriptionData({ client, subscriptionData: { data } }) {
      if (!data) return
      updateFriendRequestsCount(client, 1)
      addFriendRequestToCache(client, data.newFriendRequest.user)
    },
  })
}

export const useFriendRequestActions = () => {
  const [
    acceptFriendRequest,
    { loading: acceptLoading },
  ] = useAcceptFriendRequestMutation({
    update(store, { data }) {
      if (!data) return
      removeFriendRequestFromCache(store, data.acceptFriendRequest.id)
      updateFriendRequestsCount(store, -1)
    },
  })
  const [
    declineFriendRequest,
    { loading: declineLoading },
  ] = useDeclineFriendRequestMutation({
    update(store, { data }) {
      if (!data) return
      removeFriendRequestFromCache(store, data.declineFriendRequest.id)
      updateFriendRequestsCount(store, -1)
    },
  })

  return {
    acceptFriendRequest,
    acceptLoading,
    declineFriendRequest,
    declineLoading,
  }
}
