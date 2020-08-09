import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea, Box } from '@chakra-ui/core'
import { useSendPrivateChatMessageMutation } from '../../../graphql/generates'
import { messagesActions, RootState } from '../reducers/reducers'

export const ChatInput = () => {
  const dispatch = useDispatch()
  const friend = useSelector(
    ({ users, messages }: RootState) => users[messages.selectedFriendId!],
  )
  const [messageContent, setMessageContent] = useState('')
  const [sendMessage] = useSendPrivateChatMessageMutation({
    variables: {
      input: {
        recipientId: friend.id,
        content: messageContent,
      },
    },
    onCompleted({ sendPrivateChatMessage }) {
      setMessageContent('')
      dispatch(
        messagesActions.messageSent({
          recipientId: friend.id,
          message: sendPrivateChatMessage,
        }),
      )
    },
  })

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && messageContent.trim()) {
      sendMessage()
      return
    }
  }

  return (
    <Box p={2}>
      <Textarea
        autoFocus
        p={2}
        fontSize="0.75rem"
        placeholder={`Message ${friend.username}`}
        resize="none"
        bg="#e3dcf3"
        borderColor="transparent"
        minHeight={60}
        _hover={{ borderColor: '#cab3ff' }}
        _focus={{ borderColor: '#805ad5' }}
        onKeyPress={handleKeyDown}
        value={messageContent}
        onChange={(e: any) => setMessageContent(e.target.value)}
        _placeholder={{ color: '#676767' }}
      />
    </Box>
  )
}
