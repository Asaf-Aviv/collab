import React, {
  createContext,
  useEffect,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import {
  GetCurrentUserQuery,
  useGetCurrentUserLazyQuery,
  GetCurrentUserDocument,
} from '../../graphql/generates'
import { wsClient } from '../../apolloClient'
import { useTokenValidation } from '..'
import { CurrentUserSubscriptionsManager } from '../../app/current-user-subscriptions'

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
  const { setHasBeenValidated } = useTokenValidation()
  const calledOnMount = useRef(false)
  const [getCurrentUser, { data }] = useGetCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted() {
      // skip reinitializing when validating local storage token
      if (calledOnMount.current) {
        calledOnMount.current = false
        setHasBeenValidated(true)
        return
      }

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
      return
    }
    setHasBeenValidated(true)
  }, [getCurrentUser, setHasBeenValidated])

  return (
    <CurrentUserManagerContext.Provider
      value={{
        user: data?.currentUser ?? null,
        getCurrentUser,
        logout,
      }}
    >
      <CurrentUserSubscriptionsManager>
        {children}
      </CurrentUserSubscriptionsManager>
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
