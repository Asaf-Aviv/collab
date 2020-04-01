import React from 'react'
import { useParams } from 'react-router-dom'
import { useCollabPostsByStackQuery } from '../../graphql/generates'

type Props = {}

export const CollabPostsByStack = (props: Props) => {
  const { stack } = useParams<{ stack: string }>()
  const { data } = useCollabPostsByStackQuery({
    variables: {
      stack,
    },
  })

  console.log(data)

  return <div></div>
}
