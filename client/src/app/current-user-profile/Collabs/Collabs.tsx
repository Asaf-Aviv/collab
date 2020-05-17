import React from 'react'
import { Link } from 'react-router-dom'
import { Heading, Box } from '@chakra-ui/core'
import { useGetCurrentUserCollabsQuery } from '../../../graphql/generates'
import { Paper } from '../../../components/global'

export const Collabs = () => {
  const { data, loading, error } = useGetCurrentUserCollabsQuery()

  if (loading) return null
  if (error) return <span>Could not fetch collabs</span>

  return (
    <Box as="main" flex={1}>
      <Heading as="h1" mb={4} fontWeight={500}>
        My Collabs
      </Heading>
      {data?.currentUser?.collabs.map(({ id, name }) => (
        <Paper
          key={id}
          as={Link}
          width="100%"
          maxWidth={500}
          //@ts-ignore
          to={`/collab/${id}`}
          p={4}
        >
          <Heading size="sm">{name}</Heading>
        </Paper>
      ))}
    </Box>
  )
}
