import React from 'react'
import { hot } from 'react-hot-loader/root'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import { Layout } from '../layout'
import './index.css'
import { CurrentUserNotifications } from '../notifications'

export const App = hot(() => (
  <ThemeProvider
    theme={Object.assign(theme, {
      fonts: {
        body: 'Inter, sans-serif',
        heading: 'Inter, serif',
        mono: 'Inter, monospace',
      },
      colors: {
        ...theme.colors,
        bg: 'white',
        text: '#303030',
      },
    })}
  >
    <CurrentUserNotifications>
      <CSSReset />
      <Layout />
    </CurrentUserNotifications>
  </ThemeProvider>
))
