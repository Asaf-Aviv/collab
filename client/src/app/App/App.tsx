import React from 'react'
import { hot } from 'react-hot-loader/root'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import { WindowWidthProvider } from '../../providers'
import { Layout } from '../layout'
import './index.css'

export const App = hot(() => (
  <WindowWidthProvider>
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
      <CSSReset />
      <Layout />
    </ThemeProvider>
  </WindowWidthProvider>
))
