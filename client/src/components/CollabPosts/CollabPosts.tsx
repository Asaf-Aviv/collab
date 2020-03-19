import React from 'react'
import { useCollabPostsQuery, CollabPostsQuery } from '../../graphql/generates'
import { Link as RouterLink } from 'react-router-dom'
import { Flex, SimpleGrid, Heading, Tag, Link } from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import { Container } from '../global'

export const CollabPosts = () => {
  const { data, loading, error } = useCollabPostsQuery()

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch Collabs</h1>
  if (!data) return null

  const { collabPosts } = data

  return (
    <main>
      <Container>
        <SimpleGrid as="section" columns={{ lg: 1, xl: 2 }} spacing={6}>
          {collabPosts.map(post => (
            <CollabPostCard key={post.id} {...post} />
          ))}
        </SimpleGrid>
      </Container>
    </main>
  )
}

const CollabPostCard = ({
  id,
  title,
  stack,
  experience,
  // createdAt,
  // isNew,
  // hasStarted,
  owner,
}: CollabPostsQuery['collabPosts'][0]) => (
  <Flex
    direction="column"
    align="start"
    as="article"
    bg="#FFF"
    h="100%"
    boxShadow="2px 6px 15px 0 rgba(179, 163, 204, 0.38)"
    borderRadius={6}
  >
    <Flex p={4} w="100%" align="center" justify="space-between">
      <AvatarWithUsername size="sm" {...owner} />
      {/* {Number(createdAt) < (new Date().getTime())} */}
      <Flex align="center">
        <Tag boxShadow="sm" mr={2} size="sm" variantColor="pink">
          {experience}
        </Tag>
        <Tag boxShadow="sm" size="sm" variantColor="green">
          NEW
        </Tag>
      </Flex>
    </Flex>
    <Link
      as={RouterLink as any}
      h="100%"
      px={4}
      key={id}
      w="100%"
      zIndex={1}
      //@ts-ignore
      to={`/collabs/posts/${id}`}
      _hover={{ textDecoration: 'none' }}
    >
      <Heading flex={1} size="md" mt={4} mb={6} as="h2">
        {title}
      </Heading>
    </Link>
    <Flex bg="#f2f2ff" p={4} w="100%">
      {stack.map(tech => (
        <Tag boxShadow="sm" size="sm" variantColor="purple" key={tech} mr={2}>
          {tech}
        </Tag>
      ))}
    </Flex>
  </Flex>
)
