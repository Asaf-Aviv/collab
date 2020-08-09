import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text } from '@chakra-ui/core'
import {
  useCollabThreadQuery,
  useCollabThreadCommentsQuery,
  useAddCollabDiscussionThreadReactionMutation,
  useRemoveCollabDiscussionThreadReactionMutation,
  useAddDiscussionThreadCommentReactionMutation,
  useRemoveDiscussionThreadCommentReactionMutation,
  useCreateDiscussionThreadCommentMutation,
} from '../../../graphql/generates'
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
import { useToastNotification } from '../../notifications'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { SEO } from '../../../components/SEO'

type Props = {
  collabName?: string
}

export const DiscussionThread = ({ collabName }: Props) => {
  const { collabId, threadId } = useParams<{
    collabId: string
    threadId: string
  }>()
  const {
    loading: loadingThread,
    error: threadError,
    data: threadData,
    refetch: refetchThread,
  } = useCollabThreadQuery({ variables: { threadId } })
  const {
    data: commentsData,
    loading: loadingComments,
    error: commentsError,
    refetch: refetchComments,
  } = useCollabThreadCommentsQuery({
    variables: { threadId },
  })
  const notify = useToastNotification()
  const [addComment] = useCreateDiscussionThreadCommentMutation({
    onCompleted: () => {
      refetchComments()
    },
    onError: ({ message }) => {
      notify('error', { title: 'Error', message })
    },
  })
  const [addThreadReaction] = useAddCollabDiscussionThreadReactionMutation({
    refetchQueries: [
      { query: GET_COLLAB_DISCUSSION_THREAD, variables: { threadId } },
    ],
    onError: ({ message }) => {
      notify('error', { title: 'Error', message })
    },
  })
  const [
    removeThreadReaction,
  ] = useRemoveCollabDiscussionThreadReactionMutation({
    refetchQueries: [
      { query: GET_COLLAB_DISCUSSION_THREAD, variables: { threadId } },
    ],
    onError: ({ message }) => {
      notify('error', { title: 'Error', message })
    },
  })
  const [addReaction] = useAddDiscussionThreadCommentReactionMutation({
    refetchQueries: [
      { query: GET_COLLAB_DISCUSSION_THREAD_COMMENTS, variables: { threadId } },
    ],
    onError: ({ message }) => {
      notify('error', { title: 'Error', message })
    },
  })
  const [removeReaction] = useRemoveDiscussionThreadCommentReactionMutation({
    refetchQueries: [
      { query: GET_COLLAB_DISCUSSION_THREAD_COMMENTS, variables: { threadId } },
    ],
    onError: ({ message }) => {
      notify('error', { title: 'Error', message })
    },
  })

  if (!threadData?.thread) {
    return (
      <Box py={4} textAlign="center">
        <Text>Thread not found</Text>
      </Box>
    )
  }

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

  const { title, author, creationDate, ...thread } = threadData.thread

  return (
    <>
      <SEO
        title={title ? `${title} - ${collabName}` : undefined}
        url={window.location.href}
      />
      <Box as="main" maxWidth={900} mx="auto" pb={8}>
        {loadingThread && <Loader />}
        {threadError && (
          <DisplayError
            message="Could not fetch thread"
            onClick={() => refetchThread()}
          />
        )}
        <section>
          <Paper as="article" flexDirection="column" p={3} mb={6}>
            <header>
              {author ? (
                <PostAuthorHeader author={author} date={creationDate} mb={4} />
              ) : (
                '[deleted user]'
              )}
            </header>
            <Box pl={14}>
              <Heading as="h1" size="lg" mb={4}>
                {title}
              </Heading>
              <Text mb={8} maxWidth="60ch">
                {thread.content}
              </Text>
              <ReactionPanel
                reactions={thread.reactions}
                addReaction={handleAddThreadReaction}
                removeReaction={handleRemoveThreadReaction}
              />
            </Box>
          </Paper>
        </section>
        <section>
          <CommentForm onSubmit={handleCommentSubmit} />
        </section>
        <section>
          <SectionHorizonalHeader title="Comments" titleTag="h3" />
          {loadingComments && <Loader />}
          {commentsError && (
            <DisplayError
              message="Could not fetch comments"
              onClick={() => refetchComments()}
            />
          )}
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
    </>
  )
}
