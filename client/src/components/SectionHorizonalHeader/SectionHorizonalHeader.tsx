import React from 'react'
import { Box, BoxProps, Divider, Heading, Text } from '@chakra-ui/core'

type Props = BoxProps & {
  title: string
  titleTag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const SectionHorizonalHeader = ({
  title,
  titleTag = 'h3',
  ...props
}: Props) => (
  <Box as="header" width="100%" {...props}>
    <Text
      as="span"
      display="inline-block"
      borderBottom="2px solid #964cff"
      mb="-2px"
      position="relative"
    >
      <Heading as={titleTag} mb={2} size="sm" mr={2}>
        {title}
      </Heading>
    </Text>
    <Divider mt={0} mb={6} borderColor="#dcdcdc" />
  </Box>
)
