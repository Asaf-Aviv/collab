import React, { useEffect } from 'react'
import { gql } from 'apollo-boost'

import { hot } from 'react-hot-loader/root'
import { NavBar } from '../NavBar/NavBar'
import { Routes } from '../Routes'
import { useGetCurrentUserQuery } from '../../graphql/generates'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      username
      avatar
      email
    }
  }
`

export const App = hot(() => {
  return (
    <ThemeProvider>
      <CSSReset />
      <NavBar />
      <Routes />
    </ThemeProvider>
  )
})
