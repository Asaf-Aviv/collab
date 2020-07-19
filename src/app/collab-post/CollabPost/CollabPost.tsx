import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  useGetCollabPostQuery,
  useAddCollabPostCommentMutation,
  useRemoveCollabPostReactionMutation,
  useAddCollabPostReactionMutation,
} from '../../../graphql/generates'
import { Text, Heading, Stack, Flex, Box } from '@chakra-ui/core'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername/AvatarWithUsername'
import { Container } from '../../../components/global'
import { COLLAB_POST_COMMENTS } from '../../../graphql/queries'
import { ReactionPanel } from '../../../components/ReactionPanel/ReactionPanel'
import { PostAuthorHeader } from '../../../components/PostAuthorHeader/PostAuthorHeader'
import { CommentForm } from '../../../components/CommentForm/CommentForm'
import { PostTag } from '../../../components/PostTag'
import { PostComments } from '../PostComments'
import { MemberInvitationActions } from '../MemberInvitationActions'
import { Paper } from '../../../components/global'
import { SectionHorizonalHeader } from '../../../components/SectionHorizonalHeader/SectionHorizonalHeader'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { useToastNotification } from '../../notifications'
import { SEO } from '../../../components/SEO'

export const CollabPost = () => {
  const { postId } = useParams<{ postId: string }>()
  const notify = useToastNotification()
  const { data, loading, error, refetch } = useGetCollabPostQuery({
    variables: { postId },
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })
  const [addComment] = useAddCollabPostCommentMutation({
    refetchQueries: [{ query: COLLAB_POST_COMMENTS, variables: { postId } }],
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })
  const [addReaction] = useAddCollabPostReactionMutation({
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })
  const [removeReaction] = useRemoveCollabPostReactionMutation({
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })

  if (loading)
    return (
      <Container maxWidth={900}>
        <Loader />
      </Container>
    )

  if (error)
    return (
      <DisplayError message="Could not fetch post" onClick={() => refetch()} />
    )

  if (!data?.collabPost)
    return (
      <Text textAlign="center" py={2} fontWeight={500}>
        Post not found
      </Text>
    )

  const handleCommentSubmit = (content: string) => {
    addComment({
      variables: {
        postId: data.collabPost!.id,
        content,
      },
    })
  }

  const handleAddReaction = (emojiId: string) => {
    addReaction({
      variables: {
        reaction: {
          emojiId,
          postId,
        },
      },
    })
  }

  const handleRemoveReaction = (emojiId: string) => {
    removeReaction({
      variables: {
        reaction: {
          emojiId,
          postId,
        },
      },
    })
  }

  const {
    name,
    title,
    description,
    creationDate,
    owner,
    experience,
    stack,
    hasStarted,
    members,
    languages,
    isNew,
    reactions,
    ...memberRequestsInfo
  } = data.collabPost

  const { collabId } = memberRequestsInfo

  return (
    <>
      <SEO title={title} description={description} url={window.location.href} />
      <main>
        <Container maxWidth={900}>
          <section>
            <Paper as="article" p={3} mb={10} flexDirection="column">
              <Flex as="header" align="center" mb={6}>
                <PostAuthorHeader author={owner} date={creationDate} />
                {isNew && (
                  <PostTag variantColor="green" ml="auto">
                    NEW
                  </PostTag>
                )}
              </Flex>
              <Stack spacing={4}>
                <Box
                  as={Link}
                  //@ts-ignore
                  to={`/collab/${collabId}`}
                >
                  <Heading size="lg" as="h2" color="#964cff">
                    {name}
                  </Heading>
                </Box>
                <Heading size="lg" as="h1">
                  {title}
                </Heading>
                <Text maxWidth="60ch">{description}</Text>
                <Flex wrap="wrap">
                  <PostTag mt={2}>{experience}</PostTag>
                  {!hasStarted && <PostTag mt={2}>FRESH PROJECT</PostTag>}
                  {languages.map(language => (
                    <PostTag key={language} mt={2}>
                      {language}
                    </PostTag>
                  ))}
                  {stack.map(tech => (
                    <PostTag key={tech} mt={2}>
                      {tech}
                    </PostTag>
                  ))}
                </Flex>
                <ReactionPanel
                  mt={2}
                  reactions={reactions}
                  addReaction={handleAddReaction}
                  removeReaction={handleRemoveReaction}
                />
              </Stack>
            </Paper>
          </section>
          <Flex as="section" direction="column" align="flex-start" mb={8}>
            <SectionHorizonalHeader title="Members" titleTag="h3" />
            <Box mb={4}>
              {members.map(member => (
                <Flex align="center" key={member.id} p={1}>
                  <AvatarWithUsername
                    fontSize="0.85rem"
                    size="xs"
                    {...member}
                  />
                </Flex>
              ))}
            </Box>
            <MemberInvitationActions {...memberRequestsInfo} />
          </Flex>
          <section>
            <CommentForm onSubmit={handleCommentSubmit} />
          </section>
          <section>
            <SectionHorizonalHeader title="Comments" titleTag="h4" />
            <PostComments />
          </section>
        </Container>
      </main>
    </>
  )
}
