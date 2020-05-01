import React, { memo, useMemo } from 'react'
import { RootState, selectChatUsers } from '../reducers/reducers'
import { Flex, Box, Heading } from '@chakra-ui/core'
import { ChatUserListItem } from '../ChatUserListItem'
import { useTypedSelector } from '../useTypedSelector'
import { useStore } from 'react-redux'

type Props = {
  onFriendClick: (friendId: string) => void
}

export const ChatUsersList = memo(function ChatUsersList({
  onFriendClick,
}: Props) {
  const store = useStore()
  const users = useTypedSelector(selectChatUsers)
  const totalUnreadCount = useTypedSelector(
    ({ messages }) => messages.totalUnreadCount,
  )

  const sortedUsers = useMemo(() => {
    const { byUserIds } = (store.getState() as RootState).messages
    return Object.values(users).sort(
      (a, b) =>
        byUserIds[b.id].unreadCount - byUserIds[a.id].unreadCount ||
        a.username.toLowerCase().localeCompare(b.username.toLowerCase()),
    )
    // eslint-disable-next-line
  }, [store, users, totalUnreadCount])

  return (
    <>
      <Heading size="xs" fontWeight={500} as="h5" mb={1}>
        Friends
      </Heading>
      <Box
        overflowY="auto"
        bg="white"
        borderRadius={6}
        p={2}
        boxShadow="0 1px 1px 1px #c3c3c3"
      >
        <Flex direction="column" as="ul" listStyleType="none">
          {sortedUsers.map(user => (
            <ChatUserListItem
              key={user.id}
              user={user}
              onClick={() => onFriendClick(user.id)}
            />
          ))}
        </Flex>
      </Box>
    </>
  )
})
