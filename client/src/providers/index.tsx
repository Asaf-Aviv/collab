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
import { CurrentUserSubscriptionsManager } from '../app/current-user-subscriptions/CurrentUserSubscriptionsManager'

type Props = {
  children: React.ReactNode
}

export const AppProviders = ({ children }: Props) => (
  <WindowWidthProvider>
    <TokenValidationProvider>
      <CurrentUserManager>
        <CurrentUserSubscriptionsManager>
          {children}
        </CurrentUserSubscriptionsManager>
      </CurrentUserManager>
    </TokenValidationProvider>
  </WindowWidthProvider>
)

export { useTokenValidation, useWindowWidth, useCurrentUser, useAuthActions }
