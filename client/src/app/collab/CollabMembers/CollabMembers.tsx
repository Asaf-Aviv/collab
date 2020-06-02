import React from 'react'
import { useParams } from 'react-router-dom'
import {
  useCollabMembersQuery,
  useRemoveMemberMutation,
} from '../../../graphql/generates'
import { UserCard } from '../../../components/UserCard/UserCard'
import { Grid, Button } from '@chakra-ui/core'
import { useCurrentUser } from '../../../providers'
import { DotsMenu } from '../../../components/DotsMenu/Index'

export const CollabMembers = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const currentUser = useCurrentUser()
  const { data } = useCollabMembersQuery({ variables: { collabId } })
  const [removeMember] = useRemoveMemberMutation()

  return (
    <main>
      <Grid
        as="section"
        gap={4}
        templateColumns="repeat(auto-fill, minMax(300px, 350px))"
        justifyContent={{ sm: 'center', lg: 'initial' }}
      >
        {data?.collab?.members.map(member => (
          <UserCard
            key={member.id}
            {...member}
            {...(currentUser?.id !== member.id && {
              dotsMenu: (
                <DotsMenu
                  iconProps={{
                    ariaLabel: 'User Menu',
                    color: '#c1c1c1',
                    _hover: { bg: 'inherit', color: 'white' },
                    _focus: { bg: 'inherit', color: 'white' },
                    _active: { bg: 'inherit', color: 'white' },
                  }}
                >
                  <Button
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
    </main>
  )
}
