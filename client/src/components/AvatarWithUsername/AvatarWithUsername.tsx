import React from 'react'
import { Flex, Text, Avatar, AvatarProps, Box, BoxProps } from '@chakra-ui/core'
import { User } from '../../graphql/generates'
import { Link } from 'react-router-dom'

type Props = BoxProps &
  Pick<User, 'id' | 'username' | 'avatar'> & {
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
  ...props
}: Props) => (
  <Box
    as={Link}
    //@ts-ignore
    to={`/user/${id}`}
    {...props}
  >
    <Flex align="center">
      <Avatar size={size} src={avatar!} name={username} mr={2} />
      <Text as="span" fontSize={fontSize} fontWeight={500}>
        {username}
      </Text>
    </Flex>
  </Box>
)
