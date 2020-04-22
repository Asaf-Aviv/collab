import React from 'react'
import { hot } from 'react-hot-loader/root'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import { Routes } from '../Routes'
import { ThemeProvider, CSSReset, Box, theme } from '@chakra-ui/core'
import { Chat } from '../../chat/Chat'
import { store } from '../../chat/reducers'
import { Provider } from 'react-redux'
import { WindowWidthProvider } from '../WindowWidthProvider'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { connect } from 'react-redux'
import './index.css'

export const App = hot(() => {
  const currentUser = useCurrentUser()

  return (
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
        <NavBar />
        <Box pt="64px" minHeight="100vh">
          <Routes />
        </Box>
        <Footer />
        {currentUser && <Provider store={store}>{/* <Chat /> */}</Provider>}
      </ThemeProvider>
    </WindowWidthProvider>
  )
})
