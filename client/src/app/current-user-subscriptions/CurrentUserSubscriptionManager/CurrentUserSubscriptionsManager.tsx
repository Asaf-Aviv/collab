import React from 'react'
import { useCurrentUser } from '../../../providers'
import { useSubscribeToFriendRequests } from '../../current-user-profile/FriendRequests'

type Props = {
  children: React.ReactNode
}

export const CurrentUserSubscriptionsManager = ({ children }: Props) => {
  const currentUser = useCurrentUser()
  useSubscribeToFriendRequests({
    skip: !currentUser,
  })

  return <>{children}</>
}
