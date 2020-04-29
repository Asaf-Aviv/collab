import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { NavBar } from '../navbar'
import { Footer } from '../../components/Footer/Footer'
import { Routes } from '../routes/Routes'
import { ThemeProvider, CSSReset, Box, theme, Flex } from '@chakra-ui/core'
import { Chat } from '../chat'
import { store } from '../chat/reducers/reducers'
import { Provider } from 'react-redux'
import { WindowWidthProvider } from '../../components/WindowWidthProvider'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import './index.css'
import { useLocation } from 'react-router-dom'

export const App = hot(() => {
  const currentUser = useCurrentUser()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location])

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
        <Flex>
          <Box flex={1}>
            <Box pt="64px" minHeight="100vh">
              <Routes />
            </Box>
            <Footer />
          </Box>
          {currentUser && (
            <Provider store={store}>
              <Chat />
            </Provider>
          )}
        </Flex>
      </ThemeProvider>
    </WindowWidthProvider>
  )
})
