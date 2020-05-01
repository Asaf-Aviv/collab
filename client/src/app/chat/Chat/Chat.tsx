import React, { useState, useEffect, useCallback } from 'react'
import { Flex, Divider, IconButton } from '@chakra-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
  useConnectToChatMutation,
  UserChatStatus,
} from '../../../graphql/generates'
import { userActions, RootState, messagesActions } from '../reducers'
import { useChatSubscriptions } from '../useChatSubscriptions'
import { ChatStatus } from '../ChatStatus'
import { ChatUsersList } from '../ChatUsersList'
import { ChatBox } from '../ChatBox/ChatBox'
import { CloseButton } from '../../../components/CloseButton'

type Props = {
  isMinimized: boolean
  toggleMinimize: () => void
}

export const Chat = ({ isMinimized, toggleMinimize }: Props) => {
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
    <>
      <AnimatePresence>
        {isMinimized && (
          <IconButton
            onClick={toggleMinimize}
            aria-label="maximize chat"
            position="fixed"
            bottom={0}
            right="1rem"
            bg="purple.700"
            variantColor="purple"
            color="white"
            icon="chat"
            roundedBottom={0}
          />
        )}

        {!isMinimized && (
          <motion.div
            key="chat"
            initial={{ width: 0 }}
            animate={{ width: 230 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.8, ease: 'anticipate' }}
          >
            <Flex
              direction="column"
              flexBasis={230}
              position="sticky"
              bg="#eaeaea"
              top="64px"
              maxHeight="calc(100vh - 64px)"
              overflowY="hidden"
              p={2}
            >
              <CloseButton
                aria-label="minimize chat"
                onClick={toggleMinimize}
                style={{ marginLeft: 'auto' }}
              />
              <ChatStatus />
              <Divider />
              <ChatUsersList onFriendClick={handleFriendClick} />
              {selectedFriendId && <ChatBox />}
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
