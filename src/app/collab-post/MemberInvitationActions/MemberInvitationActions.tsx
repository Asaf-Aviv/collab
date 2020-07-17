import React from 'react'
import { useParams } from 'react-router-dom'
import {
  useRequestToJoinMutation,
  useDeclineCollabInvitationMutation,
  useAcceptCollabInvitationMutation,
  useCancelCollabRequestToJoinMutation,
} from '../../../graphql/generates'
import { Text, Flex, Button, FlexProps } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { GET_COLLAB_POST } from '../../../graphql/queries'
import { useToastNotification } from '../../notifications'

type Props = FlexProps & {
  collabId: string
  acceptsInvites: boolean
  isMember: boolean
  invitationPending: boolean
  requestToJoinPending: boolean
}

export const MemberInvitationActions = ({
  acceptsInvites,
  isMember,
  requestToJoinPending,
  invitationPending,
  collabId,
  ...props
}: Props) => {
  const { postId } = useParams<{ postId: string }>()
  const variables = { collabId }
  const notify = useToastNotification()
  const [requestToJoin] = useRequestToJoinMutation({
    variables,
    refetchQueries: [{ query: GET_COLLAB_POST, variables: { postId } }],
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })
  const [declineCollabInvitation] = useDeclineCollabInvitationMutation({
    variables,
    refetchQueries: [{ query: GET_COLLAB_POST, variables: { postId } }],
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })
  const [acceptCollabInvitation] = useAcceptCollabInvitationMutation({
    variables,
    refetchQueries: [{ query: GET_COLLAB_POST, variables: { postId } }],
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })
  const [cancelRequestToJoin] = useCancelCollabRequestToJoinMutation({
    variables,
    refetchQueries: [{ query: GET_COLLAB_POST, variables: { postId } }],
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })

  return (
    <ButtonsContainer {...props} wrap="wrap">
      {acceptsInvites &&
        !isMember &&
        !requestToJoinPending &&
        !invitationPending && (
          <Button
            size="sm"
            boxShadow="md"
            variantColor="purple"
            onClick={() => requestToJoin()}
          >
            Request to join
          </Button>
        )}
      {requestToJoinPending && (
        <>
          <Button isDisabled boxShadow="md" size="sm">
            Pending
          </Button>
          <Button
            size="sm"
            variantColor="red"
            boxShadow="md"
            onClick={() => cancelRequestToJoin()}
          >
            Cancel
          </Button>
        </>
      )}
      {invitationPending && (
        <>
          <Text flexBasis="100%" mb={4}>
            You are invited to join this collab
          </Text>
          <Button
            size="sm"
            boxShadow="md"
            onClick={() => declineCollabInvitation()}
          >
            Decline
          </Button>
          <Button
            size="sm"
            boxShadow="md"
            variantColor="purple"
            onClick={() => acceptCollabInvitation()}
          >
            Accept
          </Button>
        </>
      )}
    </ButtonsContainer>
  )
}

const ButtonsContainer = styled(Flex)`
  > :nth-of-type(2) {
    margin-left: 1rem;
  }
`
