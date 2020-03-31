import React from 'react'
import { useParams } from 'react-router-dom'
import { useCollabMembersQuery } from '../../graphql/generates'
import { UserCard } from '../UserCard/UserCard'
import { Flex, Box, Grid } from '@chakra-ui/core'

export const CollabMembers = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const { data } = useCollabMembersQuery({ variables: { collabId } })

  return (
    <Grid gap={4} templateColumns="repeat(3, 1fr)">
      {data?.collab?.members.map(member => (
        <UserCard key={member.id} {...member} />
      ))}
    </Grid>
  )
}
