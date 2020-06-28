import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/core'
import { Container } from '../../../components/global'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

export const Footer = () => {
  return (
    <Box as="footer" bg="#1c0b2f">
      <Container py={6} m="0 auto">
        <Flex>
          <StyledFlex>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/collabs">Collabs</StyledLink>
            <StyledLink to="/showcase">Showcase</StyledLink>
            <StyledLink to="/create">Create</StyledLink>
            <StyledLink to="/search">Search</StyledLink>
          </StyledFlex>
          <StyledFlex>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/signup">Signup</StyledLink>
          </StyledFlex>
          <StyledFlex>
            <StyledLink to="/faq">Faq</StyledLink>
            <StyledLink to="/help">Help</StyledLink>
            <StyledLink to="/suggestions">Suggestions</StyledLink>
            {/* <StyledLink
              //@ts-ignore
              as="a"
              href="mailto:"
            >
              Contact
            </StyledLink> */}
          </StyledFlex>
        </Flex>
      </Container>
      <Box bg="#19021d">
        <Text
          lineHeight={1.5}
          py={4}
          textAlign="center"
          color="#848484"
          fontSize="sm"
        >
          copyright © 2020 Asaf Aviv and the Collab contributors
        </Text>
      </Box>
    </Box>
  )
}

const StyledFlex = styled(Flex)`
  color: #b5b5b5;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`

const StyledLink = styled(Link)`
  transition: color 200ms;
  padding: 0.25rem;
  margin-bottom: 0.25rem;
  :hover {
    color: #fff;
  }
`
