import React, { useState, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import {
  useTaskCommentsQuery,
  useCreateTaskCommentMutation,
  useAddTaskCommentReactionMutation,
  useRemoveTaskCommentReactionMutation,
} from '../../../graphql/generates'
import { Flex, Box, Textarea, Button, Text } from '@chakra-ui/core'
import { ReactionPanel } from '../../../components/ReactionPanel/ReactionPanel'
import { Loader } from '../../../components/Loader'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'

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
    console.log(commentInput)
    if (loading || !commentInput) return

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

  const { comments } = data?.task || {}

  return (
    <div>
      {loading && <Loader />}
      {comments?.map(comment => (
        <Box
          key={comment.id}
          bg="#f2f2fe"
          p={2}
          borderBottom="1px solid #cfcfcf"
        >
          <Flex mb={2}>
            {comment.author ? (
              <AvatarWithUsername size="xs" {...comment.author} />
            ) : (
              <Text as="span">Deleted User</Text>
            )}
          </Flex>
          <Text mb={2}>{comment.content}</Text>
          <ReactionPanel
            reactions={comment.reactions}
            addReaction={handleAddReaction(comment.id)}
            removeReaction={handleRemoveReaction(comment.id)}
          />
        </Box>
      ))}
      <Box as="form" p={2} onSubmit={handleCommentSubmit}>
        <Flex direction="column" justify="end">
          <Textarea
            p={2}
            value={commentInput}
            placeholder="Add a Comment"
            onChange={(e: any) => setCommentInput(e.target.value)}
            resize="none"
            mb={2}
            lineHeight={1.1}
            minHeight={80}
            isRequired
            fontSize="0.9rem"
          />
          <Button boxShadow="md" size="sm" type="submit" variantColor="purple">
            Comment
          </Button>
        </Flex>
      </Box>
    </div>
  )
}
