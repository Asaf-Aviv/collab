import React, { useState, FormEvent } from 'react'
import {
  useLoginMutation,
  useGetCurrentUserLazyQuery,
} from '../../graphql/generates'
import { FormControl, Input, FormLabel, Button } from '@chakra-ui/core'
import { gql } from 'apollo-boost'

export const LOGIN = gql`
  mutation Login($credentials: LoginArgs!) {
    login(credentials: $credentials) {
      token
    }
  }
`

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [getCurrentUser] = useGetCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  })
  const [login] = useLoginMutation({
    variables: {
      credentials: { email, password },
    },
    onCompleted: async ({ login }) => {
      localStorage.setItem('token', login.token)
      getCurrentUser()
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login()
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
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

export default Login
