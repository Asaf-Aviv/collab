import React from 'react'
import {
  useParams,
  Route,
  useRouteMatch,
  Switch,
  Redirect,
  NavLink,
} from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/core'
import { useCollabQuery } from '../../../graphql/generates'
import { Wall } from '../Wall'
import { TaskBoard } from '../../task-board/TaskBoard'
import { CollabMembers } from '../CollabMembers'
import { CollabDiscussions } from '../CollabDiscussions'
import { DiscussionThread } from '../DiscussionThread'
import styled from '@emotion/styled'
import { useToastNotification } from '../../notifications'
import { DisplayError } from '../../../components/DisplayError'

export const Collab = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const notify = useToastNotification()
  const match = useRouteMatch()
  const { error } = useCollabQuery({
    variables: { collabId },
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })

  if (error) return <DisplayError message={error.message} />

  return (
    <Flex>
      <Flex
        as="nav"
        direction="column"
        position="sticky"
        top="64px"
        height="calc(100vh - 64px)"
        bg="purple.600"
        color="white"
        width={250}
        zIndex={5}
      >
        <StyledNavLink to={`${match.url}/wall`}>Wall</StyledNavLink>
        <StyledNavLink to={`${match.url}/task-board`}>Task Board</StyledNavLink>
        <StyledNavLink to={`${match.url}/members`}>Members</StyledNavLink>
        <StyledNavLink to={`${match.url}/discussions`}>
          Discussions
        </StyledNavLink>
      </Flex>
      <Box flex={1} py={8} px="2.5%" maxWidth="calc(100vw - 250px - 5%)">
        <Switch>
          <Route path={`${match.path}/wall`} component={Wall} />
          <Route path={`${match.path}/task-board`} component={TaskBoard} />
          <Route path={`${match.path}/members`} component={CollabMembers} />
          <Route
            exact
            path={`${match.path}/discussions`}
            component={CollabDiscussions}
          />
          <Route
            path={`${match.path}/discussions/:threadId`}
            component={DiscussionThread}
          />
          <Redirect to={`${match.path}/wall`} />
        </Switch>
      </Box>
    </Flex>
  )
}

const StyledNavLink = styled(NavLink)`
  padding: 0.75rem 1rem;
  transition: padding 250ms;

  &:hover,
  &:focus,
  &.active {
    background-color: rgba(255, 255, 255, 0.15);
  }

  &.active {
    padding-left: 1.5rem;
  }
`
