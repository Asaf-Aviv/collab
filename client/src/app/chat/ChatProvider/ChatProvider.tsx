import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../reducers'

type Props = {
  children: React.ReactNode
}

export const ChatProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>
}
