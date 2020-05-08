import React from 'react'
import { Flex } from '@chakra-ui/core'
import { useCurrentUserFriendsQuery } from '../../../graphql/generates'

export const Friends = () => {
  const { data, loading, error } = useCurrentUserFriendsQuery()

  if (loading) return null
  if (error) return <span>Could not fetch friends</span>
  if (!data?.currentUser) return null

  const { friends } = data.currentUser

  return (
    <Flex>
      {friends.map(friend => (
        <Flex key={friend.id}>{friend.username}</Flex>
      ))}
    </Flex>
  )
}
