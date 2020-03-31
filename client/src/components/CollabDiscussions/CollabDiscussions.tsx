import React from 'react'
import { useCollabDiscussionThreadsQuery } from '../../graphql/generates'
import { useParams, Link, useRouteMatch } from 'react-router-dom'
import { Heading, Flex, Box, Text } from '@chakra-ui/core'
import { CommentsAndReactionsCount } from '../CommentsAndReactionsCount/CommentsAndReactionsCount'

export const CollabDiscussions = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const match = useRouteMatch()
  const { data, loading, error, variables } = useCollabDiscussionThreadsQuery({
    variables: { collabId },
  })

  console.log(data, loading, error, variables)

  return (
    <Box>
      {data?.collab?.discussionThreads.map(
        ({ id, title, author, commentsCount, reactionsCount }) => (
          <Flex
            key={id}
            py={4}
            px={6}
            bg="white"
            borderRadius={6}
            boxShadow="md"
            mb={4}
          >
            <Box flex={1}>
              <Heading as="h3" size="md" mb={2}>
                <Link to={`${match.url}/${id}`}>{title}</Link>
              </Heading>
              <Flex>
                <Text color="gray.400" mr={2}>
                  Opened by{' '}
                  {author ? (
                    <Link to={`/user/${id}/${author.id}`}>
                      {author?.username}
                    </Link>
                  ) : (
                    '[deleted user]'
                  )}{' '}
                  on put date here
                </Text>
                <CommentsAndReactionsCount
                  reactionsCount={reactionsCount}
                  commentsCount={commentsCount}
                />
              </Flex>
            </Box>
          </Flex>
        ),
      )}
    </Box>
  )
}
