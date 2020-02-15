import React, { useEffect } from 'react'
import { Link, Box, Flex } from '@chakra-ui/core'

export const NavBar = () => {
  return (
    <Flex as="header" background="gray50">
      <Flex as="nav">
        <Link>Collab</Link>
        <Link>Showcase</Link>
      </Flex>
    </Flex>
  )
}
