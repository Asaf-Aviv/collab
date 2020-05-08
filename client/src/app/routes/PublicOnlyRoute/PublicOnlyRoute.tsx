import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useTokenValidation } from '../../../providers'
import { useCurrentUser } from '../../../hooks/useCurrentUser'

export const PublicOnlyRoute = ({ children, ...props }: RouteProps) => {
  const currentUser = useCurrentUser()
  const { hasBeenValidated } = useTokenValidation()

  return (
    <Route
      {...props}
      render={() => {
        if (!hasBeenValidated) return null

        return currentUser ? <Redirect to="/collabs/posts" /> : children
      }}
    />
  )
}
