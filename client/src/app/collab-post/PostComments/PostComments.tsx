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

export const PostComments = () => {
  const { postId } = useParams<{ postId: string }>()
  const { data, loading, error } = useCollabPostCommentsQuery({
    variables: { postId },
  })
  const [addReaction] = useAddCollabPostCommentReactionMutation({
    refetchQueries: [{ query: COLLAB_POST_COMMENTS, variables: { postId } }],
  })
  const [removeReaction] = useRemoveCollabPostCommentReactionMutation({
    refetchQueries: [{ query: COLLAB_POST_COMMENTS, variables: { postId } }],
  })

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch comments</h1>
  if (!data?.collabPost) return null

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

  const { comments } = data.collabPost

  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.id} {...comment}>
          <ReactionPanel
            reactions={comment.reactions}
            addReaction={handleAddReaction(comment.id)}
            removeReaction={handleRemoveReaction(comment.id)}
          />
        </Comment>
      ))}
    </div>
  )
}
