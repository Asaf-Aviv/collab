import React, { useState, useEffect, useCallback } from 'react'
import {
  useConnectToChatMutation,
  UserChatStatus,
} from '../../../graphql/generates'
import { userActions } from '../reducers'
import { useDispatch } from 'react-redux'
import { useChatSubscriptions } from '../useChatSubscriptions'
import { ChatStatus } from '../ChatStatus'
import { ChatUsersList } from '../ChatUsersList'
import { ChatBox } from '../ChatBox/ChatBox'
import { Flex } from '@chakra-ui/core'

const formatUser = ({ user, status }: any) => ({
  ...user,
  status,
})

export const Chat = () => {
  useChatSubscriptions()
  const [connected, setConnected] = useState(false)
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null)
  const dispatch = useDispatch()
  const [connectToChat] = useConnectToChatMutation({
    variables: {
      status: UserChatStatus.Online,
    },
    onCompleted({ connectToChat }) {
      const users = connectToChat.users.map(formatUser)
      dispatch(userActions.receivedInitialUsers(users))
      setConnected(true)
    },
  })

  useEffect(() => {
    connectToChat()
  }, [connectToChat])

  const toggleChatBox = useCallback((friendId: string) => {
    setSelectedFriendId(prevState => (prevState === friendId ? null : friendId))
  }, [])

  if (!connected) return null

  return (
    <Flex
      direction="column"
      flexBasis={200}
      position="sticky"
      top="64px"
      maxHeight="calc(100vh - 64px)"
      p={2}
    >
      <ChatStatus />
      <ChatUsersList openChatBox={toggleChatBox} />
      {selectedFriendId && (
        <ChatBox
          friendId={selectedFriendId}
          closeChatBox={() => toggleChatBox(selectedFriendId)}
        />
      )}
    </Flex>
  )
}
