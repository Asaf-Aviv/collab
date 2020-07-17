import React, { useState, useRef, useCallback, useEffect } from 'react'
import {
  User,
  useSearchFriendsLazyQuery,
  useSendPrivateMessageMutation,
} from '../../../graphql/generates'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  FormLabel,
  FormControl,
  Box,
  Flex,
  Avatar,
  Text,
  Textarea,
} from '@chakra-ui/core'
import Select from 'react-select'
import { debounce } from 'lodash-es'
import { useToastNotification } from '../../notifications'
import { getAvatarUrl } from '../../../utils'

type Props = {
  closeModal: () => void
  recipient?: Pick<User, 'id' | 'username' | 'avatar'>
}

export const SendMessageModal = ({ closeModal, recipient }: Props) => {
  const notify = useToastNotification()
  const selectRef = useRef<any>(null!)
  const [content, setContent] = useState('')
  const [friendInput, setFriendInput] = useState('')
  const [
    sendMessage,
    { loading: sendMessageLoading },
  ] = useSendPrivateMessageMutation({
    onCompleted() {
      notify('success', {
        title: 'Success',
        message: 'Message sent successfully',
      })
      closeModal()
    },
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message: message,
      })
    },
  })
  const [recipientId, setRecipientId] = useState(recipient?.id ?? null)
  const [
    search,
    { data: searchFriendsData, loading: loadingFriends },
  ] = useSearchFriendsLazyQuery({
    onError() {
      notify('error', {
        title: 'Error',
        message: 'Could not load recipient',
      })
    },
  })

  const handleFriendSearch = useCallback(
    debounce((username: string) => {
      search({
        variables: {
          input: {
            username,
          },
        },
      })
    }, 250),
    [],
  )

  useEffect(() => {
    if (friendInput) {
      handleFriendSearch(friendInput)
    }
  }, [friendInput, handleFriendSearch])

  const handleSendMessage = () => {
    if (!content || !recipientId || sendMessageLoading) return

    sendMessage({
      variables: {
        input: {
          content,
          recipientId,
        },
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const friendsOptionsById =
    searchFriendsData?.searchFriends.reduce(
      (res, member) => ({
        ...res,
        [member.id]: {
          value: member.id,
          label: member.username,
          avatar: member.avatar,
        },
      }),
      {} as Record<string, any>,
    ) ?? {}

  // only when recipient is passed through props
  const recipientOption = recipient && {
    value: recipient.id,
    label: recipient.username,
    avatar: recipient.avatar,
  }

  return (
    <Modal
      initialFocusRef={selectRef}
      preserveScrollBarGap
      isOpen
      onClose={() => closeModal()}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent borderRadius={6}>
        <ModalHeader>Send Message</ModalHeader>
        <ModalCloseButton size="lg" />
        <ModalBody pb={6}>
          <Box as="form" onSubmit={handleSubmit} display="block">
            <FormControl>
              <FormLabel>Recipient</FormLabel>
              <Select
                ref={selectRef}
                isDisabled={Boolean(recipient)}
                onInputChange={setFriendInput}
                options={Object.values(friendsOptionsById)}
                value={
                  recipient
                    ? recipientOption
                    : recipientId
                    ? friendsOptionsById[recipientId]
                    : null
                }
                placeholder="Filter friends as you type"
                isClearable
                onChange={(option: any) =>
                  setRecipientId(option?.value ?? null)
                }
                components={{ Option: CustomOption }}
                isLoading={loadingFriends}
              />
            </FormControl>
            <FormControl my={4}>
              <FormLabel>Message</FormLabel>
              <Textarea
                value={content}
                minHeight={200}
                onChange={(e: any) => setContent(e.target.value)}
                bg="#f2f2ff"
                p={2}
                borderColor="transparent"
                _hover={{ borderColor: '#cab3ff' }}
                _focus={{ borderColor: '#805ad5' }}
                borderWidth={2}
              />
            </FormControl>
            <Flex justify="flex-end">
              <Button variant="ghost" mr={3} onClick={() => closeModal()}>
                Close
              </Button>
              <Button
                type="submit"
                variantColor="purple"
                onClick={() => handleSendMessage()}
                isLoading={sendMessageLoading}
              >
                Send
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const CustomOption = ({ innerProps, data }: any) => {
  return (
    <Flex cursor="pointer" {...innerProps} align="center" px={2} py={1}>
      <Avatar
        mr={2}
        size="sm"
        src={getAvatarUrl(data.avatar)}
        name={data.label}
      />
      <Text as="span" color="black">
        {data.label}
      </Text>
    </Flex>
  )
}
