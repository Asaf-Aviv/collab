import React, { useState, useEffect } from 'react'
import {
  UserChatStatus,
  useUpdateStatusMutation,
} from '../../../graphql/generates'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Heading,
  MenuItemProps,
} from '@chakra-ui/core'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import { ChatUserListItem } from '../ChatUserListItem'

export const ChatStatus = () => {
  const currentUser = useCurrentUser()!
  const [status, setStatus] = useState(UserChatStatus.Online)
  const [updateStatus] = useUpdateStatusMutation({
    variables: {
      status,
    },
  })

  useEffect(() => {
    updateStatus()
  }, [updateStatus, status])

  return (
    <Flex>
      <Flex direction="column" flex={1}>
        <Heading size="xs" fontWeight={500} as="h5" mb={1}>
          Status
        </Heading>
        <Menu>
          <MenuButton>
            <ChatUserListItem as="div" user={{ ...currentUser, status }} />
          </MenuButton>
          <MenuList
            placement="right-start"
            fontSize="0.75rem"
            zIndex={3}
            position="relative"
          >
            <StyledMenuItem onClick={() => setStatus(UserChatStatus.Online)}>
              Online
            </StyledMenuItem>
            <StyledMenuItem onClick={() => setStatus(UserChatStatus.Away)}>
              Away
            </StyledMenuItem>
            <StyledMenuItem onClick={() => setStatus(UserChatStatus.Dnd)}>
              Do Not Disturb
            </StyledMenuItem>
            <StyledMenuItem onClick={() => setStatus(UserChatStatus.Offline)}>
              Offline
            </StyledMenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

const StyledMenuItem = (props: MenuItemProps) => (
  <MenuItem
    _focus={{ bg: 'purple.100' }}
    _hover={{ bg: 'purple.100' }}
    {...props}
  />
)
