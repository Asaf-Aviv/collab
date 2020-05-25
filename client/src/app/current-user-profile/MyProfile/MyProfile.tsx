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

export const MyProfile = () => {
  const { path } = useRouteMatch()

  return (
    <Container maxWidth={900}>
      <Flex align="flex-start">
        <Flex
          direction="column"
          bg="white"
          minWidth={200}
          mr={10}
          overflow="hidden"
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
            Invitations
          </StyledNavLink>
          <StyledNavLink exact to={`${path}/collab-requests`}>
            Requests to join
          </StyledNavLink>
          <StyledNavLink exact to={`${path}/friends`}>
            Friends
          </StyledNavLink>
          <StyledNavLink to={`${path}/conversations`}>
            Conversations
          </StyledNavLink>
        </Flex>
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

const StyledNavLink = styled(NavLink)`
  padding: 0.75rem 1rem;
  :hover,
  &.active {
    background-color: #964cff;
    color: white;
  }
  :not(:first-of-type) {
    border-top: 1px solid #e1e1e1;
  }
`
