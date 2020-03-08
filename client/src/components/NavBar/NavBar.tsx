import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  Flex,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Avatar,
} from '@chakra-ui/core'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/react-hooks'
import { useGetCurrentUserQuery } from '../../graphql/generates'

export const NavBar = () => {
  const { data } = useGetCurrentUserQuery()
  const currentUser = data?.currentUser

  return (
    <Flex
      as="header"
      align="center"
      height="4rem"
      background="#FFF"
      borderBottom="1px solid grey"
    >
      <Flex
        mx="auto"
        width="95%"
        maxW="1200px"
        d="flex"
        justify="space-between"
      >
        <StyledFlex as="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/collabs/posts">Collab Posts</NavLink>
          <NavLink to="/showcase">Showcase</NavLink>
          <NavLink to="/create">Create</NavLink>
        </StyledFlex>
        {currentUser ? (
          <UserNavMenu />
        ) : (
          <StyledFlex as="div">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </StyledFlex>
        )}
      </Flex>
    </Flex>
  )
}

const StyledFlex = styled(Flex)`
  display: flex;
  align-items: center;
  > *:not(:last-of-type) {
    margin-right: 1rem;
  }
`

const UserNavMenu = () => {
  const { data } = useGetCurrentUserQuery()
  const currentUser = data?.currentUser
  const client = useApolloClient()

  const logout = () => {
    localStorage.removeItem('token')
    client.resetStore()
  }

  if (!currentUser) return null

  return (
    <Menu>
      <MenuButton>
        <Avatar
          src={currentUser.avatar ?? undefined}
          name={currentUser.username}
        />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <Link to="/profile/my-collabs">
            <MenuItem>My Collabs</MenuItem>
          </Link>
        </MenuGroup>
        <MenuDivider />
        <Button onClick={logout}>Logout</Button>
      </MenuList>
    </Menu>
  )
}
