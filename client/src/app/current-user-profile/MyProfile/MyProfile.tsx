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
import { Container, Paper } from '../../../components/global'
import { Information } from '../Information'
import { Collabs } from '../Collabs'
import { Tasks } from '../Tasks'
import { Friends } from '../Friends'
import { CollabInvitations } from '../CollabInvitations'
import { CollabRequests } from '../CollabRequests'
import { Conversations } from '../Conversations'

export const MyProfile = () => {
  const { path } = useRouteMatch()

  return (
    <Container>
      <Flex>
        <Paper
          flexDirection="column"
          bg="white"
          minWidth={200}
          mr={10}
          overflow="hidden"
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
        </Paper>
        <Paper flex={1}>
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
            <Route path={`${path}/conversations`}>
              <Conversations />
            </Route>
            <Redirect to="/profile/info" />
          </Switch>
        </Paper>
      </Flex>
    </Container>
  )
}

const StyledNavLink = styled(NavLink)`
  padding: 0.75rem 1rem;
  font-weight: 700;
  transition: color, background-color 300ms ease-out;
  &:hover,
  &.active {
    background-color: #964cff;
    color: white;
  }
`
