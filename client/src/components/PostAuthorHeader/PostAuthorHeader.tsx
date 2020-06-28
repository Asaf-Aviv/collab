import React from 'react'
import { User } from '../../graphql/generates'
import { DisplayDate } from '../DisplayDate/DisplayDate'
import { FlexProps, Flex } from '@chakra-ui/core'
import { AvatarWithUsername } from '../AvatarWithUsername/AvatarWithUsername'

type Props = FlexProps & {
  author: Pick<User, 'id' | 'avatar' | 'username'>
  date: string
}

export const PostAuthorHeader = ({ date, author, ...props }: Props) => {
  return (
    <Flex align="center" {...props}>
      <AvatarWithUsername {...author} />
      <DisplayDate date={date} ml={2} />
    </Flex>
  )
}
