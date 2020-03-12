import React from 'react'
import { Text } from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'
import { User } from '../../graphql/generates'

type Props = {
  id: string
  content: string
  author: Omit<User, 'collabs'>
}

export const Comment = ({ /* id ,*/ content, author }: Props) => (
  <article>
    <AvatarWithUsername {...author} />
    <Text mt={2}>{content}</Text>
  </article>
)
