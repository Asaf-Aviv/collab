import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../reducers'
import { Chat } from '../Chat'
import { useCurrentUser, useWindowWidth } from '../../../providers'

export const ChatProvider = () => {
  const currentUser = useCurrentUser()
  const windowWidth = useWindowWidth()

  if (!currentUser || windowWidth < 768) return null

  return (
    <Provider store={store}>
      <Chat />
    </Provider>
  )
}
