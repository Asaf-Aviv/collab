import React from 'react'
import { useParams } from 'react-router-dom'
import {
  useCollabThreadQuery,
  useCollabThreadCommentsQuery,
  useAddCollabDiscussionThreadReactionMutation,
  useRemoveCollabDiscussionThreadReactionMutation,
  useAddDiscussionThreadCommentReactionMutation,
  useRemoveDiscussionThreadCommentReactionMutation,
  useCreateDiscussionThreadCommentMutation,
} from '../../../graphql/generates'
import { Box, Heading, Text } from '@chakra-ui/core'
import { Comment } from '../../../components/Comment/Comment'
import { ReactionPanel } from '../../../components/ReactionPanel/ReactionPanel'
import {
  GET_COLLAB_DISCUSSION_THREAD_COMMENTS,
  GET_COLLAB_DISCUSSION_THREAD,
} from '../../../graphql/queries'
import { Paper } from '../../../components/global'
import { PostAuthorHeader } from '../../../components/PostAuthorHeader/PostAuthorHeader'
import { CommentForm } from '../../../components/CommentForm/CommentForm'
import { SectionHorizonalHeader } from '../../../components/SectionHorizonalHeader/SectionHorizonalHeader'

export const DiscussionThread = () => {
  const { collabId, threadId } = useParams<{
    collabId: string
    threadId: string
  }>()
  const { data: threadData } = useCollabThreadQuery({ variables: { threadId } })
  const { data: commentsData, refetch } = useCollabThreadCommentsQuery({
    variables: { threadId },
  })
  const [addComment] = useCreateDiscussionThreadCommentMutation({
    onCompleted: () => {
      refetch()
    },
  })
  const [addThreadReaction] = useAddCollabDiscussionThreadReactionMutation({
    refetchQueries: [
      { query: GET_COLLAB_DISCUSSION_THREAD, variables: { threadId } },
    ],
  })
  const [
    removeThreadReaction,
  ] = useRemoveCollabDiscussionThreadReactionMutation({
    refetchQueries: [
      { query: GET_COLLAB_DISCUSSION_THREAD, variables: { threadId } },
    ],
  })
  const [addReaction] = useAddDiscussionThreadCommentReactionMutation({
    refetchQueries: [
      { query: GET_COLLAB_DISCUSSION_THREAD_COMMENTS, variables: { threadId } },
    ],
  })
  const [removeReaction] = useRemoveDiscussionThreadCommentReactionMutation({
    refetchQueries: [
      { query: GET_COLLAB_DISCUSSION_THREAD_COMMENTS, variables: { threadId } },
    ],
  })

  if (!threadData?.thread) return null

  const handleCommentSubmit = (content: string) => {
    addComment({
      variables: {
        input: {
          collabId,
          threadId,
          content,
        },
      },
    })
  }

  const handleAddThreadReaction = (emojiId: string) => {
    addThreadReaction({
      variables: {
        reaction: {
          emojiId,
          threadId,
        },
      },
    })
  }

  const handleRemoveThreadReaction = (emojiId: string) => {
    removeThreadReaction({
      variables: {
        reaction: {
          emojiId,
          threadId,
        },
      },
    })
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

  const { title, author, ...thread } = threadData.thread

  return (
    <Box as="main" maxWidth={900} mx="auto" pb={8}>
      <section>
        <Paper as="article" flexDirection="column" p={3} mb={6}>
          <header>
            <PostAuthorHeader author={author} date="" mb={4} />
            <Heading as="h1" size="lg" mb={4}>
              {title}
            </Heading>
          </header>
          <Text mb={8} maxWidth="60ch">
            {thread.content}
          </Text>
          <ReactionPanel
            reactions={thread.reactions}
            addReaction={handleAddThreadReaction}
            removeReaction={handleRemoveThreadReaction}
          />
        </Paper>
      </section>
      <section>
        <CommentForm onSubmit={handleCommentSubmit} />
      </section>
      <section>
        <SectionHorizonalHeader title="Comments" titleTag="h3" />
        {commentsData?.thread?.comments.map(comment => (
          <Comment key={comment.id} {...comment}>
            <ReactionPanel
              reactions={comment.reactions}
              addReaction={handleAddReaction(comment.id)}
              removeReaction={handleRemoveReaction(comment.id)}
            />
          </Comment>
        ))}
      </section>
    </Box>
  )
}
