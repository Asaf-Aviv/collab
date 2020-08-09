import React, { useState } from 'react'
import produce from 'immer'
import { useParams } from 'react-router-dom'
import { Box, Button, Textarea } from '@chakra-ui/core'
import {
  useCreateWallMessageMutation,
  CollabWallMessagesQuery,
  CollabWallMessagesDocument,
} from '../../../graphql/generates'
import { useToastNotification } from '../../notifications'

export const AddWallMessageForm = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const notify = useToastNotification()
  const [messageInput, setMessageInput] = useState('')
  const [createMessage] = useCreateWallMessageMutation({
    variables: {
      input: {
        collabId,
        content: messageInput,
      },
    },
    update(store, { data }) {
      if (!data) return

      const messagesData = store.readQuery<CollabWallMessagesQuery>({
        query: CollabWallMessagesDocument,
        variables: {
          input: {
            collabId,
            offset: 0,
            limit: 10,
          },
        },
      })!

      const updatedMessagesData = produce(messagesData, draft => {
        draft.collabWallMessages.messages.unshift(data.createWallMessage)
      })

      store.writeQuery<CollabWallMessagesQuery>({
        query: CollabWallMessagesDocument,
        variables: {
          input: {
            collabId,
            offset: 0,
            limit: 10,
          },
        },
        data: updatedMessagesData,
      })
    },
    onCompleted() {
      setMessageInput('')
    },
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })
  return (
    <Box
      as="form"
      aria-label="Add a message to the wall"
      onSubmit={e => e.preventDefault()}
      mt={4}
    >
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
  )
}
