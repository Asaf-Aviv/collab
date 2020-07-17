import React from 'react'
import { Box, Heading } from '@chakra-ui/core'
import { useCurrentUserFriendsQuery } from '../../../graphql/generates'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { UserCard } from '../../../components/UserCard'

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
        <UserCard key={friend.id} {...friend}></UserCard>
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
