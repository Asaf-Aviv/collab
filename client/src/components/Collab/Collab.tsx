import React from 'react'
import { useParams } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const GET_COLLAB_BY_ID = gql`
  query Collab($collabId: ID!) {
    collab(collabId: $collabId) {
      id
      title
      ownerId
      experience
      stack
      description
      owner {
        id
        username
      }
    }
  }
`

export const Collab = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const { data, loading, error } = useQuery(GET_COLLAB_BY_ID, {
    variables: { collabId },
  })

  console.log(data)

  return <div>hello</div>
}
