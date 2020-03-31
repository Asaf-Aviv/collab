import React from 'react'
import { useParams } from 'react-router-dom'
import { useUserQuery } from '../../graphql/generates'
import { Container } from '../global'
import { Flex, Avatar, Heading } from '@chakra-ui/core'

export const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data } = useUserQuery({ variables: { id: userId } })

  if (!data?.user) return null

  console.log(data)
  const { username, avatar } = data.user

  return (
    <Container>
      <Flex>
        <Flex
          direction="column"
          bg="white"
          p={8}
          borderRadius={6}
          boxShadow="md"
          align="center"
        >
          <Avatar mb={4} size="lg" src={avatar!} name={username} />
          <Heading as="h1" size="sm">
            {username}
          </Heading>
        </Flex>
        <Flex flex={1}></Flex>
      </Flex>
    </Container>
  )
}
