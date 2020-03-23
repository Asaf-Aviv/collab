import React from 'react'
import { useParams } from 'react-router-dom'
import { useCollabMembersQuery } from '../../graphql/generates'

export const CollabMembers = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const { data } = useCollabMembersQuery({ variables: { collabId } })

  return (
    <div>
      {data?.collab?.members.map(member => (
        <div key={member.id}>{member?.username}</div>
      ))}
    </div>
  )
}
