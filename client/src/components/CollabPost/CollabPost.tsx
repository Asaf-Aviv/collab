import React, { FormEvent, useState } from 'react'
import { gql } from 'apollo-boost'
import { useParams } from 'react-router-dom'
import {
  useGetCollabPostQuery,
  useRequestToJoinMutation,
  useDeclineCollabInvitationMutation,
  useAcceptCollabInvitationMutation,
  useCancelCollabRequestToJoinMutation,
  User,
  useAddCollabPostCommentMutation,
} from '../../graphql/generates'
import {
  Text,
  Heading,
  Stack,
  Flex,
  Button,
  Box,
  Textarea,
} from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import styled from '@emotion/styled'
import { Comment } from '../Comment/Comment'

export const GET_COLLAB_POST = gql`
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
      createdAt
    }
  }
`

export const REQUEST_TO_JOIN_COLLAB = gql`
  mutation RequestToJoin($collabId: ID!) {
    requestToJoin(collabId: $collabId)
  }
`

export const CANCEL_COLLAB_REQUEST_TO_JOIN = gql`
  mutation CancelCollabRequestToJoin($collabId: ID!) {
    cancelRequestToJoin(collabId: $collabId)
  }
`

export const ACCEPT_COLLAB_INVITATION = gql`
  mutation AcceptCollabInvitation($collabId: ID!) {
    acceptCollabInvitation(collabId: $collabId) {
      id
    }
  }
`

export const DECLINE_COLLAB_INVITATION = gql`
  mutation DeclineCollabInvitation($collabId: ID!) {
    declineCollabInvitation(collabId: $collabId)
  }
`

export const ADD_COLLAB_POST_COMMENT = gql`
  mutation AddCollabPostComment($content: String!, $postId: ID!) {
    createComment(content: $content, postId: $postId) {
      id
      content
      author {
        id
        username
        avatar
      }
    }
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
  const [cancelRequestToJoin] = useCancelCollabRequestToJoinMutation()
  const [commentInput, setCommentInput] = useState('')
  const [addComment] = useAddCollabPostCommentMutation()

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch post</h1>
  if (!data?.collabPost) return null

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addComment({
      variables: {
        postId: data.collabPost!.id,
        content: commentInput,
      },
    })
  }

  const {
    // id,
    name,
    title,
    description,
    createdAt,
    // owner,
    collabId,
    experience,
    stack,
    hasStarted,
    members,
    acceptsInvites,
    // isOwner,
    isMember,
    invitationPending,
    requestToJoinPending,
    comments,
  } = data.collabPost

  return (
    <main>
      <Flex>
        <CollabMembers members={members}>
          {acceptsInvites &&
            !isMember &&
            !requestToJoinPending &&
            !invitationPending && (
              <Button
                onClick={() => requestToJoin({ variables: { collabId } })}
              >
                Request to join
              </Button>
            )}
          {requestToJoinPending && (
            <>
              <Button isDisabled>Pending</Button>
              <Button
                onClick={() => cancelRequestToJoin({ variables: { collabId } })}
              >
                Cancel
              </Button>
            </>
          )}
          {invitationPending && (
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
        </CollabMembers>
        <Box flex={1}>
          <Stack spacing={3}>
            <Heading as="h2">{name}</Heading>
            <Heading as="h1">{title}</Heading>
          </Stack>
          <time>{createdAt}</time>
          <Text>{stack}</Text>
          <Text>{experience}</Text>
          <Text>{String(hasStarted)}</Text>
          <Text>{description}</Text>
          <section>
            <header>
              <Heading as="h3">Comments</Heading>
            </header>
            <form onSubmit={handleCommentSubmit}>
              <Textarea
                value={commentInput}
                onChange={(e: any) => setCommentInput(e.target.value)}
              />
              <Button type="submit">Comment</Button>
            </form>
            {comments.map(comment => (
              <Comment key={comment.id} {...comment} />
            ))}
          </section>
        </Box>
      </Flex>
    </main>
  )
}

type Props = {
  members: Omit<User, 'collabs'>[]
  children: React.ReactNode
}

const CollabMembers = ({ members, children }: Props) => {
  return (
    <Box flexShrink={0} mr={10} flexBasis={250}>
      <Heading size="md" as="h3">
        Members
      </Heading>
      <MemberList
        mt={2}
        mb={4}
        shadow="md"
        direction="column"
        borderWidth="1px"
      >
        {members.map(member => (
          <AvatarWithUsername size="sm" key={member.id} {...member} />
        ))}
      </MemberList>
      {children}
    </Box>
  )
}

const MemberList = styled(Flex)`
  > * {
    padding: 0.25rem;
  }
`
