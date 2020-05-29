import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import produce from 'immer'
import { Box, Text, Heading, Flex, PseudoBox } from '@chakra-ui/core'
import { useCurrentUserConversationQuery } from '../../../graphql/generates'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'
import { DisplayDate } from '../../../components/DisplayDate'
import { useOnVisibilty } from '../../../hooks/useOnVisibilty'

export const Conversation = () => {
  const { userId } = useParams<{ userId: string }>()
  const loadNextPageTriggerRef = useRef<HTMLSpanElement | null>(null)
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

  const handleNextPageLoad = () => {
    if (!messages) return

    fetchMore({
      variables: {
        userId,
        offset: messages.length,
        limit: 10,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        const { hasNextPage, messages } = fetchMoreResult.getConversation

        const getConversation = produce(prev.getConversation, draft => {
          draft.hasNextPage = hasNextPage
          draft.messages.unshift(...messages)
        })

        return { getConversation }
      },
    }).catch(() => {})
  }

  useOnVisibilty(
    loadNextPageTriggerRef,
    handleNextPageLoad,
    hasNextPage && !loading,
  )

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
