import React, { useState, FormEvent, useEffect } from 'react'
import {
  useSignUpMutation,
  useGetCurrentUserLazyQuery,
} from '../../graphql/generates'
import { Button, Box, Stack, Heading, Link, Text } from '@chakra-ui/core'
import { Container, PageHeaderSpacing } from '../global'
import { InputWithLabel } from '../InputWithLabel/InputWithLabel'
import { useHistory, Link as RouterLink } from 'react-router-dom'

export const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const [getCurrentUser, { data }] = useGetCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  })
  const [signup, { loading }] = useSignUpMutation({
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
    if (loading) return

    signup()
  }

  return (
    <Container>
      <PageHeaderSpacing />
      <Heading as="h1" mb={8} textAlign="center">
        Sign Up
      </Heading>
      <Box as="form" onSubmit={handleSubmit} maxWidth={400} mx="auto">
        <Stack spacing={8}>
          <Box>
            <InputWithLabel
              label="Username"
              htmlFor="username"
              id="username"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
            />
          </Box>
          <Box>
            <InputWithLabel
              label="Email address"
              htmlFor="email"
              id="email"
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </Box>
          <Box>
            <InputWithLabel
              label="Password"
              htmlFor="password"
              id="password"
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </Box>
          <Button type="submit" variantColor="purple">
            Signup
          </Button>
          <Text>
            Already have an account?
            <Link
              //@ts-ignore
              as={RouterLink}
              ml={4}
              py={2}
              color="#7a5eb5"
              _hover={{ color: '#483277', textDecoration: 'underline' }}
              to="/login"
            >
              Log In
            </Link>
          </Text>
        </Stack>
      </Box>
    </Container>
  )
}
