import React from 'react'
import { Flex, Text, Avatar, AvatarProps, Box, BoxProps } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import { User } from '../../graphql/generates'
import { getAvatarUrl } from '../../utils'

type Props = BoxProps &
  Pick<User, 'id' | 'username'> & {
    avatar: string | null | undefined
    fontSize?: string
    size?: AvatarProps['size']
    className?: string
  }

export const AvatarWithUsername = ({
  id,
  username,
  avatar,
  fontSize = '1rem',
  size = 'md',
  ...props
}: Props) => (
  <Box
    as={Link}
    //@ts-ignore
    to={`/user/${id}`}
    display="block"
    {...props}
  >
    <Flex align="center">
      <Avatar size={size} src={getAvatarUrl(avatar)} name={username} mr={2} />
      <Text as="span" fontSize={fontSize} fontWeight={500}>
        {username}
      </Text>
    </Flex>
  </Box>
)
