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

export const UserAccountMenu = () => {
  const currentUser = useCurrentUser()!

  return (
    <Menu>
      <MenuButton ml={8}>
        <Avatar
          size="sm"
          src={currentUser.avatar ?? undefined}
          name={currentUser.username}
        />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <Link to="/profile">
            <MenuItem>My Account</MenuItem>
          </Link>
        </MenuGroup>
        <MenuDivider />
        <LogoutButton size="sm" width="100%" bg="transparent">
          Logout
        </LogoutButton>
      </MenuList>
    </Menu>
  )
}
