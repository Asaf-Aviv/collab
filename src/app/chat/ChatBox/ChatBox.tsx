import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Flex, Heading, Avatar } from '@chakra-ui/core'
import { ChatInput } from '../ChatInput'
import { ChatMessages } from '../ChatMessages'
import { RootState, messagesActions } from '../reducers'
import { CloseButton } from '../../../components/CloseButton'
import { useKey } from '../../../hooks/useKey'
import { getAvatarUrl } from '../../../utils'

type Props = {
  isChatMinimized: boolean
}

export const ChatBox = ({ isChatMinimized }: Props) => {
  const friend = useSelector(
    ({ users, messages }: RootState) => users[messages.selectedFriendId!],
  )
  const dispatch = useDispatch()

  const closeChatBox = () => {
    dispatch(messagesActions.closeChatBox())
  }

  useKey(['Esc', 'Escape'], closeChatBox)

  return (
    <Flex
      roundedTop={6}
      height={350}
      width={330}
      position="fixed"
      direction="column"
      bg="white"
      bottom={0}
      right={isChatMinimized ? 60 : 238}
      transition="right 400ms ease-out"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.37), 0 2px 4px -1px rgba(208, 208, 208, 0.06)"
    >
      <Flex
        p={2}
        borderBottom="1px solid #fff"
        align="center"
        justify="space-between"
        boxShadow="0 1px 3px #c3c3c3"
      >
        <Flex align="center">
          <Avatar
            src={getAvatarUrl(friend.avatar)}
            name={friend.username}
            size="xs"
            mr={2}
          />
          <Heading fontWeight={500} size="xs">
            {friend.username}
          </Heading>
        </Flex>
        <CloseButton size="sm" onClick={closeChatBox} />
      </Flex>
      <ChatMessages />
      <ChatInput />
    </Flex>
  )
}
