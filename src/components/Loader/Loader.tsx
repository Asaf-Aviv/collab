import React from 'react'
import { Box, Spinner } from '@chakra-ui/core'
import { keyframes } from '@emotion/core'

export const Loader = () => {
  return (
    <Box p={4} opacity={0} animation={`${fadeIn} 250ms ease-in 200ms forwards`}>
      <Spinner
        thickness="3px"
        speed="0.75s"
        emptyColor="gray.200"
        color="purple.500"
        size="md"
        display="block"
        m="0 auto"
      />
    </Box>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
