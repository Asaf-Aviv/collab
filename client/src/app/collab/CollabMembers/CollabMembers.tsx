import React from 'react'
import { useParams } from 'react-router-dom'
import { useCollabMembersQuery } from '../../../graphql/generates'
import { UserCard } from '../../../components/UserCard/UserCard'
import { Grid } from '@chakra-ui/core'

export const CollabMembers = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const { data } = useCollabMembersQuery({ variables: { collabId } })

  return (
    <main>
      <Grid
        as="section"
        gap={4}
        templateColumns="repeat(auto-fill, minMax(300px, 350px))"
        justifyContent={{ sm: 'center', lg: 'initial' }}
      >
        {data?.collab?.members.map(member => (
          <UserCard key={member.id} {...member} />
        ))}
      </Grid>
    </main>
  )
}
