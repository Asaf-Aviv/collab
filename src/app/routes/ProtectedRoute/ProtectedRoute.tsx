import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useTokenValidation, useCurrentUser } from '../../../providers'

export const ProtectedRoute = ({ children, ...props }: RouteProps) => {
  const currentUser = useCurrentUser()
  const { hasBeenValidated } = useTokenValidation()

  return (
    <Route
      {...props}
      render={() => {
        if (!hasBeenValidated) return null

        return currentUser ? children : <Redirect to="/login" />
      }}
    />
  )
}
