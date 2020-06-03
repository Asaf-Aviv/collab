import React from 'react'
import {
  Flex,
  Box,
  Button,
  ButtonGroup,
  Text,
  PseudoBox,
} from '@chakra-ui/core'
import { useCurrentUserFriendRequestsQuery } from '../../../graphql/generates'
import { useFriendRequestActions } from './useFriendRequestActions'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'

export const FriendRequests = () => {
  const {
    acceptFriendRequest,
    declineFriendRequest,
  } = useFriendRequestActions()

  const { data, loading, error, refetch } = useCurrentUserFriendRequestsQuery()

  const handleAccept = (friendId: string) => {
    acceptFriendRequest({
      variables: {
        friendId,
      },
    })
  }

  const handleDecline = (senderId: string) => {
    declineFriendRequest({
      variables: {
        senderId,
      },
    })
  }

  const friendRequests = data?.currentUser?.friendRequests ?? []

  return (
    <Box as="main" flex={1} pb={8}>
      <Flex direction="column">
        {friendRequests.map(user => (
          <PseudoBox
            key={user.id}
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            maxWidth={350}
            _notFirst={{
              borderTop: '1px solid #e1e1e1',
            }}
            _hover={{
              bg: '#EEE',
            }}
          >
            <Text as="span" fontWeight={500} fontSize="0.85rem">
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
        ))}
        {loading && <Loader />}
        {error && (
          <DisplayError
            message="Could not fetch friend requests"
            onClick={() => refetch()}
          />
        )}
      </Flex>
    </Box>
  )
}
