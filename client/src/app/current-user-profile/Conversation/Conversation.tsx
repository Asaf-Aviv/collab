import React from 'react'
import { useParams } from 'react-router-dom'
import { useCurrentUserConversationQuery } from '../../../graphql/generates'

export const Conversation = () => {
  const { userId } = useParams<{ userId: string }>()
  const {
    data,
    loading,
    error /* fetchMore */,
  } = useCurrentUserConversationQuery({
    variables: { userId, offset: 0, limit: 10 },
  })

  if (loading) return <span>loading...</span>
  if (error) return <span>Could not fetch conversations</span>
  if (!data?.getConversation) return null

  // const { messages, hasNextPage } = data.getConversation

  return null
}
