import React from 'react'
import { useNewNotificationSubscription } from '../../../graphql/generates'
import { useCurrentUser } from '../../../hooks/useCurrentUser'

type Props = {
  children: React.ReactNode
}

const UseUserNotifications = ({ children }: Props) => {
  useNewNotificationSubscription({
    onSubscriptionData({ subscriptionData }) {
      console.log(subscriptionData.data?.newNotification)
    },
  })

  return <>{children}</>
}

export const CurrentUserNotifications = ({ children }: Props) => {
  const currentUser = useCurrentUser()

  return currentUser ? (
    <UseUserNotifications>{children}</UseUserNotifications>
  ) : (
    <>{children}</>
  )
}
