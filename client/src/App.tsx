import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { hot } from 'react-hot-loader/root'
import { CreateCollab } from './components/CreateCollab/CreateCollab'
import { NavBar } from './components/NavBar/NavBar'

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

const App = () => {
  const [login] = useMutation(LOGIN, {
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
      <CreateCollab />
    </div>
  )
}

export default hot(App)
