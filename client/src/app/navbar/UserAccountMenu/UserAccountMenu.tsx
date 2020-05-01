import React from 'react'
import { Link } from 'react-router-dom'
import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Avatar,
} from '@chakra-ui/core'
import { useApolloClient } from '@apollo/react-hooks'
import { useCurrentUser } from '../../../hooks/useCurrentUser'

export const UserAccountMenu = () => {
  const currentUser = useCurrentUser()
  const client = useApolloClient()

  const logout = () => {
    localStorage.removeItem('token')
    client.resetStore()
  }

  if (!currentUser) return null

  return (
    <Menu>
      <MenuButton width="64px">
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
        <Button onClick={logout}>Logout</Button>
      </MenuList>
    </Menu>
  )
}
