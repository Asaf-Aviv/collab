import React, { useReducer } from 'react'
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
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import { useApolloClient } from '@apollo/react-hooks'
import {
  useGetCurrentUserQuery,
  useCurrentUserFriendRequestsQuery,
} from '../../graphql/generates'
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
      pos="fixed"
      width="100%"
      zIndex={100}
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
          <Flex>
            <UserNavPanel />
            <UserNavMenu />
          </Flex>
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
  letter-spacing: 1.3px;
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

const UserNavPanel = () => {
  return (
    <Flex>
      <Flex>
        <NotificationsRoundedIcon />
      </Flex>
      <FriendRequestsModal />
    </Flex>
  )
}

const FriendRequestsModal = () => {
  const [isFriendRequestsOpen, toggleIsFriendRequestsOpen] = useReducer(
    open => !open,
    false,
  )
  const { data, loading, error } = useCurrentUserFriendRequestsQuery()

  if (loading) return <span>loading...</span>
  if (error) return <span>Could not fetch friend requests</span>
  if (!data?.currentUser) return null

  const { friendRequests } = data.currentUser

  return (
    <Flex position="relative">
      <Flex height="100%" align="center">
        <IconButton onClick={() => toggleIsFriendRequestsOpen()}>
          <GroupAddIcon />
        </IconButton>
      </Flex>
      {isFriendRequestsOpen && (
        <Flex direction="column" position="absolute" bottom={0}>
          {friendRequests.map(user => (
            <Flex key={user.id}>{user.username}</Flex>
          ))}
        </Flex>
      )}
    </Flex>
  )
}

const IconButton = styled.button`
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: background-color 200ms;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
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
        </MenuGroup>
        <MenuDivider />
        <Button onClick={logout}>Logout</Button>
      </MenuList>
    </Menu>
  )
}
