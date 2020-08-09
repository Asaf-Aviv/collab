import React from 'react'
import {
  TokenValidationProvider,
  useTokenValidation,
} from './TokenValidationProvider'
import { WindowWidthProvider, useWindowWidth } from './WindowWidthProvider'
import {
  CurrentUserManager,
  useCurrentUser,
  useAuthActions,
} from './CurrentUserManager'
import { CurrentUserNotifications } from '../app/notifications'

type Props = {
  children: React.ReactNode
}

export const AppProviders = ({ children }: Props) => (
  <WindowWidthProvider>
    <TokenValidationProvider>
      <CurrentUserManager>
        <CurrentUserNotifications>{children}</CurrentUserNotifications>
      </CurrentUserManager>
    </TokenValidationProvider>
  </WindowWidthProvider>
)

export { useTokenValidation, useWindowWidth, useCurrentUser, useAuthActions }
