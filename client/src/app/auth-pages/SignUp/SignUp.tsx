import React, { useState, FormEvent } from 'react'
import { useSignUpMutation } from '../../../graphql/generates'
import { Button, Box, Stack, Heading, Link, Text } from '@chakra-ui/core'
import { Container } from '../../../components/global'
import { InputWithLabel } from '../../../components/InputWithLabel/InputWithLabel'
import { Link as RouterLink } from 'react-router-dom'
import { useAuthActions } from '../../../providers'

export const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { getCurrentUser } = useAuthActions()
  const [signup, { loading }] = useSignUpMutation({
    variables: {
      credentials: { username, email, password },
    },
    onCompleted: async ({ signUp }) => {
      localStorage.setItem('token', signUp.token)
      getCurrentUser()
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return

    signup()
  }

  return (
    <Container>
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
