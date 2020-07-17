import React from 'react'
import { Box } from '@chakra-ui/core'

export const Badge = ({
  count,
  children,
}: {
  count: number
  children: React.ReactNode
}) => {
  if (count) {
    return (
      <Box as="div" position="relative">
        <Box
          as="span"
          width="28px"
          height="20px"
          borderRadius={5}
          bg="#954bff"
          color="white"
          fontSize="0.75rem"
          top={-14}
          right={-15}
          p={1}
          position="absolute"
          fontWeight={500}
          letterSpacing="1px"
          zIndex={1}
          lineHeight={1.2}
          textAlign="center"
        >
          {count}
        </Box>
        {children}
      </Box>
    )
  }

  return <>{children}</>
}
