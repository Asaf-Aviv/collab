import React from 'react'
import { useParams } from 'react-router-dom'
import { useUserQuery } from '../../graphql/generates'
import { Container } from '../global'
import { Heading } from '@chakra-ui/core'
import { UserCard } from '../UserCard'
import { Loader } from '../Loader'
import { DisplayError } from '../DisplayError'

type Props = {
  userId: string
  onCompleted?: (friendId: string) => void
}

export const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data, loading, error, refetch } = useUserQuery({
    variables: { id: userId },
  })

  const user = data?.user

  return (
    <Container>
      {user === null && (
        <Heading textAlign="center" size="md" as="h1" py={4}>
          User not found
        </Heading>
      )}
      {user && <UserCard {...user} mx="auto" maxWidth={350} />}
      {loading && <Loader />}
      {error && (
        <DisplayError
          onClick={() => refetch()}
          message="Could not fetch user"
        />
      )}
    </Container>
  )
}
