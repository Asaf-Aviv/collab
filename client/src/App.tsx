import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { hot } from 'react-hot-loader/root'
import CreateCollab from './components/CreateCollab/CreateCollab'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

const USERS = gql`
  {
    users {
      id
      username
      email
    }
  }
`

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
  const { data, loading, error } = useQuery(USERS)
  const [login] = useMutation(LOGIN, {
    variables: {
      credentials: { email: 'asafaviv89@gmail.com', password: 'test1234' },
    },
  })

  useEffect(() => {
    login()
  }, [login])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <ThemeProvider>
      <CSSReset />
      <div>
        {data.users.map((user: any) => (
          <div key={user.id}>{user.username}</div>
        ))}
        <CreateCollab />
      </div>
    </ThemeProvider>
  )
}

export default hot(App)
