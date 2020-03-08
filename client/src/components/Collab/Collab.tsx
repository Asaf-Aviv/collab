import React from 'react'
import { useParams } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { Flex, Button } from '@chakra-ui/core'
import {
  useCollabQuery,
  useRequestToJoinMutation,
} from '../../graphql/generates'

const GET_COLLAB_BY_ID = gql`
  query Collab($collabId: ID!) {
    collab(collabId: $collabId) {
      id
      name
      acceptsInvites
      isOwner
      isMember
      invitationPending
      requestToJoinPending
      owner {
        id
        username
      }
      members {
        id
        username
      }
    }
  }
`

const REQUEST_TO_JOIN_COLLAB = gql`
  mutation RequestToJoin($collabId: ID!) {
    requestToJoin(collabId: $collabId)
  }
`

export const Collab = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const [requestToJoin] = useRequestToJoinMutation({
    variables: { collabId },
    onError: err => console.error(err.message),
  })
  const { data, loading, error } = useCollabQuery({
    variables: { collabId },
  })

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Collab not found</h1>
  if (!data?.collab) return null

  const {
    name,
    owner,
    acceptsInvites,
    members,
    isMember,
    invitationPending,
    requestToJoinPending,
  } = data.collab

  return (
    <div>
      <h1>{name}</h1>
      <h3>{owner?.username}</h3>
      {acceptsInvites && !isMember && (
        <Button onClick={() => requestToJoin()}>Request to join</Button>
      )}
      {requestToJoinPending && (
        // TODO: cancel request
        <>
          <Button onClick={() => requestToJoin()}>Pending</Button>
        </>
      )}
      {invitationPending && (
        // TODO: accept or decline request
        <>
          <Button onClick={() => requestToJoin()}>Accept</Button>
          <Button onClick={() => requestToJoin()}>Decline</Button>
        </>
      )}
      <Flex>
        {members.filter(Boolean).map(member => (
          <div key={member!.id}>{member!.username}</div>
        ))}
      </Flex>
    </div>
  )
}
