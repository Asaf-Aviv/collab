import React, { FormEvent, useState } from 'react'
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

export const CollabPost = () => {
  const { postId } = useParams<{ postId: string }>()
  const { data, loading, error } = useGetCollabPostQuery({
    variables: { postId },
  })
  const [commentInput, setCommentInput] = useState('')
  const [addComment] = useAddCollabPostCommentMutation({
    refetchQueries: [{ query: COLLAB_POST_COMMENTS, variables: { postId } }],
    onCompleted: () => setCommentInput(''),
  })
  const [addReaction] = useAddCollabPostReactionMutation()
  const [removeReaction] = useRemoveCollabPostReactionMutation()

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch post</h1>
  if (!data?.collabPost) return null

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addComment({
      variables: {
        postId: data.collabPost!.id,
        content: commentInput,
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
    // id,
    name,
    title,
    description,
    createdAt,
    owner,
    experience,
    stack,
    hasStarted,
    members,
    languages,
    isNew,
    // isOwner,
    reactions,
    ...memberRequestsInfo
  } = data.collabPost

  const { collabId } = memberRequestsInfo

  return (
    <main>
      <Container maxWidth={900}>
        <section>
          <Paper as="article" p={3} mb={10} flexDirection="column">
            <Flex as="header" align="center" mb={6}>
              <PostAuthorHeader author={owner} date={createdAt} />
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
                <AvatarWithUsername fontSize="0.85rem" size="xs" {...member} />
              </Flex>
            ))}
          </Box>
          {/* <CollabMembers members={members} /> */}
          <MemberInvitationActions {...memberRequestsInfo} />
        </Flex>
        <section>
          <CommentForm
            onSubmit={handleCommentSubmit}
            value={commentInput}
            onChange={setCommentInput}
          />
        </section>
        <section>
          <SectionHorizonalHeader title="Comments" titleTag="h4" />
          <PostComments />
        </section>
      </Container>
    </main>
  )
}
