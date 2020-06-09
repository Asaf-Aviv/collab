import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import DeleteIcon from '@material-ui/icons/Delete'
import { useCurrentUser } from '../../../providers'
import { Ballon } from '../../../components/Ballon'
import { IconButtonWithTooltip } from '../../../components/IconButtonWithTooltip'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { DataProxy } from 'apollo-cache'
import { Badge } from '../../../components/Badge'
import {
  useCurrentUserNotificationsLazyQuery,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  CurrentUserNotificationsDocument,
  CurrentUserNotificationsQuery,
  GetCurrentUserQuery,
  GetCurrentUserDocument,
} from '../../../graphql/generates'
import { DisplayError } from '../../../components/DisplayError'
import { DisplayDate } from '../../../components/DisplayDate'
import { useToastNotification } from '../../notifications'

const decreaseUnreadNotificationsCount = (
  store: DataProxy,
  nextCount?: number,
) => {
  const { currentUser } = store.readQuery<GetCurrentUserQuery>({
    query: GetCurrentUserDocument,
  })!

  store.writeQuery({
    query: GetCurrentUserDocument,
    data: {
      currentUser: {
        ...currentUser,
        notificationsCount: nextCount ?? currentUser!.notificationsCount - 1,
      },
    },
  })
}

const removeNotificationFromCache = (
  store: DataProxy,
  // id is ignored when deleteAll is true
  notificationId: string | undefined,
  deleteAll?: boolean,
) => {
  const { currentUser } = store.readQuery<CurrentUserNotificationsQuery>({
    query: CurrentUserNotificationsDocument,
  })!

  if (!deleteAll) {
    const notification = currentUser?.notifications.find(
      n => n.id === notificationId,
    )
    if (!notification!.isRead) {
      decreaseUnreadNotificationsCount(store, 0)
    }
  }

  store.writeQuery({
    query: CurrentUserNotificationsDocument,
    data: {
      currentUser: {
        ...currentUser,
        notifications: deleteAll
          ? []
          : currentUser!.notifications.filter(
              ({ id }) => id !== notificationId,
            ),
      },
    },
  })
}

export const Notifications = () => {
  const currentUser = useCurrentUser()!
  const notify = useToastNotification()
  const [
    fetchNotifications,
    { data, loading, error, refetch },
  ] = useCurrentUserNotificationsLazyQuery()
  const [markAsRead] = useMarkNotificationAsReadMutation({
    update(store) {
      decreaseUnreadNotificationsCount(store)
    },
    onError() {
      notify('error', {
        title: 'Error',
        message: 'Could not mark notification as read',
      })
    },
  })
  const [deleteNotification] = useDeleteNotificationMutation({
    update(store, { data }) {
      if (!data) return
      removeNotificationFromCache(store, data.deleteNotification)
    },
    onError() {
      notify('error', {
        title: 'Error',
        message: 'Could not delete Notification',
      })
    },
  })
  const [deleteAllNotifications] = useDeleteAllNotificationsMutation({
    update(store) {
      removeNotificationFromCache(store, undefined, true)
      decreaseUnreadNotificationsCount(store, 0)
    },
    onError() {
      notify('error', {
        title: 'Error',
        message: 'Could not delete all Notifications',
      })
    },
  })
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation({
    update(store) {
      decreaseUnreadNotificationsCount(store, 0)
    },
    onError() {
      notify('error', {
        title: 'Error',
        message: 'Could not mark all Notifications as read',
      })
    },
  })

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
                {notification.message}
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
