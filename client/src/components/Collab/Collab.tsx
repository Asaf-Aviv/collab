import React, { useState } from 'react'
import {
  useParams,
  Link,
  Route,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'
import { TabList, Tab, Tabs } from '@chakra-ui/core'
import { useCollabQuery } from '../../graphql/generates'
import { TaskBoard } from '../TaskBoard/TaskBoard'
import { CollabMembers } from '../CollabMembers/CollabMembers'
import { CollabDiscussions } from '../CollabDiscussions/CollabDiscussions'
import { Container } from '../global'
import { DiscussionThread } from '../DiscussionThread/DiscussionThread'

const tabs = ['members', 'task-board', 'discussions']

export const Collab = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const match = useRouteMatch()
  const { pathname } = useLocation()
  const [tabIndex, setTabIndex] = useState(
    tabs.indexOf(tabs.find(name => pathname.includes(name))!),
  )
  const { data, loading, error } = useCollabQuery({
    variables: { collabId },
  })

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Collab not found</h1>
  if (!data?.collab) return null

  // const { name, owner, isOwner, pendingInvites, pendingRequests, acceptsInvites, id, collabPostId } = data.collab

  return (
    <Container>
      <Tabs
        index={tabIndex}
        onChange={setTabIndex}
        variantColor="purple"
        mb={6}
      >
        <TabList as="nav">
          //@ts-ignore
          <Tab as={Link} to={`${match.url}/members`}>
            Members
          </Tab>
          //@ts-ignore
          <Tab as={Link} to={`${match.url}/task-board`}>
            Task Board
          </Tab>
          //@ts-ignore
          <Tab as={Link} to={`${match.url}/discussions`}>
            Discussions
          </Tab>
        </TabList>
      </Tabs>
      <Route path={`${match.path}/members`} component={CollabMembers} />
      <Route path={`${match.path}/task-board`} component={TaskBoard} />
      <Route
        exact
        path={`${match.path}/discussions`}
        component={CollabDiscussions}
      />
      <Route
        path={`${match.path}/discussions/:threadId`}
        component={DiscussionThread}
      />
    </Container>
  )
}
