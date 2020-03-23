import React from 'react'
import { hot } from 'react-hot-loader/root'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import { Routes } from '../Routes'
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core'

export const App = hot(() => {
  return (
    <ThemeProvider>
      <CSSReset />
      <NavBar />
      <Box bg="#f7fbff" pt="96px" minHeight="100vh">
        <Routes />
      </Box>
      <Footer />
    </ThemeProvider>
  )
})
