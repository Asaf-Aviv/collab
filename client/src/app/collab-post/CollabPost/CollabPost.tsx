import React, { FormEvent, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  useGetCollabPostQuery,
  useAddCollabPostCommentMutation,
  useRemoveCollabPostReactionMutation,
  useAddCollabPostReactionMutation,
} from '../../../graphql/generates'
import { Text, Heading, Stack, Flex, Box, Divider } from '@chakra-ui/core'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername/AvatarWithUsername'
import { Container } from '../../../components/global'
import { COLLAB_POST_COMMENTS } from '../../../graphql/queries'
import { ReactionPanel } from '../../../components/ReactionPanel/ReactionPanel'
import { PostAuthorHeader } from '../../../components/PostAuthorHeader/PostAuthorHeader'
import { CommentForm } from '../../../components/CommentForm/CommentForm'
import { PostTag } from '../../../components/PostTag'
import { PostComments } from '../PostComments'
import { MemberInvitationActions } from '../MemberInvitationActions'

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
      <Container>
        <Flex>
          {/* <Box mr={4} minWidth={220}>
            <CollabMembers members={members} />
            <MemberInvitationActions {...memberRequestsInfo} />
          </Box> */}
          <Box flex={1}>
            <Box
              bg="white"
              p={6}
              boxShadow="0 1px 1px 1px #c3c3c3"
              borderRadius={6}
              mb={10}
            >
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
            </Box>
            <Flex direction="column" align="flex-start" mb={8}>
              <Text
                as="span"
                display="inline-block"
                borderBottom="2px solid #964cff"
                mb="-2px"
                position="relative"
              >
                <Heading as="h3" mb={2} size="sm" mr={2}>
                  Members
                </Heading>
              </Text>
              <Divider mt={0} mb={6} width="100%" />
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
              {/* <CollabMembers members={members} /> */}
              <MemberInvitationActions {...memberRequestsInfo} />
            </Flex>
            <section>
              <CommentForm
                onSubmit={handleCommentSubmit}
                value={commentInput}
                onChange={setCommentInput}
              />
              <header>
                <Text
                  as="span"
                  display="inline-block"
                  borderBottom="2px solid #964cff"
                  mb="-2px"
                  position="relative"
                >
                  <Heading as="h4" mb={2} size="sm" mr={2}>
                    Comments
                  </Heading>
                </Text>
                <Divider mt={0} mb={6} />
                <PostComments />
              </header>
            </section>
          </Box>
        </Flex>
      </Container>
    </main>
  )
}
