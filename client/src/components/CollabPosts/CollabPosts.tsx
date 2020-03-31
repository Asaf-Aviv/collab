import React from 'react'
import { useCollabPostsQuery, CollabPostsQuery } from '../../graphql/generates'
import { Link as RouterLink } from 'react-router-dom'
import { Flex, SimpleGrid, Heading, Tag, Link } from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import { Container, Paper } from '../global'
import { CommentsAndReactionsCount } from '../CommentsAndReactionsCount/CommentsAndReactionsCount'

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
  languages,
  reactionsCount,
  commentsCount,
  // createdAt,
  // isNew,
  // hasStarted,
  owner,
}: CollabPostsQuery['collabPosts'][0]) => (
  <Paper h="100%" direction="column" align="start" as="article">
    <Flex p={4} w="100%" align="center" justify="space-between">
      <AvatarWithUsername size="sm" {...owner} />
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
      // @ts-ignore
      to={`/collabs/posts/${id}`}
      h="100%"
      px={4}
      key={id}
      w="100%"
      flex={1}
      zIndex={1}
      _hover={{ textDecoration: 'none' }}
    >
      <Heading size="md" fontWeight={500} pb={6} as="h2">
        {title}
      </Heading>
    </Link>
    <Flex bg="#f2f2ff" p={4} w="100%">
      {languages.map(language => (
        <Tag
          boxShadow="sm"
          size="sm"
          variantColor="purple"
          key={language}
          mr={2}
        >
          {language}
        </Tag>
      ))}
      {stack.map(tech => (
        <Tag boxShadow="sm" size="sm" variantColor="pink" key={tech} mr={2}>
          {tech}
        </Tag>
      ))}
      <CommentsAndReactionsCount
        ml="auto"
        reactionsCount={reactionsCount}
        commentsCount={commentsCount}
      />
    </Flex>
  </Paper>
)
