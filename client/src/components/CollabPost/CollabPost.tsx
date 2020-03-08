import React from 'react'
import { gql } from 'apollo-boost'
import { useParams, Link } from 'react-router-dom'
import {
  useGetCollabPostQuery,
  useRequestToJoinMutation,
  useDeclineCollabInvitationMutation,
  useAcceptCollabInvitationMutation,
} from '../../graphql/generates'
import { Text, Heading, Stack, Flex, Avatar, Button } from '@chakra-ui/core'
// import { useGet } from '../../graphql/generates'

const GET_COLLAB_POST = gql`
  query GetCollabPost($postId: ID!) {
    collabPost(postId: $postId) {
      id
      name
      title
      description
      owner {
        id
        username
      }
      collabId
      experience
      stack
      hasStarted
      members {
        id
        username
        avatar
      }
      acceptsInvites
      isOwner
      isMember
      invitationPending
      requestToJoinPending
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
`

// const CANCEL_COLLAB_REQUEST_TO_JOIN = gql`
//   mutation CancelCollabRequestToJoin($collabId: ID!) {
//     cancelRequestToJoin(collabId: $collabId)
//   }
// `

const ACCEPT_COLLAB_INVITATION = gql`
  mutation AcceptCollabInvitation($collabId: ID!) {
    acceptCollabInvitation(collabId: $collabId) {
      id
    }
  }
`

const DECLINE_COLLAB_INVITATION = gql`
  mutation DeclineCollabInvitation($collabId: ID!) {
    declineCollabInvitation(collabId: $collabId)
  }
`

export const CollabPost = () => {
  const { postId } = useParams<{ postId: string }>()
  const { data, loading, error } = useGetCollabPostQuery({
    variables: { postId },
  })
  const [requestToJoin] = useRequestToJoinMutation()
  const [declineCollabInvitation] = useDeclineCollabInvitationMutation()
  const [acceptCollabInvitation] = useAcceptCollabInvitationMutation({
    refetchQueries: [{ query: GET_COLLAB_POST, variables: { postId } }],
  })
  // const [cancelRequestToJoin] = useCancelCollabRequestToJoinMutation()

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch post</h1>
  if (!data?.collabPost) return null

  const {
    id,
    name,
    title,
    description,
    owner,
    collabId,
    experience,
    stack,
    hasStarted,
    members,
    acceptsInvites,
    isOwner,
    isMember,
    invitationPending,
    requestToJoinPending,
    comments,
  } = data.collabPost
  return (
    <main>
      <div>
        <Heading as="h3">Members</Heading>
        <Flex shadow="md" direction="column" borderWidth="1px" maxW={250}>
          {members.map(member => (
            <Link key={member.id} style={{ flex: 1 }} to={`/user/${member.id}`}>
              <Flex p={2}>
                <Avatar
                  mr={2}
                  size="xs"
                  src={member.avatar!}
                  name={member.username}
                />
                {member.username}
              </Flex>
            </Link>
          ))}
        </Flex>
        {acceptsInvites &&
          !isMember &&
          !requestToJoinPending &&
          !invitationPending && (
            <Button onClick={() => requestToJoin({ variables: { collabId } })}>
              Request to join
            </Button>
          )}
        {requestToJoinPending && (
          // TODO: cancel request
          <>
            <Button isDisabled>Pending</Button>
            <Button
            // onClick={() => cancelRequestToJoin({ variables: { collabId } })}
            >
              Cancel
            </Button>
          </>
        )}
        {invitationPending && (
          // TODO: accept or decline request
          <>
            <Button
              onClick={() =>
                acceptCollabInvitation({ variables: { collabId } })
              }
            >
              Accept
            </Button>
            <Button
              onClick={() =>
                declineCollabInvitation({ variables: { collabId } })
              }
            >
              Decline
            </Button>
          </>
        )}
      </div>
      <Stack spacing={3}>
        <Heading as="h2">{name}</Heading>
        <Heading as="h1">{title}</Heading>
      </Stack>
      <Text>{stack}</Text>
      <Text>{experience}</Text>
      <Text>{String(hasStarted)}</Text>
      <Text>{members.map(member => member.username)}</Text>
    </main>
  )
}
