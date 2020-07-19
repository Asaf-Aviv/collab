import React, { useState } from 'react'
import { useRouteMatch, NavLink } from 'react-router-dom'
import {
  Box,
  Heading,
  Flex,
  Text,
  Avatar,
  PseudoBox,
  Button,
} from '@chakra-ui/core'
import { useCurrentUserConversationsPreviewQuery } from '../../../graphql/generates'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { SendMessageModal } from '../SendMessageModal'
import { useWindowWidth } from '../../../providers'
import { getAvatarUrl } from '../../../utils'
import { SEO } from '../../../components/SEO'

export const Conversations = () => {
  const {
    data,
    loading,
    error,
    refetch,
  } = useCurrentUserConversationsPreviewQuery()
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false)
  const match = useRouteMatch()
  const width = useWindowWidth()

  const { conversationsPreview } = data?.currentUser || {}

  return (
    <>
      <SEO title="My Conversations" url={window.location.href} />
      <Box as="main" flex={1} pb={4}>
        <Flex align="center" as="header" justify="space-between" mb={4}>
          <Heading as="h1" size="md" fontWeight={500}>
            Your Conversations
          </Heading>
          <Button
            size={width >= 480 ? 'md' : 'sm'}
            variantColor="purple"
            onClick={() => setIsSendMessageModalOpen(true)}
          >
            Send Message
          </Button>
          {isSendMessageModalOpen && (
            <SendMessageModal
              closeModal={() => setIsSendMessageModalOpen(false)}
            />
          )}
        </Flex>
        <section>
          {conversationsPreview?.map(
            ({ userId, username, avatar, content }) => (
              <PseudoBox
                key={userId}
                as={NavLink}
                // @ts-ignore
                to={`${match.url}/${userId}`}
                py={4}
                px={2}
                _notFirst={{
                  borderTop: '1px solid #e1e1e1',
                }}
                display="block"
                _hover={{
                  bg: '#EEE',
                }}
                _focus={{
                  bg: '#EEE',
                }}
              >
                {username ? (
                  <Flex align="center" mb={4}>
                    <Avatar
                      src={getAvatarUrl(avatar)}
                      name={username}
                      size="sm"
                      mr={2}
                    />
                    <Text as="h3" fontWeight={500}>
                      {username}
                    </Text>
                  </Flex>
                ) : (
                  <Text as="span">Deleted user</Text>
                )}
                <Text pl={10}>{content}</Text>
              </PseudoBox>
            ),
          )}
          {loading && <Loader />}
          {error && (
            <DisplayError
              message="Could not fetch friends"
              onClick={() => refetch()}
            />
          )}
        </section>
      </Box>
    </>
  )
}
