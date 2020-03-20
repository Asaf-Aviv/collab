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
} from '../../graphql/generates'
import {
  Text,
  Heading,
  Stack,
  Flex,
  Button,
  Box,
  Textarea,
  Tag,
  Divider,
} from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import styled from '@emotion/styled'
import { Comment } from '../Comment/Comment'
import { Container } from '../global'
import { GET_COLLAB_POST } from '../../graphql/queries'
import { formatDate } from '../../utils'

export const CollabPost = () => {
  const { postId } = useParams<{ postId: string }>()
  const { data, loading, error } = useGetCollabPostQuery({
    variables: { postId },
  })
  const [commentInput, setCommentInput] = useState('')
  const [addComment] = useAddCollabPostCommentMutation()

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
    // isNew,
    // isOwner,
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
                <AvatarWithUsername {...owner} />
                <Box lineHeight={1.2} as="time" ml={2} fontSize="0.8rem">
                  {formatDate(createdAt)}
                </Box>
                <Tag boxShadow="md" ml="auto" size="md" variantColor="pink">
                  {experience}
                </Tag>
                {!hasStarted && (
                  <Tag variantColor="green" size="md" boxShadow="md" ml={2}>
                    FRESH PROJECT
                  </Tag>
                )}
                <Tag variantColor="green" size="md" boxShadow="md" ml={2}>
                  NEW
                </Tag>
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
              <Flex wrap="wrap" mt={6}>
                {stack.map(tech => (
                  <Tag
                    boxShadow="md"
                    size="md"
                    variantColor="pink"
                    key={tech}
                    mr={2}
                    mb={2}
                  >
                    {tech}
                  </Tag>
                ))}
              </Flex>
            </Box>
            <section>
              <form onSubmit={handleCommentSubmit}>
                <Text
                  as="span"
                  display="inline-block"
                  borderBottom="2px solid #964cff"
                  mb="-2px"
                  position="relative"
                  zIndex={2}
                >
                  <Heading as="h3" mb={2} size="sm" mr={2}>
                    Add a Comment
                  </Heading>
                </Text>
                <Divider mt={0} mb={6} />
                <Textarea
                  placeholder="Add a comment"
                  boxShadow="md"
                  value={commentInput}
                  onChange={(e: any) => setCommentInput(e.target.value)}
                  minHeight={120}
                  border="none"
                  mb={6}
                />
                <Button
                  display="block"
                  ml="auto"
                  type="submit"
                  variantColor="purple"
                  mb={6}
                  boxShadow="md"
                >
                  Comment
                </Button>
              </form>
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

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch comments</h1>
  if (!data?.collabPost) return null

  const { comments } = data.collabPost

  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.id} {...comment} />
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
  const [requestToJoin] = useRequestToJoinMutation()
  const [declineCollabInvitation] = useDeclineCollabInvitationMutation()
  const [acceptCollabInvitation] = useAcceptCollabInvitationMutation({
    refetchQueries: [{ query: GET_COLLAB_POST, variables: { postId } }],
  })
  const [cancelRequestToJoin] = useCancelCollabRequestToJoinMutation()

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
  & :nth-child(2) {
    margin-left: 1rem;
  }
  & > * {
    flex: 1;
  }
`
