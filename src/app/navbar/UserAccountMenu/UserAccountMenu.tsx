import React from 'react'
import { Link } from 'react-router-dom'
import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from '@chakra-ui/core'
import { useCurrentUser } from '../../../providers'
import { LogoutButton } from '../../current-user-profile/LogoutButton'
import { getAvatarUrl } from '../../../utils'

export const UserAccountMenu = () => {
  const { username, avatar } = useCurrentUser()!

  return (
    <Menu>
      <MenuButton
        ml={4}
        outline="none"
        _active={{
          boxShadow: 'outline',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
      >
        <Avatar size="sm" src={getAvatarUrl(avatar)} name={username} />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <Link to="/profile">
            <MenuItem>My Account</MenuItem>
          </Link>
        </MenuGroup>
        <MenuDivider />
        <LogoutButton size="sm" width="100%" bg="transparent">
          Sign Out
        </LogoutButton>
      </MenuList>
    </Menu>
  )
}
