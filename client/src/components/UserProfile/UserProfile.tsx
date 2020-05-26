import React from 'react'
import { useParams } from 'react-router-dom'
import {
  useUserQuery,
  useSendFriendRequestMutation,
} from '../../graphql/generates'
import { Container } from '../global'
import { Flex, Avatar, Heading, Icon, Button } from '@chakra-ui/core'

type Props = {
  userId: string
  onCompleted?: (friendId: string) => void
}

const AddFriendButton = ({ userId, onCompleted }: Props) => {
  const [sendFriendRequest] = useSendFriendRequestMutation({
    variables: { friendId: userId },
    onCompleted: () => {
      onCompleted && onCompleted(userId)
    },
  })

  return (
    <Button size="sm" variantColor="purple" onClick={() => sendFriendRequest()}>
      <Icon name="add" aria-label="add friend" mr={2} />
      Add Friend
    </Button>
  )
}

export const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data } = useUserQuery({ variables: { id: userId } })

  if (!data?.user) return null

  const { username, avatar } = data.user

  return (
    <Container>
      <Flex>
        <Flex
          direction="column"
          bg="white"
          p={8}
          borderRadius={6}
          boxShadow="md"
          align="center"
        >
          <Avatar mb={4} size="lg" src={avatar!} name={username} />
          <Heading as="h1" size="sm">
            {username}
          </Heading>
        </Flex>
        <Flex flex={1}>
          <AddFriendButton userId={userId} />
        </Flex>
      </Flex>
    </Container>
  )
}
