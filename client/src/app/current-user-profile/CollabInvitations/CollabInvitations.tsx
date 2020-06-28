import React from 'react'
import { Button, Text, Box, Heading, PseudoBox } from '@chakra-ui/core'
import { DataProxy } from 'apollo-cache'
import {
  useGetCurrentUserCollabInvitationsQuery,
  useAcceptCollabInvitationMutation,
  useDeclineCollabInvitationMutation,
  GetCurrentUserCollabInvitationsDocument,
  GetCurrentUserCollabInvitationsQuery,
} from '../../../graphql/generates'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { getAvatarUrl } from '../../../utils'

const removeInvitationFromCache = (store: DataProxy, collabId: string) => {
  const query = GetCurrentUserCollabInvitationsDocument

  const invitationsData = store.readQuery<GetCurrentUserCollabInvitationsQuery>(
    {
      query,
    },
  )!

  store.writeQuery({
    query,
    data: {
      currentUser: {
        ...invitationsData.currentUser!,
        collabInvites: invitationsData.currentUser!.collabInvites.filter(
          ({ id }) => id !== collabId,
        ),
      },
    },
  })
}

export const CollabInvitations = () => {
  const {
    data,
    loading,
    error,
    refetch,
  } = useGetCurrentUserCollabInvitationsQuery()
  const [acceptInvitation] = useAcceptCollabInvitationMutation({
    update(store, { data }) {
      if (!data) return
      removeInvitationFromCache(store, data.acceptCollabInvitation)
    },
  })
  const [declineInvitation] = useDeclineCollabInvitationMutation({
    update(store, { data }) {
      if (!data) return
      removeInvitationFromCache(store, data.declineCollabInvitation)
    },
  })

  const { collabInvites } = data?.currentUser || {}

  return (
    <Box as="main" flex={1}>
      <Heading as="h1" size="md" mb={4} fontWeight={500}>
        Collab Invitations
      </Heading>
      <section>
        {collabInvites?.map(({ id, name, owner }) => (
          <PseudoBox
            key={id}
            py={4}
            px={2}
            _notFirst={{
              borderTop: '1px solid #e1e1e1',
            }}
            _hover={{
              bg: '#EEE',
            }}
          >
            <Box mb={4}>
              <AvatarWithUsername
                id={owner.id}
                avatar={getAvatarUrl(owner.avatar)}
                username={owner.username}
                size="sm"
                mb={2}
              />
              <Text>
                invited you to join{' '}
                <Text as="span" fontWeight={700}>
                  {name}
                </Text>
              </Text>
            </Box>
            <Button
              size="sm"
              variant="outline"
              variantColor="red"
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
          </PseudoBox>
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
