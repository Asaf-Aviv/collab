import React from 'react'
import { Flex } from '@chakra-ui/core'
import { FriendRequests } from '../FriendRequests'
import { UserAccountMenu } from '../UserAccountMenu'

export const NavUserPanel = () => {
  return (
    <Flex>
      <FriendRequests />
      <UserAccountMenu />
    </Flex>
  )
}
