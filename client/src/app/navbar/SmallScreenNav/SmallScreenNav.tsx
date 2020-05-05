import React, { useReducer } from 'react'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import PostAddIcon from '@material-ui/icons/PostAdd'
import { Flex, Divider, Button, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApolloClient } from '@apollo/react-hooks'
import { Container } from '../../../components/global'
import { NavUserPanel } from '../NavUserPanel'
import { SiteHeader } from '../NavBar'

export const SmallScreenNav = () => {
  const [isOpen, toggleIsOpen] = useReducer(prevState => !prevState, false)
  const currentUser = useCurrentUser()
  const client = useApolloClient()

  const logout = () => {
    localStorage.removeItem('token')
    client.resetStore()
  }

  return (
    <>
      <SiteHeader>
        <Container
          height="100%"
          flex={1}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            aria-label="navigation menu"
            onClick={() => toggleIsOpen()}
          >
            {isOpen ? (
              <MenuOpenRoundedIcon width={32} height={32} />
            ) : (
              <MenuRoundedIcon width={32} height={32} />
            )}
          </IconButton>
          <NavUserPanel />
        </Container>
      </SiteHeader>
      <AnimatePresence>
        {isOpen && (
          <StyledMotion
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: '-100%', opacity: 0.3 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleIsOpen()}
          >
            <Flex as="nav" direction="column" bg="white" zIndex={3}>
              <StyledLink exact to="/">
                <HomeOutlinedIcon />
                Home
                <ArrowForwardIosIcon />
              </StyledLink>
              <StyledLink exact to="/collabs/posts">
                <HomeOutlinedIcon />
                Collabs
                <ArrowForwardIosIcon />
              </StyledLink>
              <StyledLink exact to="/showcase">
                <HomeOutlinedIcon />
                Showcase
                <ArrowForwardIosIcon />
              </StyledLink>
              <StyledLink to="/create">
                <PostAddIcon />
                Create
                <ArrowForwardIosIcon />
              </StyledLink>
              <StyledLink to="/search">
                <SearchRoundedIcon />
                Search
                <ArrowForwardIosIcon />
              </StyledLink>
              <Divider />
              {currentUser ? (
                <StyledLink to="/profile">
                  <AccountBoxOutlinedIcon />
                  Profile
                  <ArrowForwardIosIcon />
                </StyledLink>
              ) : (
                <>
                  <StyledLink to="/login">
                    <PostAddIcon />
                    Log in
                    <ArrowForwardIosIcon />
                  </StyledLink>
                  <StyledLink to="/signup">
                    <PostAddIcon />
                    Sign up
                    <ArrowForwardIosIcon />
                  </StyledLink>
                </>
              )}
              <Divider />
              {currentUser && (
                <Button
                  bg="white"
                  height="48px"
                  justifyContent="flex-start"
                  fontWeight={500}
                  onClick={() => logout()}
                  _hover={{
                    backgroundColor: '#f2e5ff',
                  }}
                >
                  <ExitToAppOutlinedIcon />
                  <Text ml="0.5rem" as="span">
                    Sign Out
                  </Text>
                </Button>
              )}
            </Flex>
          </StyledMotion>
        )}
      </AnimatePresence>
    </>
  )
}

const StyledMotion = styled(motion.div)`
  position: fixed;
  top: 64px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    height: 24px;
    width: 24px;
  }
`

const StyledLink = styled(NavLink)`
  height: 48px;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  font-weight: 500;
  svg:first-of-type {
    margin-right: 0.5rem;
  }
  svg:last-of-type {
    transition: transform 200ms;
    margin-left: auto;
  }
  &:hover:not(.active) {
    background-color: #f2e5ff;
    svg:last-of-type {
      transform: translateX(0.5rem);
    }
  }
  &.active {
    border-left: 3px solid #964cff;
    color: #964cff;
    padding-left: 1.5rem;
    svg:first-of-type {
      color: #964cff;
    }
    svg:last-of-type {
      display: none;
    }
  }
`
