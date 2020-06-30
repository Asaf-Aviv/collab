import React from 'react'
import { useParams } from 'react-router-dom'
import {
  useCollabPostCommentsQuery,
  useAddCollabPostCommentReactionMutation,
  useRemoveCollabPostCommentReactionMutation,
} from '../../../graphql/generates'
import { Comment } from '../../../components/Comment'
import { ReactionPanel } from '../../../components/ReactionPanel/ReactionPanel'
import { COLLAB_POST_COMMENTS } from '../../../graphql/queries'
import { Box, Text } from '@chakra-ui/core'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { useToastNotification } from '../../notifications'

export const PostComments = () => {
  const { postId } = useParams<{ postId: string }>()
  const notify = useToastNotification()
  const { data, loading, error, refetch } = useCollabPostCommentsQuery({
    variables: { postId },
  })
  const [addReaction] = useAddCollabPostCommentReactionMutation({
    refetchQueries: [{ query: COLLAB_POST_COMMENTS, variables: { postId } }],
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })
  const [removeReaction] = useRemoveCollabPostCommentReactionMutation({
    refetchQueries: [{ query: COLLAB_POST_COMMENTS, variables: { postId } }],
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })

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

  const { comments } = data?.collabPost ?? {}

  return (
    <Box pb={8}>
      {comments?.map(comment => (
        <Comment key={comment.id} {...comment}>
          <ReactionPanel
            reactions={comment.reactions}
            addReaction={handleAddReaction(comment.id)}
            removeReaction={handleRemoveReaction(comment.id)}
          />
        </Comment>
      ))}
      {loading && <Loader />}
      {error && (
        <DisplayError
          message="Could not fetch comments"
          onClick={() => refetch()}
        />
      )}
      {comments?.length === 0 && <Text>Be the first one to comment</Text>}
    </Box>
  )
}
