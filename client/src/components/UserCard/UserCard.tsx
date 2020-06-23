import React from 'react'
import {
  Flex,
  Heading,
  Avatar,
  Text,
  Box,
  Stack,
  PseudoBoxProps,
} from '@chakra-ui/core'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { User } from '../../graphql/generates'
import { Paper } from '../global'
import { getAvatarUrl } from '../../utils'

type Props = Omit<PseudoBoxProps, 'title'> &
  Pick<User, 'id' | 'avatar' | 'username' | 'bio' | 'title' | 'country'> & {
    dotsMenu?: React.ReactNode
  }

export const UserCard = ({
  id,
  avatar,
  username,
  bio,
  dotsMenu,
  title,
  country,
  ...props
}: Props) => {
  return (
    <Paper
      flexDirection="column"
      bg="#2f1e50"
      flex={1}
      position="relative"
      display="inline-block"
      {...props}
    >
      <Flex p={4} direction="column" align="center" width="100%">
        {dotsMenu && (
          <Box position="absolute" right={1} top={2}>
            {dotsMenu}
          </Box>
        )}
        <Avatar
          src={getAvatarUrl(avatar)}
          name={username}
          size="lg"
          mb={3}
          border="3px solid white"
        />
        <Stack spacing={2} textAlign="center">
          <Box>
            <Link to={`/user/${id}`} style={{ display: 'block' }}>
              <Heading color="white" as="h3" size="sm" letterSpacing={1}>
                {username}
              </Heading>
            </Link>
          </Box>
          <HeadingSubTitle as="span" color="#f49cff">
            {title}
          </HeadingSubTitle>
          <HeadingSubTitle as="span" color="white">
            {country}
          </HeadingSubTitle>
        </Stack>
      </Flex>
      <Box p={4} flex={1} bg="white">
        {bio && <Text color="#544a6b">{bio}</Text>}
        {!bio && <Text color="#544a6b">{username} has no bio</Text>}
      </Box>
    </Paper>
  )
}

const HeadingSubTitle = styled(Text)`
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1px;
`
