import React from 'react'
import { gql } from 'apollo-boost'
import { useCollabPostsQuery, CollabPostsQuery } from '../../graphql/generates'
import { Link } from 'react-router-dom'
import { Flex, SimpleGrid, Heading, Button } from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import styled from '@emotion/styled'

export const GET_COLLAB_POSTS = gql`
  query CollabPosts {
    collabPosts {
      id
      title
      stack
      experience
      hasStarted
      owner {
        id
        username
        avatar
      }
    }
  }
`

export const CollabPosts = () => {
  const { data, loading, error } = useCollabPostsQuery()

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch Collabs</h1>
  if (!data) return null

  const { collabPosts } = data

  return (
    <main>
      <SimpleGrid as="section" columns={2} spacing={10}>
        {collabPosts.map(post => (
          <CollabPostCard key={post.id} {...post} />
        ))}
      </SimpleGrid>
    </main>
  )
}

const CollabPostCard = ({
  id,
  title,
  stack,
  experience,
  // hasStarted,
  owner,
}: CollabPostsQuery['collabPosts'][0]) => (
  <Flex
    direction="column"
    align="start"
    as="article"
    boxShadow="xl"
    p={4}
    h="100%"
  >
    <Flex w="100%" align="center" justify="space-between">
      <AvatarWithUsername size="sm" {...owner} />
      <Button as="span" size="xs" variant="solid" variantColor="pink">
        {experience}
      </Button>
    </Flex>
    <StyledLink key={id} to={`/collabs/posts/${id}`}>
      <Heading flex={1} size="md" my={2} as="h2">
        {title}
      </Heading>
    </StyledLink>
    <Flex>
      {stack.map(tech => (
        <Button
          key={tech}
          as="span"
          size="xs"
          variant="solid"
          variantColor="pink"
          mr={2}
        >
          {tech}
        </Button>
      ))}
    </Flex>
  </Flex>
)

const StyledLink = styled(Link)`
  height: 100%;
`
