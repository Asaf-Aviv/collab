import React, { useEffect, useState } from 'react'
import { Box, Flex } from '@chakra-ui/core'
import { NavBar } from '../../navbar'
import { Footer } from '../Footer'
import { Routes } from '../../routes'
import { Chat } from '../../chat'
import { store } from '../../chat/reducers'
import { Provider } from 'react-redux'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import { useLocation } from 'react-router-dom'
import { PageHeaderSpacing } from '../../../components/global'
import { useWindowWidth } from '../../../components/WindowWidthProvider'

export const Layout = () => {
  const currentUser = useCurrentUser()
  const location = useLocation()
  const [isChatMinimized, setIsChatMinimized] = useState(false)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <>
      <NavBar />
      <Flex>
        <Box flex={1}>
          <Box pt="64px" mb={8} minHeight="100vh">
            {location.pathname !== '/' && <PageHeaderSpacing />}
            <Routes />
          </Box>
          <Footer />
        </Box>
        {currentUser && windowWidth >= 786 && (
          <Provider store={store}>
            <Chat
              isMinimized={isChatMinimized}
              toggleMinimize={() => setIsChatMinimized(prevState => !prevState)}
            />
          </Provider>
        )}
      </Flex>
    </>
  )
}
