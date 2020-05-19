import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Text, Heading, Flex, PseudoBox } from '@chakra-ui/core'
import { useCurrentUserConversationQuery } from '../../../graphql/generates'
import styled from '@emotion/styled'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'
import { DisplayDate } from '../../../components/DisplayDate'

export const Conversation = () => {
  const { userId } = useParams<{ userId: string }>()
  const {
    data,
    loading,
    error,
    refetch,
    fetchMore,
  } = useCurrentUserConversationQuery({
    variables: { userId, offset: 0, limit: 10 },
  })

  const { messages, hasNextPage } = data?.getConversation || {}

  return (
    <Box as="main" flex={1} pb={4}>
      {messages && (
        <Heading as="h1" size="md" mb={4} fontWeight={500}>
          Conversation with{' '}
          {
            messages?.find(message => message.author?.id === userId)?.author
              ?.username
          }
        </Heading>
      )}
      <section>
        {messages?.map(message => (
          <PseudoBox
            key={message.id}
            py={4}
            px={2}
            _notFirst={{
              borderTop: '1px solid #e1e1e1',
            }}
          >
            <Flex align="center" mb={4}>
              {message.author ? (
                <AvatarWithUsername size="sm" {...message.author} />
              ) : (
                <Text as="span">Deleted user</Text>
              )}
              <DisplayDate date={message.creationDate} ml={2} />
            </Flex>
            <Text pl={10}>{message.content}</Text>
          </PseudoBox>
        ))}
        {loading && <Loader />}
        {error && (
          <DisplayError
            message="Could not fetch conversation"
            onClick={() => refetch()}
          />
        )}
      </section>
    </Box>
  )
}

const StyledLink = styled(Link)`
  font-weight: 600;
`
