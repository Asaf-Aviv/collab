import React from 'react'
import {
  Flex,
  Heading,
  Avatar,
  Text,
  Box,
  Stack,
  PseudoBoxProps,
  Button,
} from '@chakra-ui/core'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import {
  User,
  useSendFriendRequestMutation,
  useRemoveFriendMutation,
} from '../../graphql/generates'
import { Paper } from '../global'
import { getAvatarUrl } from '../../utils'
import { DotsMenu } from '../DotsMenu/Index'
import { useToastNotification } from '../../app/notifications'

type Props = Omit<PseudoBoxProps, 'title'> &
  Omit<User, 'firstName' | 'lastName' | 'collabs'> & {
    showDotsMenu?: boolean
    dotsMenuItems?: React.ReactNode
    dotsMenuLabel?: string
  }

const dotsMenuIconStyles = { bg: 'inherit', color: 'white' }

export const UserCard = ({
  id,
  avatar,
  username,
  bio,
  title,
  country,
  dotsMenuItems,
  showDotsMenu = false,
  dotsMenuLabel = 'User Options',
  canRequestFriendship,
  isFriend,
  ...props
}: Props) => {
  const notify = useToastNotification()
  const [removeFriend] = useRemoveFriendMutation({
    variables: {
      friendId: id,
    },
    onCompleted() {
      notify('success', {
        message: `Successfully removed ${username}`,
      })
    },
    onError({ message }) {
      notify('error', {
        message,
      })
    },
  })
  const [sendFriendRequest] = useSendFriendRequestMutation({
    variables: {
      friendId: id,
    },
    onCompleted() {
      notify('success', {
        message: 'Friend request sent successfully',
      })
    },
    onError({ message }) {
      notify('error', {
        message,
      })
    },
  })

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
        {showDotsMenu && (
          <Box position="absolute" right={1} top={2}>
            <DotsMenu
              iconProps={{
                ariaLabel: dotsMenuLabel,
                color: '#c1c1c1',
                _hover: dotsMenuIconStyles,
                _focus: dotsMenuIconStyles,
                _active: dotsMenuIconStyles,
              }}
            >
              <Flex direction="column">
                {dotsMenuItems}
                {canRequestFriendship && (
                  <Button size="sm" onClick={() => sendFriendRequest()}>
                    Add Friend
                  </Button>
                )}
                {isFriend && (
                  <Button size="sm" onClick={() => removeFriend()}>
                    Remove Friend
                  </Button>
                )}
              </Flex>
            </DotsMenu>
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
