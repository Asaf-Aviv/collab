import React from 'react'
import { Button, Text, Avatar } from '@chakra-ui/core'
import {
  useGetCurrentUserCollabInvitationsQuery,
  useAcceptCollabInvitationMutation,
  useDeclineCollabInvitationMutation,
} from '../../../graphql/generates'

export const CollabInvitations = () => {
  const { data, loading, error } = useGetCurrentUserCollabInvitationsQuery()
  const [acceptInvitation] = useAcceptCollabInvitationMutation()
  const [declineInvitation] = useDeclineCollabInvitationMutation()

  console.log(data)
  if (loading) return null
  if (error) return <span>Could not fetch invitations</span>
  if (!data?.currentUser) return null

  const { collabInvites } = data.currentUser

  return (
    <div>
      {collabInvites.map(({ id, name, owner }) => (
        <div key={id}>
          <Avatar src={owner!.avatar ?? undefined} name={owner!.username} />
          <Text>
            {owner!.username} invited you to join {name}
          </Text>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => {
              declineInvitation({
                variables: {
                  collabId: id,
                },
              })
            }}
          >
            Decline
          </Button>
          <Button
            variantColor="purple"
            onClick={() =>
              acceptInvitation({
                variables: {
                  collabId: id,
                },
              })
            }
          >
            Accept
          </Button>
        </div>
      ))}
    </div>
  )
}
