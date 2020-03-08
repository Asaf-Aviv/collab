import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App'
import { ApolloProvider } from '@apollo/react-hooks'
import * as serviceWorker from './serviceWorker'
import { apolloClient } from './apolloClient'
import { ThemeProvider } from 'styled-components'
import 'normalize.css'
import './index.css'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <ThemeProvider theme={{}}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
