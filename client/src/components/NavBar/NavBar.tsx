import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <Header>
      <Nav>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/">Collab</StyledNavLink>
        <StyledNavLink to="/">Showcase</StyledNavLink>
      </Nav>
    </Header>
  )
}

const Header = styled.header`
  height: 64px;
  background: white;
  box-shadow: 0 1px 3px #a5a5a5;
`

const StyledNavLink = styled(NavLink)`
  padding: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  color: rgb(90, 117, 130);
  transition: color 250ms ease;
  &:hover {
    color: rgb(12, 52, 75);
  }
  &:active {
    color: rgb(12, 52, 75);
  }
`

const Nav = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  ${StyledNavLink} {
    margin-right: 1rem;
  }
`
