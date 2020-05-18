import React from 'react'
import { Button, Text, Box, Heading, Flex } from '@chakra-ui/core'
import {
  useGetCurrentUserCollabInvitationsQuery,
  useAcceptCollabInvitationMutation,
  useDeclineCollabInvitationMutation,
} from '../../../graphql/generates'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'

export const CollabInvitations = () => {
  const {
    data,
    loading,
    error,
    refetch,
  } = useGetCurrentUserCollabInvitationsQuery()
  const [acceptInvitation] = useAcceptCollabInvitationMutation()
  const [declineInvitation] = useDeclineCollabInvitationMutation()

  const { collabInvites } = data?.currentUser || {}

  return (
    <Box as="main" flex={1}>
      <Heading as="h1" mb={4} fontWeight={500}>
        Collab Invitations
      </Heading>
      <section>
        {collabInvites?.map(({ id, name, owner }) => (
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
        {loading && <Loader />}
        {error && (
          <DisplayError
            message="Could not fetch requests"
            onClick={() => refetch()}
          />
        )}
      </section>
    </Box>
  )
}
