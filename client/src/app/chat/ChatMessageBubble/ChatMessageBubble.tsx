import React from 'react'
import { PseudoBox, Flex, Avatar, Heading, Text } from '@chakra-ui/core'

export const ChatMessageBubble = ({ message, author, isAuthor }: any) => (
  <PseudoBox
    as="li"
    fontSize="0.875rem"
    lineHeight={1.3}
    color={isAuthor ? undefined : 'white'}
    bg={isAuthor ? 'purple.100' : '#9945ff'}
    p={2}
    borderRadius={6}
    boxShadow="0 1px 3px #b5b5b5"
    _notFirst={{ mt: 2 }}
    fontWeight={500}
  >
    <Flex align="center" mb={1}>
      <Avatar
        src={author.avatar ?? undefined}
        name={author.username}
        size="xs"
        mr={2}
      />
      <Heading as="h6" size="xs">
        {author.username}
      </Heading>
    </Flex>
    <Text pl={8} opacity={isAuthor ? 0.7 : 1} letterSpacing={0}>
      {message.content}
    </Text>
  </PseudoBox>
)
