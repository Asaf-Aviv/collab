import React, { FormEvent, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  useGetCollabPostQuery,
  useRequestToJoinMutation,
  useDeclineCollabInvitationMutation,
  useAcceptCollabInvitationMutation,
  useCancelCollabRequestToJoinMutation,
  User,
  useAddCollabPostCommentMutation,
  useCollabPostCommentsQuery,
  useRemoveCollabPostReactionMutation,
  useAddCollabPostReactionMutation,
  useAddCollabPostCommentReactionMutation,
  useRemoveCollabPostCommentReactionMutation,
} from '../../graphql/generates'
import {
  Text,
  Heading,
  Stack,
  Flex,
  Button,
  Box,
  Divider,
} from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import styled from '@emotion/styled'
import { Comment } from '../Comment/Comment'
import { Container } from '../global'
import { GET_COLLAB_POST, COLLAB_POST_COMMENTS } from '../../graphql/queries'
import { ReactionPanel } from '../ReactionPanel/ReactionPanel'
import { PostAuthorHeader } from '../PostAuthorHeader/PostAuthorHeader'
import { CommentForm } from '../CommentForm/CommentForm'
import { PostStackTag } from '../PostStackTag/PostStackTag'

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
          <Box mr={4} minWidth={220}>
            <CollabMembers members={members} />
            <MemberInvitationActions {...memberRequestsInfo} />
          </Box>
          <Box flex={1}>
            <Box bg="white" p={8} boxShadow="md" borderRadius={6} mb={10}>
              <Flex as="header" align="center" mb={6}>
                <PostAuthorHeader author={owner} date={createdAt} />
                <PostStackTag ml="auto" variantColor="blue">
                  {experience}
                </PostStackTag>
                {!hasStarted && (
                  <PostStackTag variantColor="green" ml={2}>
                    FRESH PROJECT
                  </PostStackTag>
                )}
                {isNew && (
                  <PostStackTag variantColor="green" ml={2}>
                    NEW
                  </PostStackTag>
                )}
              </Flex>
              <Stack spacing={4} mb={6}>
                <Link to={`/collab/${collabId}`}>
                  <Heading as="h2" color="#964cff">
                    {name}
                  </Heading>
                </Link>
                <Heading as="h1">{title}</Heading>
              </Stack>
              <Text fontSize={['lg', 'xl']}>{description}</Text>
              <Flex wrap="wrap" mt={6} mb={4}>
                {languages.map(language => (
                  <PostStackTag
                    key={language}
                    variantColor="blue"
                    mr={2}
                    mb={2}
                  >
                    {language}
                  </PostStackTag>
                ))}
                {stack.map(tech => (
                  <PostStackTag key={tech} mr={2} mb={2}>
                    {tech}
                  </PostStackTag>
                ))}
              </Flex>
              <ReactionPanel
                reactions={reactions}
                addReaction={handleAddReaction}
                removeReaction={handleRemoveReaction}
              />
            </Box>
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
                  zIndex={2}
                >
                  <Heading as="h3" mb={2} size="sm" mr={2}>
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

type Props = {
  members: Omit<User, 'collabs'>[]
}

const CollabMembers = ({ members }: Props) => {
  return (
    <Box>
      <Heading size="md" as="h3">
        Members
      </Heading>
      <MemberList
        mt={2}
        mb={4}
        shadow="md"
        direction="column"
        borderWidth="1px"
        borderRadius={6}
      >
        {members.map(member => (
          <AvatarWithUsername size="sm" key={member.id} {...member} />
        ))}
      </MemberList>
    </Box>
  )
}

const MemberList = styled(Flex)`
  > * {
    padding: 0.25rem;
  }
`

const PostComments = () => {
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

type InvitationProps = {
  collabId: string
  acceptsInvites: boolean
  isMember: boolean
  invitationPending: boolean
  requestToJoinPending: boolean
}

const MemberInvitationActions = ({
  acceptsInvites,
  isMember,
  requestToJoinPending,
  invitationPending,
  collabId,
}: InvitationProps) => {
  const { postId } = useParams<{ postId: string }>()
  const [requestToJoin] = useRequestToJoinMutation({
    refetchQueries: [{ query: GET_COLLAB_POST, variables: { postId } }],
  })
  const [declineCollabInvitation] = useDeclineCollabInvitationMutation({
    refetchQueries: [{ query: GET_COLLAB_POST, variables: { postId } }],
  })
  const [acceptCollabInvitation] = useAcceptCollabInvitationMutation({
    refetchQueries: [{ query: GET_COLLAB_POST, variables: { postId } }],
  })
  const [cancelRequestToJoin] = useCancelCollabRequestToJoinMutation({
    refetchQueries: [{ query: GET_COLLAB_POST, variables: { postId } }],
  })

  return (
    <ButtonsContainer>
      {acceptsInvites &&
        !isMember &&
        !requestToJoinPending &&
        !invitationPending && (
          <Button
            boxShadow="md"
            variantColor="purple"
            onClick={() => requestToJoin({ variables: { collabId } })}
          >
            Request to join
          </Button>
        )}
      {requestToJoinPending && (
        <>
          <Button isDisabled boxShadow="md">
            Pending
          </Button>
          <Button
            variantColor="red"
            boxShadow="md"
            onClick={() => cancelRequestToJoin({ variables: { collabId } })}
          >
            Cancel
          </Button>
        </>
      )}
      {invitationPending && (
        <>
          <Button
            boxShadow="md"
            onClick={() => declineCollabInvitation({ variables: { collabId } })}
          >
            Decline
          </Button>
          <Button
            boxShadow="md"
            variantColor="purple"
            onClick={() => acceptCollabInvitation({ variables: { collabId } })}
          >
            Accept
          </Button>
        </>
      )}
    </ButtonsContainer>
  )
}

const ButtonsContainer = styled(Flex)`
  & :nth-of-type(2) {
    margin-left: 1rem;
  }
  & > * {
    flex: 1;
  }
`
