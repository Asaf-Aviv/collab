import React from 'react'
import { Flex, Button, ButtonGroup, Text, PseudoBox } from '@chakra-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import { FixedSizeList as List } from 'react-window'
import {
  useCurrentUserFriendRequestsLazyQuery,
  CurrentUserFriendRequestsQuery,
} from '../../../graphql/generates'
import { Ballon } from '../../../components/Ballon'
import { IconButtonWithTooltip } from '../../../components/IconButtonWithTooltip'
import { useCurrentUser } from '../../../providers'
import { Badge } from '../../../components/Badge'
import { useFriendRequestActions } from '../../current-user-profile/FriendRequests'
import { DisplayError } from '../../../components/DisplayError'

export const FriendRequestsBallon = () => {
  const currentUser = useCurrentUser()!
  const [
    fetchFriendRequests,
    { data, loading, error, refetch },
  ] = useCurrentUserFriendRequestsLazyQuery()

  const friendRequests = data?.currentUser?.friendRequests ?? []

  return (
    <Ballon
      header="Friend Requests"
      triggerIcon={
        <Badge count={currentUser.friendRequestsCount}>
          <IconButtonWithTooltip
            onClick={() => fetchFriendRequests()}
            icon={GroupAddIcon}
            ariaLabel="Friend Requests"
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
            <FriendRequestItem style={style} user={friendRequests[index]} />
          )}
        </List>
        {!loading && !error && friendRequests.length === 0 && (
          <Text as="h4" fontWeight={500} textAlign="center" p={4}>
            Everything is clear captain
          </Text>
        )}
      </Flex>
      {error && (
        <DisplayError
          onClick={() => refetch()}
          message="Could not fetch friend requests"
        />
      )}
    </Ballon>
  )
}

const FriendRequestItem = ({
  style,
  user,
}: {
  style: React.CSSProperties
  user: NonNullable<
    CurrentUserFriendRequestsQuery['currentUser']
  >['friendRequests'][0]
}) => {
  const {
    acceptFriendRequest,
    acceptLoading,
    declineFriendRequest,
    declineLoading,
  } = useFriendRequestActions()

  const handleAccept = (friendId: string) => {
    if (acceptLoading || declineLoading) return
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
    if (acceptLoading || declineLoading) return
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

  return (
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
        <Button size="xs" onClick={() => handleDecline(user.id)}>
          Decline
        </Button>
        <Button
          size="xs"
          variantColor="purple"
          onClick={() => handleAccept(user.id)}
        >
          Accept
        </Button>
      </ButtonGroup>
    </PseudoBox>
  )
}
