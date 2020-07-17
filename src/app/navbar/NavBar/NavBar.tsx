import React from 'react'
import { NavLink } from 'react-router-dom'
import { Flex, Button } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { SmallScreenNav } from '../SmallScreenNav'
import { NavUserPanel } from '../NavUserPanel'
import { Container } from '../../../components/global'
import { useWindowWidth, useCurrentUser } from '../../../providers'
import { SearchBar } from '../SearchBar'
import { SiteTopBar } from '../SiteTopBar'

export const NavBar = () => {
  const currentUser = useCurrentUser()
  const width = useWindowWidth()

  if (width < 768) {
    return <SmallScreenNav />
  }

  return (
    <SiteTopBar>
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
          <StyledLink to="/create">Create</StyledLink>
          <StyledLink to="/search">Search</StyledLink>
        </StyledFlex>
        <SearchBar />
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
    </SiteTopBar>
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
