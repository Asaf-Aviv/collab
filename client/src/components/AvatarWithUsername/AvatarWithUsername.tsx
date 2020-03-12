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
  className,
}: Props) => (
  <Link to={`/user/${id}`}>
    <Flex align="center" className={className}>
      <Avatar boxShadow="md" size={size} src={avatar!} name={username} mr={2} />
      <Text fontWeight={600}>{username}</Text>
    </Flex>
  </Link>
)
