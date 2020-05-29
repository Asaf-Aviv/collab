import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/core'
import { FriendRequests } from '../FriendRequests'
import { UserAccountMenu } from '../UserAccountMenu'
import { useCurrentUser } from '../../../providers'
import { Ballon } from '../../../components/Ballon'
import { IconButtonWithTooltip } from '../../../components/IconButtonWithTooltip'
import NotificationsIcon from '@material-ui/icons/Notifications'
import styled from '@emotion/styled'
import { Badge } from '../../../components/Badge'
import { useCurrentUserNotificationsLazyQuery } from '../../../graphql/generates'
import { CloseButton } from '../../../components/CloseButton'
import { DisplayError } from '../../../components/DisplayError'
import { DisplayDate } from '../../../components/DisplayDate'

const Notifications = () => {
  const currentUser = useCurrentUser()!
  const [
    fetchNotifications,
    { data, loading, error, refetch },
  ] = useCurrentUserNotificationsLazyQuery()

  const notifications = data?.currentUser?.notifications ?? []

  return (
    <Ballon
      header="Notifications"
      triggerIcon={
        <Badge count={currentUser.notificationsCount}>
          <IconButtonWithTooltip
            onClick={() => fetchNotifications()}
            ariaLabel="Open Notifications"
            icon={NotificationsIcon}
          />
        </Badge>
      }
      isLoading={loading}
    >
      <Flex direction="column">
        {notifications?.map(notification => (
          <Box key={notification.id} p={2}>
            <Flex>
              <Text fontSize="0.85rem" mb={1} flex={1}>
                {notification.body}
              </Text>
              <CloseButton size="xs" aria-label="Delete Notification" />
            </Flex>
            <DisplayDate date={notification.creationDate} />
          </Box>
        ))}
        {!loading && !error && notifications.length === 0 && (
          <Text as="h4" fontWeight={500} textAlign="center" p={4}>
            Everything is clear captain
          </Text>
        )}
        {error && (
          <DisplayError
            message="Could not fetch Notifications"
            onClick={() => refetch()}
          />
        )}
      </Flex>
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
  > div:first-of-type {
    margin-right: 0.5rem;
  }
`
