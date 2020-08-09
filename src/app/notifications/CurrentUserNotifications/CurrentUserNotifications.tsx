import React from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { DataProxy } from 'apollo-cache'
import {
  useNewNotificationSubscription,
  CurrentUserNotificationsDocument,
  CurrentUserNotificationsQuery,
  GetCurrentUserQuery,
  GetCurrentUserDocument,
  Notification,
} from '../../../graphql/generates'
import { useCurrentUser } from '../../../providers'
import { useToastNotification } from '../useToastNotification'

const increaseUnreadNotificationsCount = (store: DataProxy) => {
  const { currentUser } = store.readQuery<GetCurrentUserQuery>({
    query: GetCurrentUserDocument,
  })!

  store.writeQuery({
    query: GetCurrentUserDocument,
    data: {
      currentUser: {
        ...currentUser,
        notificationsCount: currentUser!.notificationsCount + 1,
      },
    },
  })
}

const addNotificationToCache = (
  store: DataProxy,
  notification: Notification,
) => {
  let currentUserData: CurrentUserNotificationsQuery | null

  try {
    // if there is an error it means that the user didnt query
    // notifications yet
    currentUserData = store.readQuery<CurrentUserNotificationsQuery>({
      query: CurrentUserNotificationsDocument,
    })
  } catch {
    return
  }

  if (!currentUserData?.currentUser) return

  store.writeQuery({
    query: CurrentUserNotificationsDocument,
    data: {
      currentUser: {
        ...currentUserData.currentUser,
        notifications: [notification].concat(
          currentUserData.currentUser.notifications,
        ),
      },
    },
  })
}

type Props = {
  children: React.ReactNode
}

export const CurrentUserNotifications = ({ children }: Props) => {
  const currentUser = useCurrentUser()
  const notify = useToastNotification()
  const client = useApolloClient()

  const { error } = useNewNotificationSubscription({
    skip: !currentUser,
    onSubscriptionData({ subscriptionData }) {
      const { newNotification } = subscriptionData.data || {}

      if (!newNotification) return

      notify('success', newNotification)

      increaseUnreadNotificationsCount(client)
      addNotificationToCache(client, newNotification)
    },
  })

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  return <>{children}</>
}
