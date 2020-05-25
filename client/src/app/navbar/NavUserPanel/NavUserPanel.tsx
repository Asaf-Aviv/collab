import React from 'react'
import { Flex } from '@chakra-ui/core'
import { FriendRequests } from '../FriendRequests'
import { UserAccountMenu } from '../UserAccountMenu'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import { Ballon } from '../../../components/Ballon'
import { IconButtonWithTooltip } from '../../../components/IconButtonWithTooltip'
import NotificationsIcon from '@material-ui/icons/Notifications'
import styled from '@emotion/styled'
import { Badge } from '../../../components/Badge'

const Notifications = () => {
  const currentUser = useCurrentUser()!

  return (
    <Ballon
      header="Notifications"
      triggerIcon={
        <Badge count={currentUser.notificationsCount}>
          <IconButtonWithTooltip
            ariaLabel="Open Notifications"
            icon={NotificationsIcon}
          />
        </Badge>
      }
    >
      <h1>Notifications</h1>
    </Ballon>
  )
}

export const NavUserPanel = () => (
  <StyledFlex>
    <Notifications />
    <FriendRequests />
    <UserAccountMenu />
  </StyledFlex>
)

const StyledFlex = styled(Flex)`
  > * + * {
    margin-left: 0.5rem;
  }
`
