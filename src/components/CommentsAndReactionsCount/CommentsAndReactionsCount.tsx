import React from 'react'
import { Flex, Text, Icon, FlexProps } from '@chakra-ui/core'
import { Emoji } from 'emoji-mart'

type Props = FlexProps & {
  commentsCount: number
  reactionsCount: number
  emojiSize?: number
  commentIconSize?: string
}

export const CommentsAndReactionsCount = ({
  reactionsCount,
  commentsCount,
  emojiSize,
  commentIconSize,
  ...props
}: Props) => (
  <Flex {...props}>
    <Flex mr={3} align="center">
      <Emoji emoji="sunglasses" size={emojiSize || 24} set="twitter" />
      <Text fontWeight={600} ml="3px">
        {reactionsCount}
      </Text>
    </Flex>
    <Flex align="center">
      <Icon name="chat" size={commentIconSize || '18px'} />
      <Text fontWeight={600} ml="3px">
        {commentsCount}
      </Text>
    </Flex>
  </Flex>
)
