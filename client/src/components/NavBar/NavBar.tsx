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
import { Container } from '../global'

export const NavBar = () => {
  const { data } = useGetCurrentUserQuery()
  const currentUser = data?.currentUser

  return (
    <Flex
      as="header"
      align="center"
      height="4rem"
      background="#FFF"
      pos="relative"
      boxShadow="0px 4px 5px 0 rgba(231, 216, 255, 0.38)"
    >
      <Container height="100%" d="flex" justifyContent="space-between">
        <StyledFlex as="nav">
          <StyledLink exact to="/">
            Home
          </StyledLink>
          <StyledLink exact to="/collabs/posts">
            Collabs
          </StyledLink>
          <StyledLink exact to="/showcase">
            Showcase
          </StyledLink>
          <StyledLink to="/create">Create</StyledLink>
        </StyledFlex>
        {currentUser ? (
          <UserNavMenu />
        ) : (
          <StyledFlex as="div">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </StyledFlex>
        )}
      </Container>
    </Flex>
  )
}

const StyledFlex = styled(Flex)`
  display: flex;
  align-items: center;
  font-weight: 600;
`

const StyledLink = styled(NavLink)`
  transition: color 250ms;

  &:hover,
  &.active {
    color: #964cff;
  }

  & + & {
    margin-left: 1rem;
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
      <MenuButton width="64px">
        <Avatar
          src={currentUser.avatar ?? undefined}
          name={currentUser.username}
        />
      </MenuButton>
      <MenuList mt={0}>
        <MenuGroup title="Profile">
          <Link to="/profile">
            <MenuItem>My Account</MenuItem>
          </Link>
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
