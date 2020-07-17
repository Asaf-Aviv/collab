import React from 'react'
import { Flex } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { FriendRequestsBallon } from '../FriendRequestsBallon'
import { UserAccountMenu } from '../UserAccountMenu'
import { Notifications } from '../Notifications'
import { useWindowWidth } from '../../../providers'

export const NavUserPanel = () => {
  const width = useWindowWidth()

  return (
    <StyledFlex>
      <Notifications />
      {width >= 480 && <FriendRequestsBallon />}
      <UserAccountMenu />
    </StyledFlex>
  )
}

const StyledFlex = styled(Flex)`
  > div:nth-of-type(2) {
    margin-left: 0.5rem;
  }
`
