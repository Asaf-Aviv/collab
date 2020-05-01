import React, { useState, useEffect, useCallback } from 'react'
import { Flex, Divider } from '@chakra-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {
  useConnectToChatMutation,
  UserChatStatus,
} from '../../../graphql/generates'
import { userActions, RootState, messagesActions } from '../reducers'
import { useChatSubscriptions } from '../useChatSubscriptions'
import { ChatStatus } from '../ChatStatus'
import { ChatUsersList } from '../ChatUsersList'
import { ChatBox } from '../ChatBox/ChatBox'

export const Chat = () => {
  useChatSubscriptions()
  const [connected, setConnected] = useState(false)
  const selectedFriendId = useSelector(
    ({ messages }: RootState) => messages.selectedFriendId,
  )
  const dispatch = useDispatch()
  const [connectToChat] = useConnectToChatMutation({
    variables: {
      status: UserChatStatus.Online,
    },
    onCompleted({ connectToChat }) {
      const users = connectToChat.users.map(({ user, status }) => ({
        ...user,
        status,
      }))
      dispatch(userActions.receivedInitialUsers(users))
      setConnected(true)
    },
  })

  useEffect(() => {
    connectToChat()
  }, [connectToChat])

  const handleFriendClick = useCallback(
    (friendId: string) => {
      dispatch(messagesActions.selectedFriendIdChanged(friendId))
    },
    [dispatch],
  )

  if (!connected) return null

  return (
    <Flex
      direction="column"
      flexBasis={230}
      position="sticky"
      bg="#eaeaea"
      top="64px"
      maxHeight="calc(100vh - 64px)"
      p={2}
    >
      <ChatStatus />
      <Divider />
      <ChatUsersList onFriendClick={handleFriendClick} />
      {selectedFriendId && <ChatBox />}
    </Flex>
  )
}
