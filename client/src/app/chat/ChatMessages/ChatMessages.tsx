import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Flex, Text, Avatar, Heading, PseudoBox } from '@chakra-ui/core'
import { debounce } from 'lodash-es'
import styled from '@emotion/styled'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import { RootState } from '../reducers'
import { ChatMessageBubble } from '../ChatMessageBubble'

type Props = {
  friendId: string
}

export const ChatMessages = ({ friendId }: Props) => {
  const currentUser = useCurrentUser()!
  const messages = useSelector(
    (state: RootState) => state.messages[friendId] || [],
  )
  const friend = useSelector((state: RootState) => state.users[friendId])
  const [showNewMessagesPopup, setShowNewMessagesPopup] = useState(false)
  const isAtBottomRef = useRef(true)
  const messagesListRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (!messagesListRef.current) return

    const handleScroll = debounce((e: Event) => {
      if (!messagesListRef.current) return
      const { scrollHeight, scrollTop, clientHeight } = messagesListRef.current
      // This check is taking into account the display scaling
      // on OS for UHD displays and the scaling/zoom of the browser
      const atBottom = Math.ceil(scrollHeight - scrollTop) === clientHeight
      isAtBottomRef.current = atBottom
      if (atBottom) {
        setShowNewMessagesPopup(false)
      }
    }, 30)

    const messagesList = messagesListRef.current

    messagesList.addEventListener('scroll', handleScroll)
    return () => messagesList.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToBottom = () => {
    if (!messagesListRef.current) return

    messagesListRef.current.scrollTo({
      top: messagesListRef.current.scrollHeight,
    })
  }

  useLayoutEffect(() => {
    if (isAtBottomRef.current) {
      scrollToBottom()
      return
    }

    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.authorId !== currentUser.id) {
      setShowNewMessagesPopup(true)
    }
  }, [messages])

  return (
    <Box
      ref={messagesListRef}
      as="ul"
      p={2}
      flex={1}
      listStyleType="none"
      overflowY="auto"
      position="relative"
    >
      {messages.map(message => (
        <ChatMessageBubble
          key={message.id}
          message={message}
          author={message.authorId === friendId ? friend : currentUser}
          isAuthor={message.authorId === currentUser.id}
        />
      ))}
      {showNewMessagesPopup && (
        <Box
          position="sticky"
          bottom="0"
          m="0 auto"
          borderRadius={6}
          bg="rgba(0,0,0,0.7)"
          width="150px"
        >
          <NewMessagesPopup
            aria-label="scroll to bottom"
            onClick={() => {
              setShowNewMessagesPopup(false)
              scrollToBottom()
            }}
          >
            New Messages
          </NewMessagesPopup>
        </Box>
      )}
    </Box>
  )
}

const NewMessagesPopup = styled.button`
  font-weight: 600;
  color: white;
  display: block;
  font-size: 0.75rem;
  padding: 0.25rem;
  width: 100%;
`
