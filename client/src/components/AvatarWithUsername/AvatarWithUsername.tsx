import React from 'react'
import { Flex, Text, Avatar, AvatarProps } from '@chakra-ui/core'
import { User } from '../../graphql/generates'
import { Link } from 'react-router-dom'

type Props = Pick<User, 'id' | 'username' | 'avatar'> & {
  fontSize?: string
  size?: AvatarProps['size']
  className?: string
}

export const AvatarWithUsername = ({
  id,
  avatar,
  username,
  fontSize = '1rem',
  size = 'md',
}: Props) => (
  <Link to={`/user/${id}`}>
    <Flex align="center">
      <Avatar size={size} src={avatar!} name={username} mr={2} />
      <Text as="span" fontSize={fontSize} fontWeight={500}>
        {username}
      </Text>
    </Flex>
  </Link>
)
