import React from 'react'
import { useParams, Link, useRouteMatch } from 'react-router-dom'
import { Heading, Flex, Box, Text } from '@chakra-ui/core'
import { CommentsAndReactionsCount } from '../../../components/CommentsAndReactionsCount'
import { Paper } from '../../../components/global'
import { useCollabDiscussionThreadsQuery } from '../../../graphql/generates'

export const CollabDiscussions = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const match = useRouteMatch()
  const { data, loading, error, variables } = useCollabDiscussionThreadsQuery({
    variables: { collabId },
  })

  return (
    <Box as="main" maxWidth={900} mx="auto">
      <section>
        {data?.collab?.discussionThreads.map(
          ({ id, title, author, commentsCount, reactionsCount }) => (
            <Paper as="article" key={id} p={3} mb={4}>
              <Box as="header" flex={1}>
                <Heading size="sm" fontWeight={600} pb={6} as="h3">
                  <Link to={`${match.url}/${id}`}>{title}</Link>
                </Heading>
                <Flex fontSize="0.875rem">
                  <Text color="gray.400" mr={4}>
                    Opened by{' '}
                    {author ? (
                      <Link to={`/user/${id}/${author.id}`}>
                        <Text as="span" color="text" fontWeight={500}>
                          {author?.username}
                        </Text>
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
            </Paper>
          ),
        )}
      </section>
    </Box>
  )
}
