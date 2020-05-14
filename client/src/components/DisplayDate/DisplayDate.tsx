import React from 'react'
import { Text, BoxProps } from '@chakra-ui/core'
import { formatDistanceToNowStrict } from 'date-fns'

type Props = BoxProps & {
  date: string
}

export const DisplayDate = ({ date, ...props }: Props) => (
  <Text as="time" fontSize="0.8rem" lineHeight={1.4} opacity={0.7} {...props}>
    {date &&
      formatDistanceToNowStrict(+date || new Date(date), {
        addSuffix: true,
      })}
  </Text>
)
