import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Button, Box } from '@chakra-ui/core'
import {
  useCollabMembersQuery,
  useRemoveMemberMutation,
  CollabMembersDocument,
} from '../../../graphql/generates'
import { UserCard } from '../../../components/UserCard/UserCard'
import { useCurrentUser } from '../../../providers'
import { InviteMembersModal } from '../InviteMembersModal'
import { useToastNotification } from '../../notifications'

export const CollabMembers = ({ isOwner = false }) => {
  const notify = useToastNotification()
  const { collabId } = useParams<{ collabId: string }>()
  const [isInviteMembersModalOpen, setIsInviteMembersModalOpen] = useState(
    false,
  )
  const currentUser = useCurrentUser()
  const { data } = useCollabMembersQuery({ variables: { collabId } })
  const [removeMember] = useRemoveMemberMutation({
    refetchQueries: [
      {
        query: CollabMembersDocument,
        variables: {
          collabId,
        },
      },
    ],
    onCompleted() {
      notify('success', {
        message: `Successfully removed member`,
      })
    },
    onError({ message }) {
      notify('error', {
        message,
      })
    },
  })

  return (
    <Box as="main" pb={4}>
      {isOwner && (
        <Button
          variantColor="purple"
          onClick={() => setIsInviteMembersModalOpen(true)}
          mx={['auto', 'auto', 'initial']}
          display="block"
          mb={2}
        >
          Invite Members
        </Button>
      )}
      {isInviteMembersModalOpen && (
        <InviteMembersModal
          closeModal={() => setIsInviteMembersModalOpen(false)}
        />
      )}
      <Grid
        as="section"
        gap={4}
        templateColumns={[
          'repeat(auto-fill, minMax(300px, 320px))',
          'repeat(auto-fill, minMax(300px, 320px))',
          'repeat(auto-fill, minMax(300px, 1fr))',
        ]}
        justifyContent={['center', 'center', 'initial']}
      >
        {data?.collab?.members.map(member => (
          <UserCard
            key={member.id}
            {...member}
            showDotsMenu={currentUser?.id !== member.id}
            dotsMenuItems={
              isOwner ? (
                <Button
                  size="sm"
                  onClick={() =>
                    removeMember({
                      variables: {
                        collabId,
                        memberId: member.id,
                      },
                    })
                  }
                >
                  Remove Member
                </Button>
              ) : null
            }
          />
        ))}
      </Grid>
    </Box>
  )
}
