import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  NavLink,
  Redirect,
} from 'react-router-dom'
import { Flex } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { Container } from '../../../components/global'
import { Information } from '../Information'
import { Collabs } from '../Collabs'
import { Tasks } from '../Tasks'
import { Friends } from '../Friends'
import { CollabInvitations } from '../CollabInvitations'
import { CollabRequests } from '../CollabRequests'
import { Conversations } from '../Conversations'
import { Conversation } from '../Conversation'
import { useWindowWidth } from '../../../providers'
import { FriendRequests } from '../FriendRequests'

export const MyProfile = () => {
  const { path } = useRouteMatch()
  const width = useWindowWidth()

  return (
    <Container maxWidth={900}>
      <Flex
        display={['block', 'flex']}
        direction={['column', 'row']}
        align="flex-start"
      >
        {width >= 480 ? <SideBar /> : <TabMenu />}
        <Switch>
          <Route exact path={`${path}/info`}>
            <Information />
          </Route>
          <Route exact path={`${path}/collabs`}>
            <Collabs />
          </Route>
          <Route exact path={`${path}/tasks`}>
            <Tasks />
          </Route>
          <Route exact path={`${path}/collab-invitations`}>
            <CollabInvitations />
          </Route>
          <Route exact path={`${path}/collab-requests`}>
            <CollabRequests />
          </Route>
          <Route exact path={`${path}/friends`}>
            <Friends />
          </Route>
          <Route exact path={`${path}/friend-requests`}>
            <FriendRequests />
          </Route>
          <Route exact path={`${path}/conversations`}>
            <Conversations />
          </Route>
          <Route path={`${path}/conversations/:userId`}>
            <Conversation />
          </Route>
          <Redirect to="/profile/info" />
        </Switch>
      </Flex>
    </Container>
  )
}

const SideBar = () => {
  const { path } = useRouteMatch()

  return (
    <Flex
      as="nav"
      direction="column"
      bg="white"
      mr={8}
      border="1px solid #e1e1e1"
    >
      <StyledNavLink exact to={`${path}/info`}>
        Info
      </StyledNavLink>
      <StyledNavLink exact to={`${path}/collabs`}>
        Collabs
      </StyledNavLink>
      <StyledNavLink exact to={`${path}/tasks`}>
        Tasks
      </StyledNavLink>
      <StyledNavLink exact to={`${path}/collab-invitations`}>
        Collab Invitations
      </StyledNavLink>
      <StyledNavLink exact to={`${path}/collab-requests`}>
        Collab Requests
      </StyledNavLink>
      <StyledNavLink exact to={`${path}/friends`}>
        Friends
      </StyledNavLink>
      <StyledNavLink exact to={`${path}/friend-requests`}>
        Friend requests
      </StyledNavLink>
      <StyledNavLink to={`${path}/conversations`}>Conversations</StyledNavLink>
    </Flex>
  )
}

const StyledNavLink = styled(NavLink)`
  padding: 0.5rem 1rem;
  :hover,
  &.active {
    background-color: #964cff;
    color: white;
  }
  :not(:first-of-type) {
    border-top: 1px solid #e1e1e1;
  }
`

const TabMenu = () => {
  const { path } = useRouteMatch()

  return (
    <Flex as="nav" mb={4} overflowX="scroll">
      <StyledTab exact to={`${path}/info`}>
        Info
      </StyledTab>
      <StyledTab exact to={`${path}/collabs`}>
        Collabs
      </StyledTab>
      <StyledTab exact to={`${path}/tasks`}>
        Tasks
      </StyledTab>
      <StyledTab exact to={`${path}/collab-invitations`}>
        Invitations
      </StyledTab>
      <StyledTab exact to={`${path}/collab-requests`}>
        Requests to join
      </StyledTab>
      <StyledTab exact to={`${path}/friends`}>
        Friends
      </StyledTab>
      <StyledTab exact to={`${path}/friend-requests`}>
        Friend Requests
      </StyledTab>
      <StyledTab to={`${path}/conversations`}>Conversations</StyledTab>
    </Flex>
  )
}

const StyledTab = styled(NavLink)`
  font-size: 0.85rem;
  white-space: nowrap;
  padding: 0.25rem 0.5rem;
  font-weight: 500;

  &.active {
    border-bottom: 3px solid #964cff;
  }
`
