import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { hot } from 'react-hot-loader/root'
import { NavBar } from '../NavBar/NavBar'
import { Routes } from '../Routes'
import { useLoginMutation } from '../../graphql/generates'

export const LOGIN = gql`
  mutation Login($credentials: LoginArgs!) {
    login(credentials: $credentials) {
      token
      user {
        id
        username
        email
      }
    }
  }
`

export const App = hot(() => {
  const [login] = useLoginMutation({
    variables: {
      credentials: { email: 'asafaviv89@gmail.com', password: 'test1234' },
    },
    onCompleted: ({ login }) => {
      localStorage.setItem('token', login.token)
    },
  })

  useEffect(() => {
    login()
  }, [login])

  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  )
})
