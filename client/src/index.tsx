import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app/App'
import { ApolloProvider } from '@apollo/react-hooks'
import * as serviceWorker from './serviceWorker'
import { apolloClient } from './apolloClient'
import { WindowWidthProvider } from './components/WindowWidthProvider'
import { TokenValidatonProvider } from './components/TokenValidatonProvider/TokenValidatonProvider'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <WindowWidthProvider>
        <TokenValidatonProvider>
          <App />
        </TokenValidatonProvider>
      </WindowWidthProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
