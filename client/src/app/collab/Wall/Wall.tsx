import React, { useRef, useState } from 'react'
import produce from 'immer'
import {
  useCollabWallMessagesQuery,
  useCreateWallMessageMutation,
  useDeleteWallMessageMutation,
} from '../../../graphql/generates'
import { useParams } from 'react-router-dom'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'
import { Text, Box, Flex, PseudoBox, Button, Textarea } from '@chakra-ui/core'
import { DisplayError } from '../../../components/DisplayError'
import { DisplayDate } from '../../../components/DisplayDate'
import { Loader } from '../../../components/Loader'
import { useOnVisibilty } from '../../../hooks/useOnVisibilty'
import { DotsMenu } from '../../../components/DotsMenu/Index'

export const Wall = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const {
    data,
    loading,
    error,
    refetch,
    fetchMore,
  } = useCollabWallMessagesQuery({
    variables: {
      input: {
        collabId,
        offset: 0,
        limit: 10,
      },
    },
    notifyOnNetworkStatusChange: true,
  })
  const loadNextPageTriggerRef = useRef<HTMLSpanElement | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [createMessage] = useCreateWallMessageMutation({
    variables: {
      input: {
        collabId,
        content: messageInput,
      },
    },
    onCompleted() {
      refetch()
      setMessageInput('')
    },
  })
  const [deleteMessage] = useDeleteWallMessageMutation({
    onCompleted() {
      refetch()
    },
  })

  const { hasNextPage, messages } = data?.collabWallMessages ?? {}

  const handleNextPageLoad = () => {
    if (!messages || loading) return

    fetchMore({
      variables: {
        input: {
          collabId,
          offset: messages.length,
          limit: 10,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        const { hasNextPage, messages } = fetchMoreResult.collabWallMessages

        const collabWallMessages = produce(prev.collabWallMessages, draft => {
          draft.hasNextPage = hasNextPage
          draft.messages.push(...messages)
        })

        return { collabWallMessages }
      },
    }).catch(() => {})
  }

  useOnVisibilty(
    loadNextPageTriggerRef,
    handleNextPageLoad,
    hasNextPage && !loading,
  )

  return (
    <Flex
      as="main"
      height={[
        'calc(100vh - 64px - 50px)',
        'calc(100vh - 64px - 50px)',
        'calc(100vh - 64px - 4rem)',
      ]}
      direction="column"
    >
      <Box
        as="section"
        flex={1}
        minHeight="0px"
        overflowY="auto"
        bg="#f2f2ff"
        borderRadius={6}
      >
        {messages?.map(message => (
          <PseudoBox
            as="article"
            key={message.id}
            py={4}
            px={2}
            _notFirst={{
              borderTop: '1px solid #e1e1e1',
            }}
            _hover={{
              bg: '#EEE',
            }}
          >
            <Flex align="center" mb={2} justify="space-between">
              <Flex>
                <AvatarWithUsername
                  size="xs"
                  fontSize="0.85rem"
                  mr={2}
                  {...message.author}
                />
                <DisplayDate date={message.creationDate} />
              </Flex>
              {message.isAuthor && (
                <DotsMenu iconProps={{ ariaLabel: 'Message Options' }}>
                  <Button
                    onClick={() =>
                      deleteMessage({ variables: { messageId: message.id } })
                    }
                  >
                    Delete
                  </Button>
                </DotsMenu>
              )}
            </Flex>
            <Text pl={8}>{message.content}</Text>
          </PseudoBox>
        ))}
        {loading && <Loader />}
        {!error && <span ref={loadNextPageTriggerRef} />}
        {error && (
          <DisplayError
            message="Could not fetch wall messages"
            onClick={() => refetch()}
          />
        )}
      </Box>
      <Box as="form" onSubmit={e => e.preventDefault()} mt={4}>
        <Textarea
          bg="#f2f2ff"
          placeholder="Add a message to the wall"
          p={2}
          mb={4}
          _hover={{ borderColor: '#cab3ff' }}
          _focus={{ borderColor: '#805ad5' }}
          value={messageInput}
          onChange={(e: any) => setMessageInput(e.target.value)}
          height={100}
          resize="none"
        />
        <Button
          ml="auto"
          display="block"
          variantColor="purple"
          type="submit"
          onClick={() => createMessage()}
        >
          Post Message
        </Button>
      </Box>
    </Flex>
  )
}
