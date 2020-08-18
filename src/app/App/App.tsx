import React from 'react'
import { hot } from 'react-hot-loader/root'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { Layout } from '../layout'
import { lightTheme } from '../../themes'
import './index.css'
import { CurrentUserNotifications } from '../notifications'

export const App = hot(() => (
  <ThemeProvider theme={lightTheme}>
    {/*  CurrentUserNotifications must be inside the ThemeProvider */}
    <CurrentUserNotifications>
      <CSSReset />
      <Layout />
    </CurrentUserNotifications>
  </ThemeProvider>
))
