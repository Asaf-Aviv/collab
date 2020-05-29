import React, {
  createContext,
  useEffect,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from 'react'
import {
  GetCurrentUserQuery,
  useGetCurrentUserLazyQuery,
  GetCurrentUserDocument,
} from '../../graphql/generates'
import { wsClient } from '../../apolloClient'
import { useApolloClient } from '@apollo/react-hooks'

type CurrentUserManagerContext = {
  user: GetCurrentUserQuery['currentUser']
  getCurrentUser: () => void
  logout: () => void
}

const CurrentUserManagerContext = createContext<CurrentUserManagerContext>({
  user: null,
  getCurrentUser() {},
  logout() {},
})

type Props = {
  children: React.ReactNode
}

export const CurrentUserManager = ({ children }: Props) => {
  const client = useApolloClient()
  const calledOnMount = useRef(false)
  const [getCurrentUser, { data }] = useGetCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted() {
      if (calledOnMount.current) return

      wsClient.close()
      //@ts-ignore
      wsClient.connect()
    },
  })

  const logout = useCallback(() => {
    localStorage.removeItem('token')

    client.writeQuery({
      query: GetCurrentUserDocument,
      data: {
        currentUser: null,
      },
    })

    wsClient.close()
    // @ts-ignore
    wsClient.connect()
  }, [client])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getCurrentUser()
      calledOnMount.current = true
    }
  }, [getCurrentUser])

  return (
    <CurrentUserManagerContext.Provider
      value={{
        user: data?.currentUser,
        getCurrentUser,
        logout,
      }}
    >
      {children}
    </CurrentUserManagerContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserManagerContext).user

export const useAuthActions = () => {
  const { getCurrentUser, logout } = useContext(CurrentUserManagerContext)

  return useMemo(
    () => ({
      getCurrentUser,
      logout,
    }),
    [getCurrentUser, logout],
  )
}
