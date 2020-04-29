import React from 'react'
import { User } from '../../../graphql/generates'
import { Button, Avatar, ButtonProps } from '@chakra-ui/core'

const USER_CHAT_STATUS = {
  ONLINE: 'Online',
  AWAY: 'Away',
  DND: 'Do Not Disturb',
  OFFLINE: 'Offline',
}

type Props = Omit<ButtonProps, 'children'> & {
  user: Pick<User, 'id' | 'username' | 'avatar'> & {
    status: keyof typeof USER_CHAT_STATUS
  }
}

export const ChatUserListItem = ({ user, ...props }: Props) => (
  <Button
    width="100%"
    fontSize="0.75rem"
    justifyContent="flex-start"
    size="sm"
    variant="ghost"
    _hover={{ bg: 'purple.200' }}
    _focus={{ bg: 'purple.200' }}
    {...props}
  >
    <Avatar
      src={user.avatar ?? undefined}
      name={user.username}
      size="xs"
      mr={2}
    />
    {user.username}
  </Button>
)
