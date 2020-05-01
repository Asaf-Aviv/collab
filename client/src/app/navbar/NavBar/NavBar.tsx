import React from 'react'
import { NavLink } from 'react-router-dom'
import { Flex, Button } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { SmallScreenNav } from '../SmallScreenNav'
import { NavUserPanel } from '../NavUserPanel'
import { useGetCurrentUserQuery } from '../../../graphql/generates'
import { Container } from '../../../components/global'
import { useWindowWidth } from '../../../components/WindowWidthProvider'

export const SiteHeader = ({ children }: { children: React.ReactNode }) => (
  <Flex
    as="header"
    align="center"
    height="4rem"
    background="#FFF"
    pos="fixed"
    width="100%"
    zIndex={100}
    boxShadow="0px 4px 5px 0 rgba(231, 216, 255, 0.38)"
  >
    {children}
  </Flex>
)

export const NavBar = () => {
  const { data } = useGetCurrentUserQuery()
  const width = useWindowWidth()
  const currentUser = data?.currentUser

  if (width < 786) {
    return (
      <SiteHeader>
        <SmallScreenNav />
      </SiteHeader>
    )
  }

  return (
    <SiteHeader>
      <Container
        height="100%"
        d="flex"
        m="0 auto"
        justifyContent="space-between"
        flex={1}
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
  font-weight: 600;
  letter-spacing: 1px;
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
