import React from 'react'
import { useCollabDiscussionThreadsQuery } from '../../graphql/generates'
import { useParams, Link, useRouteMatch } from 'react-router-dom'
import { Heading, Flex, Box, Text, Icon } from '@chakra-ui/core'

export const Discussions = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const match = useRouteMatch()
  const { data, loading, error, variables } = useCollabDiscussionThreadsQuery({
    variables: { collabId },
  })

  console.log(data, loading, error, variables)

  return (
    <Box>
      {data?.collab?.discussionThreads.map(
        ({ id, title, author, commentsCount }) => (
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
                <Text color="gray.400">
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
                <Flex align="center" ml={4}>
                  <Icon name="chat" />
                  <Text as="span" fontWeight={700} ml={1}>
                    {commentsCount}
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box ml={2}></Box>
          </Flex>
        ),
      )}
    </Box>
  )
}
