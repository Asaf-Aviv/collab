import React, { useEffect, useState } from 'react'
import { Box, Flex } from '@chakra-ui/core'
import { NavBar } from '../../navbar'
import { Footer } from '../Footer'
import { Routes } from '../../routes'
import { Chat, ChatProvider } from '../../chat'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import { useLocation } from 'react-router-dom'
import { PageHeaderSpacing } from '../../../components/global'
import { useWindowWidth } from '../../../providers'

export const Layout = () => {
  const currentUser = useCurrentUser()
  const location = useLocation()
  const [isChatMinimized, setIsChatMinimized] = useState(true)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <>
      <NavBar />
      <Flex bg="bg" color="text">
        <Box flex={1}>
          <Box pt="64px" minHeight="100vh" pb={8}>
            {location.pathname !== '/' && <PageHeaderSpacing />}
            <Routes />
          </Box>
          <Footer />
        </Box>
        {currentUser && windowWidth >= 768 && (
          <ChatProvider>
            <Chat
              isMinimized={isChatMinimized}
              toggleMinimize={() => setIsChatMinimized(prevState => !prevState)}
            />
          </ChatProvider>
        )}
      </Flex>
    </>
  )
}
