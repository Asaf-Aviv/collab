import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/core'
import { useCurrentUserFriendsQuery } from '../../../graphql/generates'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'

export const Friends = () => {
  const { data, loading, error, refetch } = useCurrentUserFriendsQuery({
    notifyOnNetworkStatusChange: true,
  })

  const { friends } = data?.currentUser || {}

  return (
    <Box as="main" flex={1} pb={4}>
      <Heading as="h1" size="md" mb={4} fontWeight={500}>
        Your Friends
      </Heading>
      {friends?.map(friend => (
        <Flex key={friend.id}>{friend.username}</Flex>
      ))}
      {loading && <Loader />}
      {error && (
        <DisplayError
          message="Could not fetch friends"
          onClick={() => refetch()}
        />
      )}
    </Box>
  )
}
