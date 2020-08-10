import React, { useCallback, useState } from 'react'
import { Flex, Divider, IconButton, Box, Text } from '@chakra-ui/core'
import { useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import styled from '@emotion/styled'
import { useOnlineChatFriendsQuery } from '../../../graphql/generates'
import { userActions, messagesActions } from '../reducers'
import { useChatSubscriptions } from '../useChatSubscriptions'
import { ChatStatus } from '../ChatStatus'
import { ChatUsersList } from '../ChatUsersList'
import { ChatBox } from '../ChatBox/ChatBox'
import { CloseButton } from '../../../components/CloseButton'
import { useTypedSelector } from '../useTypedSelector'

export const Chat = () => {
  const [isChatMinimized, setIsChatMinimized] = useState(false)
  useChatSubscriptions()
  useOnlineChatFriendsQuery({
    onCompleted({ onlineChatFriends }) {
      const users = onlineChatFriends.users.map(({ user, status }) => ({
        ...user,
        status,
      }))
      dispatch(userActions.receivedInitialUsers(users))
    },
  })
  const dispatch = useDispatch()
  const selectedFriendId = useTypedSelector(
    ({ messages }) => messages.selectedFriendId,
  )
  const totalUnreadCount = useTypedSelector(
    ({ messages }) => messages.totalUnreadCount,
  )

  const handleFriendClick = useCallback(
    (friendId: string) => {
      dispatch(messagesActions.selectedFriendIdChanged(friendId))
    },
    [dispatch],
  )

  const toggleMinimize = () => setIsChatMinimized(prevState => !prevState)

  return (
    <>
      <AnimatePresence>
        <StyledChatContainer
          key="chat"
          initial={{ width: isChatMinimized ? 230 : 0 }}
          animate={{ width: isChatMinimized ? 0 : 230 }}
          exit={{ width: 0 }}
          transition={{ duration: 0.8, ease: 'anticipate' }}
          style={{ zIndex: 2 }}
        >
          <Flex
            height="100%"
            direction="column"
            flexBasis={230}
            position="sticky"
            bg="#eaeaea"
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
        </StyledChatContainer>
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
            {totalUnreadCount > 0 && (
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
                  {totalUnreadCount}
                </Text>
              </Flex>
            )}
          </Box>
        </Box>
      </AnimatePresence>
    </>
  )
}

const StyledChatContainer = styled(motion.div)`
  height: 100vh;
  position: fixed;
  right: 0;
  top: 64px;
  box-shadow: 0px 0px 5px #b2b2b2;
`
