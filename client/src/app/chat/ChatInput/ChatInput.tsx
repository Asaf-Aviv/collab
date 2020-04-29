import React, { useState } from 'react'
import { useSendPrivateChatMessageMutation } from '../../../graphql/generates'
import { messagesActions, RootState } from '../reducers/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea, Box } from '@chakra-ui/core'

export const ChatInput = ({ friendId }: { friendId: string }) => {
  const dispatch = useDispatch()
  const friend = useSelector((state: RootState) => state.users[friendId])
  const [messageContent, setMessageContent] = useState('')
  const [sendMessage] = useSendPrivateChatMessageMutation({
    variables: {
      input: {
        recipientId: friendId,
        content: messageContent,
      },
    },
    onCompleted({ sendPrivateChatMessage }) {
      setMessageContent('')
      dispatch(
        messagesActions.messageSent({
          recipientId: friendId,
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
        border="none"
        minHeight={60}
        _focus={{ boxShadow: '0 0 0 1px #c539ff' }}
        onKeyPress={handleKeyDown}
        value={messageContent}
        onChange={(e: any) => setMessageContent(e.target.value)}
        _placeholder={{ color: '#676767' }}
      />
    </Box>
  )
}
