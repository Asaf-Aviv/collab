import React from 'react'
import { Text, Flex } from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import { User } from '../../graphql/generates'
import styled from '@emotion/styled'

type Props = {
  id: string
  content: string
  author: Omit<User, 'collabs'>
}

export const Comment = ({ /* id ,*/ content, author }: Props) => (
  <CommentContainer
    as="article"
    direction="column"
    align="start"
    bg="white"
    p={5}
    boxShadow="md"
    borderRadius={6}
  >
    <AvatarWithUsername size="sm" {...author} />
    <Text mt={2}>{content}</Text>
  </CommentContainer>
)

const CommentContainer = styled(Flex)`
  & + & {
    margin-top: 1.5rem;
  }
`
