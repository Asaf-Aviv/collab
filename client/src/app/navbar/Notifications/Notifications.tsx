import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import DeleteIcon from '@material-ui/icons/Delete'
import { useCurrentUser } from '../../../providers'
import { Ballon } from '../../../components/Ballon'
import { IconButtonWithTooltip } from '../../../components/IconButtonWithTooltip'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { Badge } from '../../../components/Badge'
import {
  useCurrentUserNotificationsLazyQuery,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  CurrentUserNotificationsDocument,
  CurrentUserNotificationsQuery,
} from '../../../graphql/generates'
import { DisplayError } from '../../../components/DisplayError'
import { DisplayDate } from '../../../components/DisplayDate'
import { useToastNotification } from '../../notifications'

export const Notifications = () => {
  const currentUser = useCurrentUser()!
  const notify = useToastNotification()
  const [
    fetchNotifications,
    { data, loading, error, refetch },
  ] = useCurrentUserNotificationsLazyQuery()
  const [markAsRead] = useMarkNotificationAsReadMutation({
    onError() {
      notify('error', {
        title: 'Error',
        body: 'Could not mark notification as read',
      })
    },
  })
  const [deleteNotification] = useDeleteNotificationMutation({
    update(store, { data }) {
      if (!data) return

      const notificationId = data.deleteNotification

      const currentUserData = store.readQuery<CurrentUserNotificationsQuery>({
        query: CurrentUserNotificationsDocument,
      })

      if (!currentUserData?.currentUser) return

      const notificationIndex = currentUserData.currentUser.notifications.findIndex(
        ({ id }) => id === notificationId,
      )

      if (notificationIndex === -1) return

      currentUserData.currentUser.notifications.splice(notificationIndex, 1)

      store.writeQuery({
        query: CurrentUserNotificationsDocument,
        data: currentUserData,
      })
    },
    onError() {
      notify('error', {
        title: 'Error',
        body: 'Could not delete Notification',
      })
    },
  })
  const [deleteAllNotifications] = useDeleteAllNotificationsMutation({
    onError() {
      notify('error', {
        title: 'Error',
        body: 'Could not delete all Notifications',
      })
    },
  })
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation({
    onError() {
      notify('error', {
        title: 'Error',
        body: 'Could not mark all Notifications as read',
      })
    },
  })

  const notifications = data?.currentUser?.notifications ?? []

  return (
    <Ballon
      isOpen
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
      leftHeaderSlot={
        <>
          {notifications.length > 0 && (
            <IconButtonWithTooltip
              ariaLabel="Delete All Notifications"
              icon={DeleteIcon}
              onClick={() => deleteAllNotifications()}
              mr={2}
            />
          )}
          {notifications.some(({ isRead }) => !isRead) && (
            <IconButtonWithTooltip
              ariaLabel="Mark All as Read"
              icon={ChatIcon}
              onClick={() => markAllAsRead()}
            />
          )}
        </>
      }
      isLoading={loading}
    >
      <Flex direction="column">
        {notifications?.map(notification => (
          <Box
            key={notification.id}
            p={2}
            bg={notification.isRead ? undefined : '#f0ecff'}
          >
            <Flex>
              <Text fontSize="0.85rem" mb={1} flex={1}>
                {notification.body}
              </Text>
              {!notification.isRead && (
                <IconButtonWithTooltip
                  ariaLabel="Mark as Read"
                  onClick={() =>
                    markAsRead({
                      variables: {
                        notificationId: notification.id,
                      },
                    })
                  }
                  icon={ChatIcon}
                />
              )}
              <IconButtonWithTooltip
                ariaLabel="Delete Notification"
                onClick={() =>
                  deleteNotification({
                    variables: {
                      notificationId: notification.id,
                    },
                  })
                }
                icon={DeleteIcon}
              />
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
