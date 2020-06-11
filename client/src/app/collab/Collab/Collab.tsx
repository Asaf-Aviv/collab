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
import { useWindowWidth } from '../../../providers'
import { Container } from '../../../components/global'

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
          width={250}
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
        px="2.5%"
        maxWidth={['100%', '100%', 'calc(100vw - 250px)']}
      >
        <Switch>
          <Route path={`${match.path}/wall`} component={Wall} />
          <Route path={`${match.path}/task-board`} component={TaskBoard} />
          <Route
            path={`${match.path}/members`}
            render={() => <CollabMembers isOwner={data?.collab?.isOwner} />}
          />
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
