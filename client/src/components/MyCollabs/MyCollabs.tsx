import React from 'react'
import { useGetMyCollabsQuery } from '../../graphql/generates'

export const MyCollabs = () => {
  const { data, loading, error } = useGetMyCollabsQuery()

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch Collabs</h1>
  if (!data?.currentUser?.collabs) return null

  const { collabs } = data.currentUser

  return (
    <div>
      {collabs.map(collab => (
        <div key={collab.id}>{collab.name}</div>
      ))}
    </div>
  )
}
