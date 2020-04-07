import React, { useState, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import {
  useTaskCommentsQuery,
  useCreateTaskCommentMutation,
  useAddTaskCommentReactionMutation,
  useRemoveTaskCommentReactionMutation,
} from '../../graphql/generates'
import { Flex, Box, Textarea, Button } from '@chakra-ui/core'
import { ReactionPanel } from '../ReactionPanel/ReactionPanel'

export const TaskComments = ({ taskId }: { taskId: string }) => {
  const { collabId } = useParams<{ collabId: string }>()
  const [commentInput, setCommentInput] = useState('')
  const { data, loading, error, refetch } = useTaskCommentsQuery({
    variables: { taskId },
  })
  const [addReaction] = useAddTaskCommentReactionMutation({
    onCompleted: () => refetch(),
  })
  const [removeReaction] = useRemoveTaskCommentReactionMutation({
    onCompleted: () => refetch(),
  })
  const [addComment] = useCreateTaskCommentMutation({
    variables: {
      input: {
        collabId,
        content: commentInput,
        taskId,
      },
    },
    onCompleted: () => {
      refetch()
      setCommentInput('')
    },
  })

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addComment()
  }

  const handleAddReaction = (commentId: string) => (emojiId: string) => {
    addReaction({
      variables: {
        reaction: {
          emojiId,
          commentId,
        },
      },
    })
  }

  const handleRemoveReaction = (commentId: string) => (emojiId: string) => {
    removeReaction({
      variables: {
        reaction: {
          emojiId,
          commentId,
        },
      },
    })
  }

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Collab not found</h1>
  if (!data?.task?.comments) return null

  const { comments } = data.task

  return (
    <div>
      {comments.map(comment => (
        <Box key={comment.id}>
          {comment.content}
          <ReactionPanel
            reactions={comment.reactions}
            addReaction={handleAddReaction(comment.id)}
            removeReaction={handleRemoveReaction(comment.id)}
          />
        </Box>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <Flex direction="column" justify="end">
          <Textarea
            p={1}
            value={commentInput}
            onChange={(e: any) => setCommentInput(e.target.value)}
            resize="none"
            mb={2}
            lineHeight={1.1}
            minHeight={120}
            fontSize="0.9rem"
          />
          <Button
            boxShadow="md"
            size="sm"
            variantColor="purple"
            onClick={() => addComment()}
          >
            Comment
          </Button>
        </Flex>
      </form>
    </div>
  )
}
