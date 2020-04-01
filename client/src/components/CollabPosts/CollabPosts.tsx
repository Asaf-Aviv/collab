import React from 'react'
import { useCollabPostsQuery, CollabPostsQuery } from '../../graphql/generates'
import { Link as RouterLink } from 'react-router-dom'
import { Flex, SimpleGrid, Heading, Tag, Link, Text } from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import { Container, Paper } from '../global'
import { CommentsAndReactionsCount } from '../CommentsAndReactionsCount/CommentsAndReactionsCount'
import { formatDate } from '../../utils'

export const CollabPosts = () => {
  const { data, loading, error, fetchMore } = useCollabPostsQuery({
    variables: {
      offset: 0,
      limit: 10,
    },
    notifyOnNetworkStatusChange: true,
  })

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch Collabs</h1>
  if (!data?.collabPosts) return null

  const { posts, hasNextPage } = data.collabPosts

  return (
    <main>
      <Container>
        <SimpleGrid as="section" columns={{ lg: 1, xl: 2 }} spacing={6}>
          {posts.map(post => (
            <CollabPostCard key={post.id} {...post} />
          ))}
          {hasNextPage && (
            <button
              onClick={() =>
                fetchMore({
                  variables: {
                    offset: posts.length,
                    limit: 10,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev
                    return {
                      collabPosts: {
                        ...prev.collabPosts,
                        hasNextPage: fetchMoreResult.collabPosts.hasNextPage,
                        posts: [
                          ...prev.collabPosts.posts,
                          ...fetchMoreResult.collabPosts.posts,
                        ],
                      },
                    }
                  },
                })
              }
            >
              fetch more
            </button>
          )}
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
  createdAt,
  isNew,
  membersCount,
  // hasStarted,
  owner,
}: NonNullable<CollabPostsQuery['collabPosts']>['posts'][0]) => (
  <Paper h="100%" direction="column" align="start" as="article">
    <Flex p={4} w="100%" align="center" justify="space-between">
      <Flex align="center">
        <AvatarWithUsername size="sm" {...owner} />
        <Text ml={2} as="time" fontSize="0.9rem">
          {formatDate(createdAt)}
        </Text>
        <Text ml={2} fontSize="0.9rem">
          {`${membersCount} ${membersCount > 1 ? 'members' : 'member'}`}
        </Text>
      </Flex>
      <Flex align="center">
        <Tag boxShadow="sm" mr={2} size="sm" variantColor="pink">
          {experience}
        </Tag>
        {isNew && (
          <Tag boxShadow="sm" size="sm" variantColor="green">
            NEW
          </Tag>
        )}
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
