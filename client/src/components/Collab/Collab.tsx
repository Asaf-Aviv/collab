import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { Flex, Button } from '@chakra-ui/core'
import { useCollabQuery } from '../../graphql/generates'

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
  const { data, loading, error } = useCollabQuery({
    variables: { collabId },
  })

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Collab not found</h1>
  if (!data?.collab) return null

  const { name, owner, members } = data.collab

  return (
    <div>
      <Flex as="nav" direction="column">
        <Link to="/">Members</Link>
        <Link to="/">Pending Invitations</Link>
        <Link to="/">Pending Requests</Link>
        <Link to="/">Task Board</Link>
        <Link to="/">Discussions</Link>
      </Flex>
      <h1>{name}</h1>
      <h3>{owner?.username}</h3>
      <Flex>
        {members.filter(Boolean).map(member => (
          <div key={member!.id}>{member!.username}</div>
        ))}
      </Flex>
    </div>
  )
}
