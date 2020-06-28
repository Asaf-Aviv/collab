import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/core'
import { useAuthActions } from '../../../providers'

type Props = Omit<ButtonProps, 'onClick' | 'children'> & {
  children: React.ReactNode
}

export const LogoutButton = ({ children, ...props }: Props) => (
  <Button {...props} onClick={useAuthActions().logout}>
    {children}
  </Button>
)
