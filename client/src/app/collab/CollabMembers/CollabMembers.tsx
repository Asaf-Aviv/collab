import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useCollabMembersQuery,
  useRemoveMemberMutation,
} from '../../../graphql/generates'
import { UserCard } from '../../../components/UserCard/UserCard'
import { Grid, Button, Box } from '@chakra-ui/core'
import { useCurrentUser } from '../../../providers'
import { DotsMenu } from '../../../components/DotsMenu/Index'
import { InviteMembersModal } from '../InviteMembersModal'

export const CollabMembers = ({ isOwner = false }) => {
  const { collabId } = useParams<{ collabId: string }>()
  const [isInviteMembersModalOpen, setIsInviteMembersModalOpen] = useState(
    false,
  )
  const currentUser = useCurrentUser()
  const { data } = useCollabMembersQuery({ variables: { collabId } })
  const [removeMember] = useRemoveMemberMutation()

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
            {...(isOwner &&
              currentUser?.id !== member.id && {
                dotsMenu: (
                  <DotsMenu
                    iconProps={{
                      ariaLabel: 'User Menu',
                      color: '#c1c1c1',
                      _hover: dotsMenuIconStyles,
                      _focus: dotsMenuIconStyles,
                      _active: dotsMenuIconStyles,
                    }}
                  >
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
                  </DotsMenu>
                ),
              })}
          />
        ))}
      </Grid>
    </Box>
  )
}

const dotsMenuIconStyles = { bg: 'inherit', color: 'white' }
