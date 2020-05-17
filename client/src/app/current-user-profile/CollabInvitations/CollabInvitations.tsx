import React from 'react'
import { Button, Text, Box, Heading, Flex } from '@chakra-ui/core'
import {
  useGetCurrentUserCollabInvitationsQuery,
  useAcceptCollabInvitationMutation,
  useDeclineCollabInvitationMutation,
} from '../../../graphql/generates'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'

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
    <Box as="main">
      <Heading as="h1" mb={4} fontWeight={500}>
        Collab invitations
      </Heading>
      <section>
        {collabInvites.map(({ id, name, owner }) => (
          <Box key={id} py={4} px={2} borderBottom="1px solid #e1e1e1">
            <Flex align="center" mb={4}>
              <AvatarWithUsername
                id={owner.id}
                avatar={owner.avatar ?? undefined}
                username={owner.username}
                size="sm"
                mr={2}
              />
              <Text>
                invited you to join{' '}
                <Text as="span" fontWeight={700}>
                  {name}
                </Text>
              </Text>
            </Flex>
            <Button
              size="sm"
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
              size="sm"
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
          </Box>
        ))}
      </section>
    </Box>
  )
}
