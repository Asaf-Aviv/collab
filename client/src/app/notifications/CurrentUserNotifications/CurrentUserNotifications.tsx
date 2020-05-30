import React from 'react'
import { useNewNotificationSubscription } from '../../../graphql/generates'
import { useCurrentUser } from '../../../providers'
import { useToastNotification } from '../useToastNotification'

type Props = {
  children: React.ReactNode
}

export const CurrentUserNotifications = ({ children }: Props) => {
  const currentUser = useCurrentUser()
  const notify = useToastNotification()

  useNewNotificationSubscription({
    skip: !currentUser,
    onSubscriptionData({ subscriptionData }) {
      console.log(subscriptionData)
      const { newNotification } = subscriptionData.data || {}

      if (!newNotification) return

      notify('success', newNotification)

      console.log(subscriptionData.data?.newNotification)
    },
  })

  return <>{children}</>
}
