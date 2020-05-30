import React from 'react'
import { Flex } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { FriendRequests } from '../FriendRequests'
import { UserAccountMenu } from '../UserAccountMenu'
import { Notifications } from '../Notifications'

export const NavUserPanel = () => (
  <StyledFlex>
    <Notifications />
    <FriendRequests />
    <UserAccountMenu />
  </StyledFlex>
)

const StyledFlex = styled(Flex)`
  > div:first-of-type {
    margin-right: 0.5rem;
  }
`
