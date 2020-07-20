import React from 'react'
import { hot } from 'react-hot-loader/root'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { Layout } from '../layout'
import { CurrentUserNotifications } from '../notifications'
import { lightTheme } from '../../themes'

import './index.css'

export const App = hot(() => (
  <ThemeProvider theme={lightTheme}>
    <CurrentUserNotifications>
      <CSSReset />
      <Layout />
    </CurrentUserNotifications>
  </ThemeProvider>
))
