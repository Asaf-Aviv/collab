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
import styled from '@emotion/styled'
import { useCollabQuery } from '../../../graphql/generates'
import { Wall } from '../Wall'
import { TaskBoard } from '../../task-board/TaskBoard'
import { CollabMembers } from '../CollabMembers'
import { CollabDiscussions } from '../CollabDiscussions'
import { DiscussionThread } from '../DiscussionThread'
import { useToastNotification } from '../../notifications'
import { DisplayError } from '../../../components/DisplayError'
import { useWindowWidth } from '../../../providers'
import { Container } from '../../../components/global'
import { SEO } from '../../../components/SEO'

export const Collab = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const notify = useToastNotification()
  const match = useRouteMatch()
  const width = useWindowWidth()
  const { data, error } = useCollabQuery({
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
    <Flex wrap={['wrap', 'wrap', 'nowrap']}>
      {width > 767 ? (
        <Flex
          as="nav"
          direction="column"
          position="sticky"
          top="64px"
          height="calc(100vh - 64px)"
          bg="purple.600"
          color="white"
          minWidth={250}
          zIndex={5}
        >
          <StyledNavLink to={`${match.url}/wall`}>Wall</StyledNavLink>
          <StyledNavLink to={`${match.url}/task-board`}>
            Task Board
          </StyledNavLink>
          <StyledNavLink to={`${match.url}/members`}>Members</StyledNavLink>
          <StyledNavLink to={`${match.url}/discussions`}>
            Discussions
          </StyledNavLink>
        </Flex>
      ) : (
        <TabMenu />
      )}
      <Box
        flex={1}
        py={[0, 0, 4]}
        px={12}
        maxWidth={['100%', '100%', 'calc(100vw - 250px)']}
      >
        <Switch>
          <Route path={`${match.path}/wall`}>
            <SEO
              title={`Wall - ${data?.collab?.name}`}
              url={window.location.href}
            />
            <Wall />
          </Route>
          <Route path={`${match.path}/task-board`}>
            <SEO
              title={`Task Board - ${data?.collab?.name}`}
              url={window.location.href}
            />
            <TaskBoard />
          </Route>
          <Route path={`${match.path}/members`}>
            <SEO
              title={`Members - ${data?.collab?.name}`}
              url={window.location.href}
            />
            <CollabMembers isOwner={data?.collab?.isOwner} />
          </Route>
          <Route exact path={`${match.path}/discussions`}>
            <SEO
              title={`Discussions - ${data?.collab?.name}`}
              url={window.location.href}
            />
            <CollabDiscussions />
          </Route>
          <Route path={`${match.path}/discussions/:threadId`}>
            <DiscussionThread collabName={data?.collab?.name} />
          </Route>
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

const TabMenu = () => {
  const match = useRouteMatch()

  return (
    <Container width="100%">
      <Flex as="nav" overflowX="scroll" width="100%" py={2} height="50px">
        <StyledTab to={`${match.url}/wall`}>Wall</StyledTab>
        <StyledTab to={`${match.url}/task-board`}>Task Board</StyledTab>
        <StyledTab to={`${match.url}/members`}>Members</StyledTab>
        <StyledTab to={`${match.url}/discussions`}>Discussions</StyledTab>
      </Flex>
    </Container>
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
