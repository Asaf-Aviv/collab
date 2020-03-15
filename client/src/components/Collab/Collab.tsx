import React from 'react'
import {
  useParams,
  Link,
  useLocation,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'
import { gql } from 'apollo-boost'
import { Flex, Button } from '@chakra-ui/core'
import { useCollabQuery } from '../../graphql/generates'
import { TaskBoard } from '../TaskBoard/TaskBoard'
import { CollabMembers } from '../CollabMembers/CollabMembers'
import { Discussions } from '../Discussions/Discussions'

export const GET_COLLAB_BY_ID = gql`
  query Collab($collabId: ID!) {
    collab(collabId: $collabId) {
      id
      name
      owner {
        id
        username
        avatar
      }
      collabPostId
      acceptsInvites
      members {
        id
        username
        avatar
      }
      isOwner
      pendingInvites {
        id
        username
        avatar
      }
      pendingRequests {
        id
        username
        avatar
      }
      taskList {
        id
        name
        order
        tasks {
          id
          description
          author {
            id
            username
            avatar
          }
          comments {
            id
            content
            author {
              id
              username
              avatar
            }
          }
        }
      }
      discussionThreads {
        id
        title
        author {
          id
          username
          avatar
        }
        comments {
          id
          content
          author {
            id
            username
            avatar
          }
        }
      }
    }
  }
`

export const Collab = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const match = useRouteMatch()
  const location = useLocation()
  const { data, loading, error } = useCollabQuery({
    variables: { collabId },
  })

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Collab not found</h1>
  if (!data?.collab) return null

  const { name, owner, members } = data.collab

  return (
    <div>
      <Flex as="nav" direction="column" position="fixed">
        <Link to={`${match.url}/members`}>Members</Link>
        <Link to={`${match.url}/task-board`}>Task Board</Link>
        <Link to={`${match.url}/discussions`}>Discussions</Link>
      </Flex>
      <Route path={`${match.path}/members`} component={CollabMembers} />
      <Route path={`${match.path}/task-board`} component={TaskBoard} />
      <Route path={`${match.path}/discussions`} component={Discussions} />
    </div>
  )
}
