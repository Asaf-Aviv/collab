import React from 'react'
import { hot } from 'react-hot-loader/root'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import { Routes } from '../Routes'
import { ThemeProvider, CSSReset, Box, theme } from '@chakra-ui/core'

export const App = hot(() => {
  return (
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
      <Box bg="#f7fbff" pt="96px" minHeight="100vh">
        <Routes />
      </Box>
      <Footer />
    </ThemeProvider>
  )
})
