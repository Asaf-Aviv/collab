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

type Props = PseudoBoxProps & Pick<User, 'id' | 'avatar' | 'username' | 'bio'>

export const UserCard = ({ id, avatar, username, bio, ...props }: Props) => {
  return (
    <Paper flexDirection="column" bg="#2f1e50" flex={1} {...props}>
      <Flex p={4} direction="column" align="center" width="100%">
        <Avatar
          src={avatar ?? undefined}
          name={username}
          size="lg"
          mb={3}
          border="3px solid white"
        />
        <Stack spacing={2} textAlign="center">
          <Box>
            <Link to={`/users/${id}`} style={{ display: 'block' }}>
              <Heading color="white" as="h3" size="sm" letterSpacing={1}>
                {username}
              </Heading>
            </Link>
          </Box>
          <HeadingSubTitle as="span" color="#f49cff">
            Designer
          </HeadingSubTitle>
          <HeadingSubTitle as="span" color="white">
            Haifa, Israel
          </HeadingSubTitle>
        </Stack>
      </Flex>
      <Box p={4} flex={1} bg="white">
        {bio && (
          <Text color="#544a6b" fontSize="0.9rem">
            {bio}
          </Text>
        )}
      </Box>
    </Paper>
  )
}

const HeadingSubTitle = styled(Text)`
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1px;
`
