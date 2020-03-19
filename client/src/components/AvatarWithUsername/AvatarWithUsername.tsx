import React from 'react'
import { Flex, Text, Avatar, AvatarProps } from '@chakra-ui/core'
import { User } from '../../graphql/generates'
import { Link } from 'react-router-dom'

type Props = Omit<User, 'collabs' | '__typename'> & {
  size?: AvatarProps['size']
  className?: string
}

export const AvatarWithUsername = ({
  id,
  avatar,
  username,
  size = 'md',
}: Props) => (
  <Link to={`/user/${id}`}>
    <Flex align="center">
      <Avatar boxShadow="md" size={size} src={avatar!} name={username} mr={2} />
      <Text as="span" fontWeight={700}>
        {username}
      </Text>
    </Flex>
  </Link>
)
