import React, { memo } from 'react'
import { RootState } from '../reducers/reducers'
import { useSelector } from 'react-redux'
import { Flex, Box, Heading } from '@chakra-ui/core'
import { ChatUserListItem } from '../ChatUserListItem'

type Props = {
  openChatBox: (friendId: string) => void
}

export const ChatUsersList = memo(function ChatUsersList({
  openChatBox,
}: Props) {
  const users = useSelector((state: RootState) =>
    Object.values(state.users).sort((a, b) =>
      a.username.toLowerCase().localeCompare(b.username.toLowerCase()),
    ),
  )

  return (
    <Box overflow="scroll">
      <Heading size="xs" fontWeight={500} as="h5" mb={1}>
        Friends
      </Heading>
      <Flex direction="column" as="ul" listStyleType="none">
        {users.map(user => (
          <ChatUserListItem
            key={user.id}
            user={user}
            onClick={() => openChatBox(user.id)}
          />
        ))}
      </Flex>
    </Box>
  )
})
