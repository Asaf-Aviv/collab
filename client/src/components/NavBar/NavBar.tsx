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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  ButtonGroup,
  Text,
} from '@chakra-ui/core'
// import produce from 'immer'
import FocusLock from 'react-focus-lock'
import styled from '@emotion/styled'
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import { useApolloClient } from '@apollo/react-hooks'
import { MobileNavBar } from './MobileNavBar'
import {
  useGetCurrentUserQuery,
  useCurrentUserFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  CurrentUserFriendRequestsDocument,
  CurrentUserFriendRequestsQueryResult,
} from '../../graphql/generates'
import { Container } from '../global'
import { useWindowWidth } from '../WindowWidthProvider'

export const SiteHeader = ({ children }: { children: React.ReactNode }) => (
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
    {children}
  </Flex>
)

export const NavBar = () => {
  const { data } = useGetCurrentUserQuery()
  const width = useWindowWidth()
  const currentUser = data?.currentUser

  if (width < 786) {
    return (
      <SiteHeader>
        <MobileNavBar />
      </SiteHeader>
    )
  }

  return (
    <SiteHeader>
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
    </SiteHeader>
  )
}

const StyledFlex = styled(Flex)`
  display: flex;
  align-items: center;
  font-weight: 600;
  letter-spacing: 1px;
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
  const [acceptFriendRequest] = useAcceptFriendRequestMutation({
    update(store, { data }) {
      const { currentUser } = store.readQuery<
        CurrentUserFriendRequestsQueryResult['data']
      >({
        query: CurrentUserFriendRequestsDocument,
      })!

      store.writeQuery({
        query: CurrentUserFriendRequestsDocument,
        data: {
          currentUser: {
            ...currentUser,
            friendRequests: currentUser!.friendRequests.filter(
              request => request.id !== data!.acceptFriendRequest.id,
            ),
          },
        },
      })
    },
  })
  const [declineFriendRequest] = useDeclineFriendRequestMutation({
    update(store, { data }) {
      const { currentUser } = store.readQuery<
        CurrentUserFriendRequestsQueryResult['data']
      >({
        query: CurrentUserFriendRequestsDocument,
      })!

      store.writeQuery({
        query: CurrentUserFriendRequestsDocument,
        data: {
          currentUser: {
            ...currentUser,
            friendRequests: currentUser!.friendRequests.filter(
              request => request.id !== data!.declineFriendRequest,
            ),
          },
        },
      })
    },
  })
  const { data, loading, error } = useCurrentUserFriendRequestsQuery()

  if (loading) return <span>loading...</span>
  if (error) return <span>Could not fetch friend requests</span>
  if (!data?.currentUser) return null

  const { friendRequests } = data.currentUser

  return (
    <Popover placement="bottom-end">
      <Flex height="100%" align="center">
        <PopoverTrigger>
          <IconButton>
            <GroupAddIcon />
          </IconButton>
        </PopoverTrigger>
      </Flex>
      <PopoverContent zIndex={4}>
        <FocusLock>
          <PopoverArrow />
          <PopoverHeader>Friend Requests</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody maxHeight={400} overflowY="scroll" overflowX="hidden">
            <Flex direction="column">
              {friendRequests.map(user => (
                <Flex key={user.id} py={2}>
                  <Text as="span" fontSize="0.9rem">
                    {user.username}
                  </Text>
                  <ButtonGroup ml="auto">
                    <Button
                      size="xs"
                      onClick={() =>
                        declineFriendRequest({
                          variables: {
                            senderId: user.id,
                          },
                        })
                      }
                    >
                      Decline
                    </Button>
                    <Button
                      size="xs"
                      variantColor="purple"
                      onClick={() =>
                        acceptFriendRequest({
                          variables: {
                            friendId: user.id,
                          },
                        })
                      }
                    >
                      Accept
                    </Button>
                  </ButtonGroup>
                </Flex>
              ))}
            </Flex>
          </PopoverBody>
        </FocusLock>
      </PopoverContent>
    </Popover>
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
