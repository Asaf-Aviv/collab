import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/core'
import ReactGA from 'react-ga'
import { useLocation } from 'react-router-dom'
import { NavBar } from '../../navbar'
import { Footer } from '../Footer'
import { Routes } from '../../routes'
import { ChatProvider } from '../../chat'
import { PageHeaderSpacing } from '../../../components/global'

export const Layout = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    ReactGA.pageview(pathname + search)
    window.scrollTo({ top: 0 })
  }, [pathname, search])

  return (
    <>
      <NavBar />
      <Box bg="bg" color="text">
        <Box pt="64px" minHeight="100vh">
          {pathname !== '/' && !pathname.includes('/collab/') && (
            <PageHeaderSpacing />
          )}
          <Routes />
        </Box>
        <Footer />
      </Box>
      <ChatProvider />
    </>
  )
}
