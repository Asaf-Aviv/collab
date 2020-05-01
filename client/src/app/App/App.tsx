import React from 'react'
import { hot } from 'react-hot-loader/root'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import { WindowWidthProvider } from '../../components/WindowWidthProvider'
import { Layout } from '../layout'
import './index.css'

export const App = hot(({ children }: any) => (
  <WindowWidthProvider>
    <ThemeProvider
      theme={Object.assign(theme, {
        fonts: {
          body: 'Inter, sans-serif',
          heading: 'Inter, serif',
          mono: 'Inter, monospace',
        },
      })}
    >
      <CSSReset />
      <Layout />
    </ThemeProvider>
  </WindowWidthProvider>
))
