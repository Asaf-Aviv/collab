import React from 'react'
import { formatDate } from '../../utils'
import { Text, BoxProps } from '@chakra-ui/core'

type Props = BoxProps & {
  date: string
}

export const DisplayDate = ({ date, ...props }: Props) => (
  <Text as="time" fontSize="0.8rem" lineHeight={1.2} opacity={0.7} {...props}>
    {formatDate(date)}
  </Text>
)
