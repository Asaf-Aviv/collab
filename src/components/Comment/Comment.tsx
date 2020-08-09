import React from 'react'
import { Text, Flex, Box } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import { User } from '../../graphql/generates'
import { Paper } from '../global'
import { DisplayDate } from '../DisplayDate'

type Props = {
  id: string
  content: string
  author: Pick<User, 'id' | 'avatar' | 'username'> | null
  children?: React.ReactNode
  isAuthor: boolean
  creationDate: string
}

export const Comment = ({
  // isAuthor,
  content,
  author,
  creationDate,
  children,
}: Props) => (
  <CommentContainer
    as="article"
    flexDirection="column"
    alignItems="start"
    boxShadow="0 1px 1px 1px #c3c3c3"
    p={3}
  >
    <Flex as="header" justifyContent="space-between" align="center">
      {author && <AvatarWithUsername size="sm" {...author} />}
      {!author && <Text>Deleted User</Text>}
      <DisplayDate date={creationDate} ml={2} />
    </Flex>
    <Box pl={10}>
      <Text mt={2} mb={4}>
        {content}
      </Text>
      {children}
    </Box>
  </CommentContainer>
)

const CommentContainer = styled(Paper)`
  & + & {
    margin-top: 1.5rem;
  }
`
