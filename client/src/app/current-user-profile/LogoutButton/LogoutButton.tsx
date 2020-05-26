import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/core'
import { useApolloClient } from '@apollo/react-hooks'
import { wsClient } from '../../../apolloClient'
import { GetCurrentUserDocument } from '../../../graphql/generates'

type Props = Omit<ButtonProps, 'onClick' | 'children'> & {
  children: React.ReactNode
}

export const LogoutButton = ({ children, ...props }: Props) => {
  const client = useApolloClient()

  const logout = () => {
    localStorage.removeItem('token')

    client.writeQuery({
      query: GetCurrentUserDocument,
      data: {
        currentUser: null,
      },
    })

    wsClient.close()
    //@ts-ignore
    wsClient.connect()
  }

  return (
    <Button {...props} onClick={logout}>
      {children}
    </Button>
  )
}
