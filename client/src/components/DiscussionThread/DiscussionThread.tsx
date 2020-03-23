import React from 'react'
import { useParams } from 'react-router-dom'
import {
  useCollabThreadQuery,
  useCollabThreadCommentsQuery,
} from '../../graphql/generates'
import { Box, Heading } from '@chakra-ui/core'
import { Comment } from '../Comment/Comment'

export const DiscussionThread = () => {
  const { threadId } = useParams<{ threadId: string }>()
  const { data: threadData } = useCollabThreadQuery({ variables: { threadId } })
  const { data: commentsData } = useCollabThreadCommentsQuery({
    variables: { threadId },
  })

  if (!threadData?.thread) return null

  const { title, ...thread } = threadData.thread

  return (
    <Box>
      <Heading as="h1" size="lg" mb={6}>
        {title}
      </Heading>
      <Comment {...thread} />
      {commentsData?.thread?.comments.map(comment => (
        <Comment key={comment.id} {...comment} />
      ))}
    </Box>
  )
}
