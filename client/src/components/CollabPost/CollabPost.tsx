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
import { PostTag } from '../PostTag'

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
            <Box bg="white" p={6} boxShadow="md" borderRadius={6} mb={10}>
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
                <Text>{description}</Text>
                <Flex wrap="wrap">
                  <PostTag>{experience}</PostTag>
                  {!hasStarted && <PostTag>FRESH PROJECT</PostTag>}
                  {languages.map(language => (
                    <PostTag key={language}>{language}</PostTag>
                  ))}
                  {stack.map(tech => (
                    <PostTag key={tech}>{tech}</PostTag>
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
  members: Pick<User, 'id' | 'username' | 'avatar'>[]
}

const CollabMembers = ({ members }: Props) => {
  return (
    <Box>
      <Heading fontWeight={500} size="sm" as="h3">
        Members
      </Heading>
      <MemberList
        mt={2}
        mb={4}
        shadow="0 1px 1px 1px #c3c3c3"
        direction="column"
        borderRadius={6}
      >
        {members.map(member => (
          <AvatarWithUsername
            fontSize="0.85rem"
            size="xs"
            key={member.id}
            {...member}
          />
        ))}
      </MemberList>
    </Box>
  )
}

const MemberList = styled(Flex)`
  > * {
    padding: 0.5rem;
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
            size="sm"
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
            size="sm"
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
            size="sm"
            boxShadow="md"
            onClick={() => declineCollabInvitation({ variables: { collabId } })}
          >
            Decline
          </Button>
          <Button
            size="sm"
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
  > :nth-child(2) {
    margin-left: 1rem;
  }
  > * {
    flex: 1;
  }
`
