import React from 'react'
import { hot } from 'react-hot-loader/root'
import { NavBar } from '../NavBar/NavBar'
import { Routes } from '../Routes'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

export const App = hot(() => {
  return (
    <ThemeProvider>
      <CSSReset />
      <NavBar />
      <Routes />
    </ThemeProvider>
  )
})
