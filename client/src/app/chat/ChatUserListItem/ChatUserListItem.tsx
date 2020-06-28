import React from 'react'
import { Box, Button, Avatar, ButtonProps } from '@chakra-ui/core'
import { User } from '../../../graphql/generates'
import { useTypedSelector } from '../useTypedSelector'
import { getAvatarUrl } from '../../../utils'

const USER_CHAT_STATUS = {
  ONLINE: 'Online',
  AWAY: 'Away',
  DND: 'Do Not Disturb',
  OFFLINE: 'Offline',
}

const STATUS_CIRCLE_COLOR = {
  ONLINE: 'green.400',
  AWAY: 'yellow.400',
  DND: 'red.400',
  OFFLINE: 'gray.400',
}

type Props = Omit<ButtonProps, 'children'> & {
  user: Pick<User, 'id' | 'username' | 'avatar'> & {
    status: keyof typeof USER_CHAT_STATUS
  }
}

export const ChatUserListItem = ({ user, ...props }: Props) => {
  const unreadCount = useTypedSelector(
    ({ messages }) => messages.byUserIds[user.id]?.unreadCount,
  )

  return (
    <Button
      width="100%"
      fontSize="0.75rem"
      justifyContent="flex-start"
      size="sm"
      variant="ghost"
      px={1}
      _hover={{ bg: 'purple.200' }}
      _focus={{ bg: 'purple.200' }}
      _active={{ bg: 'purple.300' }}
      {...props}
    >
      <Box
        borderRadius="50%"
        width="8px"
        height="8px"
        bg={STATUS_CIRCLE_COLOR[user.status]}
      />
      <Avatar
        src={getAvatarUrl(user.avatar)}
        name={user.username}
        size="xs"
        mx={1}
      />
      {user.username}
      {unreadCount > 0 && (
        <Box
          width="24px"
          height="20px"
          borderRadius={5}
          bg="#582398"
          color="white"
          fontSize="0.65rem"
          ml="auto"
          p={1}
          fontWeight={700}
        >
          {unreadCount}
        </Box>
      )}
    </Button>
  )
}
