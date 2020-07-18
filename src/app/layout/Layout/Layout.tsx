import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/core'
import ReactGA from 'react-ga'
import { NavBar } from '../../navbar'
import { Footer } from '../Footer'
import { Routes } from '../../routes'
import { Chat, ChatProvider } from '../../chat'
import { useCurrentUser } from '../../../providers'
import { useLocation } from 'react-router-dom'
import { PageHeaderSpacing } from '../../../components/global'
import { useWindowWidth } from '../../../providers'

export const Layout = () => {
  const currentUser = useCurrentUser()
  const location = useLocation()
  const { pathname } = location
  const [isChatMinimized, setIsChatMinimized] = useState(true)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search)
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <>
      <NavBar />
      <Box bg="bg" color="text">
        <Box flex={1}>
          <Box pt="64px" minHeight="100vh">
            {pathname !== '/' && !pathname.includes('/collab/') && (
              <PageHeaderSpacing />
            )}
            <Routes />
          </Box>
          <Footer />
        </Box>
      </Box>
      {currentUser && windowWidth >= 768 && (
        <ChatProvider>
          <Chat
            isMinimized={isChatMinimized}
            toggleMinimize={() => setIsChatMinimized(prevState => !prevState)}
          />
        </ChatProvider>
      )}
    </>
  )
}
