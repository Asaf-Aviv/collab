import React from 'react'
import { Link } from 'react-router-dom'
import { Heading, Box, PseudoBox } from '@chakra-ui/core'
import { useGetCurrentUserCollabsQuery } from '../../../graphql/generates'
import { SEO } from '../../../components/SEO'

export const Collabs = () => {
  const { data, loading, error } = useGetCurrentUserCollabsQuery()

  if (loading) return null
  if (error) return <span>Could not fetch collabs</span>

  return (
    <>
      <SEO title="My Collabs" url={window.location.href} />
      <Box as="main" flex={1}>
        <Heading as="h1" size="md" mb={4} fontWeight={500}>
          My Collabs
        </Heading>
        {data?.currentUser?.collabs.map(({ id, name }) => (
          <PseudoBox
            key={id}
            as={Link}
            py={4}
            px={2}
            //@ts-ignore
            to={`/collab/${id}`}
            display="block"
            _notFirst={{
              borderTop: '1px solid #e1e1e1',
            }}
            _hover={{
              bg: '#EEE',
            }}
          >
            <Heading size="sm">{name}</Heading>
          </PseudoBox>
        ))}
      </Box>
    </>
  )
}
