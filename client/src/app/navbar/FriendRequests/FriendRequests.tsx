import React from 'react'
import { Flex, Button, ButtonGroup, Text, PseudoBox } from '@chakra-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import { FixedSizeList as List } from 'react-window'
import { DataProxy } from 'apollo-cache'
import {
  useCurrentUserFriendRequestsLazyQuery,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  CurrentUserFriendRequestsDocument,
  CurrentUserFriendRequestsQuery,
  GetCurrentUserQuery,
  GetCurrentUserDocument,
} from '../../../graphql/generates'
import { Ballon } from '../../../components/Ballon'
import { IconButtonWithTooltip } from '../../../components/IconButtonWithTooltip'
import { useCurrentUser } from '../../../providers'
import { Badge } from '../../../components/Badge'

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

export const FriendRequests = () => {
  const currentUser = useCurrentUser()!
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
  const [
    fetchFriendRequests,
    { data, loading, error },
  ] = useCurrentUserFriendRequestsLazyQuery()

  if (error) return <span>Could not fetch friend requests</span>

  const handleAccept = (friendId: string) => {
    // setTimeout prevent closing the modal when
    // the array gets filtered
    setTimeout(() => {
      acceptFriendRequest({
        variables: {
          friendId,
        },
      })
    }, 0)
  }

  const handleDecline = (senderId: string) => {
    // setTimeout prevent closing the modal when
    // the array gets filtered
    setTimeout(() => {
      declineFriendRequest({
        variables: {
          senderId,
        },
      })
    }, 0)
  }

  const friendRequests = data?.currentUser?.friendRequests ?? []

  return (
    <Ballon
      header="Friend Requests"
      triggerIcon={
        <Badge count={currentUser.friendRequestsCount}>
          <IconButtonWithTooltip
            onClick={() => fetchFriendRequests()}
            icon={GroupAddIcon}
            ariaLabel="Open Friend Requests"
          />
        </Badge>
      }
      isLoading={loading}
    >
      <Flex direction="column">
        <List
          height={Math.min(300, 45 * friendRequests.length)}
          itemCount={friendRequests.length}
          width={318}
          itemSize={45}
        >
          {({ index, style }) => (
            <FriendRequestItem
              style={style}
              user={friendRequests[index]}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          )}
        </List>
        {!loading && !error && friendRequests.length === 0 && (
          <Text as="h4" fontWeight={500} textAlign="center" p={4}>
            Everything is clear captain
          </Text>
        )}
      </Flex>
    </Ballon>
  )
}

const FriendRequestItem = ({
  style,
  user,
  onAccept,
  onDecline,
}: {
  style: React.CSSProperties
  user: NonNullable<
    CurrentUserFriendRequestsQuery['currentUser']
  >['friendRequests'][0]
  onAccept: (friendId: string) => void
  onDecline: (senderId: string) => void
}) => (
  <PseudoBox
    display="flex"
    pl={2}
    pr={4}
    alignItems="center"
    h={45}
    bg="white"
    _hover={{ backgroundColor: '#f2f2f2' }}
    style={style}
    _notFirst={{
      borderTop: '1px solid #dcdcdc',
    }}
  >
    <Text as="span" fontSize="0.9rem">
      {user.username}
    </Text>
    <ButtonGroup ml="auto">
      <Button size="xs" onClick={() => onDecline(user.id)}>
        Decline
      </Button>
      <Button size="xs" variantColor="purple" onClick={() => onAccept(user.id)}>
        Accept
      </Button>
    </ButtonGroup>
  </PseudoBox>
)
