import React from 'react'
import { User } from '../../graphql/generates'
import {
  Flex,
  Heading,
  Avatar,
  Text,
  Box,
  Stack,
  Divider,
  FlexProps,
} from '@chakra-ui/core'
import { Paper } from '../global'
import styled from '@emotion/styled'

type Props = FlexProps & Pick<User, 'id' | 'avatar' | 'username' | 'bio'>

export const UserCard = ({ id, avatar, username, bio, ...props }: Props) => {
  return (
    <Paper direction="column" bg="#2f1e50" flex={1} {...props}>
      <Flex p={4} direction="column" align="center" width="100%">
        <Avatar
          src={avatar ?? undefined}
          name={username}
          size="lg"
          mb={3}
          border="3px solid white"
        />
        <Stack spacing={1} textAlign="center">
          <Heading color="white" as="h3" size="sm" letterSpacing={1}>
            {username}
          </Heading>
          <HeadingSubTitle as="span" color="#f49cff">
            Designer
          </HeadingSubTitle>
          <HeadingSubTitle as="span" color="white">
            Haifa, Israel
          </HeadingSubTitle>
        </Stack>
      </Flex>
      <Box py={8} px={4} flex={1} bg="white">
        {bio && (
          <Text color="#544a6b" fontSize="0.9rem">
            {bio}
          </Text>
        )}
      </Box>
      <Flex p={2}>
        <CardStatsItem>
          <Text as="span">Collabs</Text>
          <Text as="span">13</Text>
        </CardStatsItem>
        <Divider orientation="vertical" />
        <CardStatsItem>
          <Text as="span">Emojis</Text>
          <Text as="span">99</Text>
        </CardStatsItem>
        <Divider orientation="vertical" />
        <CardStatsItem>
          <Text as="span">Friends</Text>
          <Text as="span">199</Text>
        </CardStatsItem>
      </Flex>
    </Paper>
  )
}

const HeadingSubTitle = styled(Text)`
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1px;
`

const CardStatsItem = styled(Flex)`
  align-items: center;
  flex-direction: column;
  font-size: 0.9rem;
  font-weight: 700;
  flex: 1;
  color: white;
`
