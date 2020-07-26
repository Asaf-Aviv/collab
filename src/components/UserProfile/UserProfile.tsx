import React from 'react'
import { useParams } from 'react-router-dom'
import { useUserQuery } from '../../graphql/generates'
import { Container } from '../global'
import { Heading } from '@chakra-ui/core'
import { UserCard } from '../UserCard'
import { Loader } from '../Loader'
import { DisplayError } from '../DisplayError'
import { SEO } from '../SEO'

export const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data, loading, error, refetch } = useUserQuery({
    variables: { id: userId },
  })

  const user = data?.user

  return (
    <Container>
      {user && (
        <>
          <SEO
            title={`${user.username}'s Profile`}
            url={window.location.href}
          />
          <UserCard {...user} showDotsMenu mx="auto" maxWidth={350} />
        </>
      )}
      {user === null && (
        <Heading textAlign="center" size="md" as="h1" py={4}>
          User not found
        </Heading>
      )}
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
