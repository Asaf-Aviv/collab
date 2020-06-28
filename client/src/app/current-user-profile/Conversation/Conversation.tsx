import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import produce from 'immer'
import { Box, Text, Heading, Flex, PseudoBox, Button } from '@chakra-ui/core'
import { useCurrentUserConversationQuery } from '../../../graphql/generates'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'
import { DisplayDate } from '../../../components/DisplayDate'
import { useOnVisibilty } from '../../../hooks/useOnVisibilty'
import { SendMessageModal } from '../SendMessageModal'
import { useWindowWidth } from '../../../providers'

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
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false)
  const width = useWindowWidth()
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

  const recipient = messages?.find(message => message.author?.id === userId)
    ?.author

  return (
    <Box as="main" flex={1} pb={4}>
      <Flex align="center" as="header" justify="space -between" mb={4}>
        {messages && (
          <>
            <Heading as="h1" size="md" fontWeight={500}>
              {recipient?.username}
            </Heading>
            <Button
              size={width >= 480 ? 'md' : 'sm'}
              variantColor="purple"
              onClick={() => setIsSendMessageModalOpen(true)}
            >
              Send Message
            </Button>
            {isSendMessageModalOpen && (
              <SendMessageModal
                closeModal={() => setIsSendMessageModalOpen(false)}
                recipient={recipient ?? undefined}
              />
            )}
          </>
        )}
      </Flex>
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
