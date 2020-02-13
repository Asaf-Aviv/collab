import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'
import * as serviceWorker from './serviceWorker'
import apolloClient from './apolloClient'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
