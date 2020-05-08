import React, { useState, useEffect, useCallback } from 'react'
import { Flex, Divider, IconButton, Box, Text } from '@chakra-ui/core'
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
import { useTypedSelector } from '../useTypedSelector'

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
  const totalUnreadCount = useTypedSelector(
    ({ messages }) => messages.totalUnreadCount,
  )

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
          <Box position="fixed" bottom={0} right="1rem">
            <Box position="relative">
              <IconButton
                onClick={toggleMinimize}
                aria-label="maximize chat"
                bg="purple.700"
                variantColor="purple"
                color="white"
                icon="chat"
                roundedBottom={0}
              />
              {totalUnreadCount > -1 && (
                <Flex
                  align="center"
                  justify="center"
                  position="absolute"
                  top={-15}
                  right={-10}
                  color="white"
                  width="22px"
                  height="22px"
                  fontSize="0.75rem"
                  fontWeight={500}
                  borderRadius="50%"
                  bg="#c70707"
                >
                  <Text as="span" userSelect="none">
                    4
                  </Text>
                </Flex>
              )}
            </Box>
          </Box>
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
