import React, { useState, FormEvent } from 'react'
import {
  useLoginMutation,
  useGetCurrentUserLazyQuery,
} from '../../graphql/generates'
import { Button, Box, Stack, Heading, Link, Text } from '@chakra-ui/core'
import { Container, PageHeaderSpacing } from '../global'
import { InputWithLabel } from '../InputWithLabel/InputWithLabel'
import { Link as RouterLink } from 'react-router-dom'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [getCurrentUser] = useGetCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  })
  const [login, { loading }] = useLoginMutation({
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
    if (loading) return

    login()
  }

  return (
    <Container>
      <PageHeaderSpacing />
      <Heading as="h1" mb={8} textAlign="center">
        Login
      </Heading>
      <Box as="form" onSubmit={handleSubmit} maxWidth={400} mx="auto">
        <Stack spacing={8}>
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
              autoComplete="current-password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </Box>
          <Link
            //@ts-ignore
            as={RouterLink}
            style={{ marginBottom: '1rem' }}
            py={2}
            mt={-4}
            // mb="1rem !important"
            color="#7a5eb5"
            _hover={{ color: '#483277', textDecoration: 'underline' }}
            to="/forgot"
          >
            Forgot password?
          </Link>
          <Button type="submit" variantColor="purple">
            Login
          </Button>
          <Text>
            don't have an account?
            <Link
              //@ts-ignore
              as={RouterLink}
              ml={4}
              py={2}
              color="#7a5eb5"
              _hover={{ color: '#483277', textDecoration: 'underline' }}
              to="/signup"
            >
              Sign Up
            </Link>
          </Text>
        </Stack>
      </Box>
    </Container>
  )
}
