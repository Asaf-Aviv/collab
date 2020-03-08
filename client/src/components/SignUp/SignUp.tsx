import React, { useState, FormEvent, useEffect } from 'react'
import {
  useSignUpMutation,
  useGetCurrentUserLazyQuery,
} from '../../graphql/generates'
import { FormControl, Input, FormLabel, Button } from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import { gql } from 'apollo-boost'

export const SIGNUP = gql`
  mutation SignUp($credentials: SignUpArgs!) {
    signUp(credentials: $credentials) {
      token
    }
  }
`

export const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const [getCurrentUser, { data }] = useGetCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  })
  const [login] = useSignUpMutation({
    variables: {
      credentials: { username, email, password },
    },
    onCompleted: async ({ signUp }) => {
      localStorage.setItem('token', signUp.token)
      getCurrentUser()
    },
  })

  useEffect(() => {
    if (data?.currentUser) {
      history.push('/')
    }
  }, [data, history])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login()
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
          id="username"
        />
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          type="email"
          id="email"
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
        <Button type="submit">Login</Button>
      </FormControl>
    </form>
  )
}
