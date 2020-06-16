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

type Props = {
  children: React.ReactNode
}

export const AppProviders = ({ children }: Props) => (
  <WindowWidthProvider>
    <TokenValidationProvider>
      <CurrentUserManager>{children}</CurrentUserManager>
    </TokenValidationProvider>
  </WindowWidthProvider>
)

export { useTokenValidation, useWindowWidth, useCurrentUser, useAuthActions }
