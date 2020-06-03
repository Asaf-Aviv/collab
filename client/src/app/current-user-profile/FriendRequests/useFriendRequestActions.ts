import { DataProxy } from 'apollo-cache'
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  CurrentUserFriendRequestsDocument,
  CurrentUserFriendRequestsQuery,
  GetCurrentUserQuery,
  GetCurrentUserDocument,
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

const decreaseFriendRequestsCount = (store: DataProxy) => {
  const { currentUser } = store.readQuery<GetCurrentUserQuery>({
    query: GetCurrentUserDocument,
  })!

  store.writeQuery({
    query: GetCurrentUserDocument,
    data: {
      currentUser: {
        ...currentUser,
        friendRequestsCount: currentUser!.friendRequestsCount - 1,
      },
    },
  })
}

export const useFriendRequestActions = () => {
  const [acceptFriendRequest] = useAcceptFriendRequestMutation({
    update(store, { data }) {
      if (!data) return
      removeFriendRequestFromCache(store, data.acceptFriendRequest.id)
      decreaseFriendRequestsCount(store)
    },
  })
  const [declineFriendRequest] = useDeclineFriendRequestMutation({
    update(store, { data }) {
      if (!data) return
      removeFriendRequestFromCache(store, data.declineFriendRequest)
      decreaseFriendRequestsCount(store)
    },
  })

  return { acceptFriendRequest, declineFriendRequest }
}
