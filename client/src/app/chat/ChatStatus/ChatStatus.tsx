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
  Box,
} from '@chakra-ui/core'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import { ChatUserListItem } from '../ChatUserListItem'
import { useIsFirstRender } from '../../../hooks/useIsFirstRender'

export const ChatStatus = () => {
  const currentUser = useCurrentUser()!
  const [status, setStatus] = useState(UserChatStatus.Online)
  const isFirstRender = useIsFirstRender()
  const [updateStatus] = useUpdateStatusMutation({
    variables: {
      status,
    },
  })

  useEffect(() => {
    if (isFirstRender) {
      return
    }

    updateStatus()
  }, [updateStatus, status, isFirstRender])

  return (
    <Box>
      <Heading size="xs" fontWeight={500} as="h5" mb={1}>
        Status
      </Heading>
      <Flex bg="white" borderRadius={6} p={2} boxShadow="0 1px 1px 1px #c3c3c3">
        <Flex direction="column" flex={1}>
          <Menu>
            <MenuButton>
              <ChatUserListItem as="div" user={{ ...currentUser, status }} />
            </MenuButton>
            <MenuList
              placement="bottom"
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
    </Box>
  )
}

const StyledMenuItem = (props: MenuItemProps) => (
  <MenuItem
    _focus={{ bg: 'purple.100' }}
    _hover={{ bg: 'purple.100' }}
    {...props}
  />
)
