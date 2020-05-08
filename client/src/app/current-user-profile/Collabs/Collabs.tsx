import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Heading, Link } from '@chakra-ui/core'
import { useGetCurrentUserCollabsQuery } from '../../../graphql/generates'

export const Collabs = () => {
  const { data, loading, error } = useGetCurrentUserCollabsQuery()

  console.log(data)
  if (loading) return null
  if (error) return <span>Could not fetch collabs</span>
  return (
    <div>
      {data?.currentUser?.collabs.map(({ id, name }) => (
        <Link
          as={RouterLink as any}
          key={id}
          //@ts-ignore
          to={`/collab/${id}`}
        >
          <Heading size="md">{name}</Heading>
        </Link>
      ))}
    </div>
  )
}
