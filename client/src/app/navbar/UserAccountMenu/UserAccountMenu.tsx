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
import { useCurrentUser } from '../../../hooks/useCurrentUser'
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
      <MenuList mt={0}>
        <MenuGroup title="Profile">
          <Link to="/profile">
            <MenuItem>My Account</MenuItem>
          </Link>
        </MenuGroup>
        <MenuDivider />
        <LogoutButton>Logout</LogoutButton>
      </MenuList>
    </Menu>
  )
}
