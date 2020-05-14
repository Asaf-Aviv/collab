import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Flex,
  Button,
  Input,
  Box,
  InputRightElement,
  InputGroup,
  Icon,
} from '@chakra-ui/core'
import styled from '@emotion/styled'
import { SmallScreenNav } from '../SmallScreenNav'
import { NavUserPanel } from '../NavUserPanel'
import { useGetCurrentUserQuery } from '../../../graphql/generates'
import { Container } from '../../../components/global'
import { useWindowWidth } from '../../../providers'

export const NavSearchBar = () => {
  return (
    <Box maxWidth={500} flex={1}>
      <InputGroup>
        <Input
          bg="#f2f2ff"
          placeholder="Search Collabs"
          borderColor="transparent"
          _hover={{ borderColor: '#cab3ff' }}
          _focus={{ borderColor: '#805ad5' }}
          borderWidth={2}
        />
        <InputRightElement>
          <Icon name="search" color="gray.500" />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

export const SiteHeader = ({ children }: { children: React.ReactNode }) => (
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

export const NavBar = () => {
  const { data } = useGetCurrentUserQuery()
  const width = useWindowWidth()
  const currentUser = data?.currentUser

  if (width < 768) {
    return <SmallScreenNav />
  }

  return (
    <SiteHeader>
      <Container
        height="100%"
        d="flex"
        m="0 auto"
        justifyContent="space-between"
        flex={1}
        alignItems="center"
      >
        <StyledFlex as="nav">
          <StyledLink exact to="/">
            Home
          </StyledLink>
          <StyledLink exact to="/collabs/posts">
            Collabs
          </StyledLink>
          <StyledLink exact to="/showcase">
            Showcase
          </StyledLink>
          <StyledLink to="/create">Create</StyledLink>
          <StyledLink to="/search">Search</StyledLink>
        </StyledFlex>
        <NavSearchBar />
        {currentUser ? (
          <NavUserPanel />
        ) : (
          <StyledFlex>
            <Button
              as={NavLink as any}
              //@ts-ignore
              to="/login"
              size="md"
              variant="outline"
              variantColor="purple"
              mr={4}
            >
              Login
            </Button>
            <Button
              as={NavLink as any}
              //@ts-ignore
              to="/signup"
              size="md"
              variantColor="purple"
            >
              Signup
            </Button>
          </StyledFlex>
        )}
      </Container>
    </SiteHeader>
  )
}

const StyledFlex = styled(Flex)`
  display: flex;
  align-items: center;
  font-weight: 300;
`

const StyledLink = styled(NavLink)`
  transition: color 250ms;

  &:hover,
  &.active {
    color: #964cff;
  }

  & + & {
    margin-left: 1rem;
  }
`
