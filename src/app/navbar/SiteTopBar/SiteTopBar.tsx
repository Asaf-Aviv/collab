import React from 'react'
import { Flex } from '@chakra-ui/core'

export const SiteTopBar = ({ children }: { children: React.ReactNode }) => (
  <Flex
    as="header"
    align="center"
    height="4rem"
    background="#FFF"
    pos="fixed"
    width="100%"
    zIndex={100}
    boxShadow="0px 4px 5px 0 rgba(210, 210, 210, 0.38)"
  >
    {children}
  </Flex>
)
