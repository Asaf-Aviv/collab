import React from 'react'
import { Flex, Text, Icon, FlexProps } from '@chakra-ui/core'
import { Emoji } from 'emoji-mart'

type Props = FlexProps & {
  commentsCount: number
  reactionsCount: number
}

export const CommentsAndReactionsCount = ({
  reactionsCount,
  commentsCount,
  ...props
}: Props) => (
  <Flex {...props}>
    <Flex mr={3} align="center">
      <Emoji emoji="sunglasses" size={24} />
      <Text fontWeight={700} ml="3px">
        {reactionsCount}
      </Text>
    </Flex>
    <Flex align="center">
      <Icon name="chat" size="18px" />
      <Text fontWeight={700} ml="3px">
        {commentsCount}
      </Text>
    </Flex>
  </Flex>
)
