import React from 'react'
import { Box, Spinner } from '@chakra-ui/core'

export const Loader = () => {
  return (
    <Box p={4}>
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
