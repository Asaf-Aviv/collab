import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import ReactGA from 'react-ga'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app/App'
import { ApolloProvider } from '@apollo/react-hooks'
import * as serviceWorker from './serviceWorker'
import { apolloClient } from './apolloClient'
import { AppProviders } from './providers'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY,
  })
}
ReactGA.initialize(process.env.REACT_APP_GA!)

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
