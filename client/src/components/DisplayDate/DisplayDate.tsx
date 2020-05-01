import React from 'react'
import { Text, BoxProps } from '@chakra-ui/core'
import { formatDistanceToNowStrict } from 'date-fns'

type Props = BoxProps & {
  date: string
}

export const DisplayDate = ({ date, ...props }: Props) => (
  <Text as="time" fontSize="0.8rem" lineHeight={1.1} opacity={0.7} {...props}>
    {formatDistanceToNowStrict(Number(date), {
      addSuffix: true,
    })}
  </Text>
)
