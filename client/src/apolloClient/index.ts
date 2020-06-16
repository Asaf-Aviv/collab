import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { createUploadLink } from 'apollo-upload-client'

const endpoint = process.env.REACT_APP_GRAPHQL_URI!
const subscriptionEndpoint = process.env.REACT_APP_GRAPHQL_SUBSCRIPTION_URI!

const getToken = () => {
  const token = localStorage.getItem('token')
  return token ? `Bearer ${token}` : ''
}

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: getToken(),
  },
}))

export const wsClient = new SubscriptionClient(subscriptionEndpoint!, {
  reconnect: true,
  lazy: true,
  connectionParams: () => ({
    Authorization: getToken(),
  }),
})

// upload link replace the normal http link
const uploadLink = createUploadLink({
  uri: endpoint,
})

const wsLink = new WebSocketLink(wsClient)

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any
    // split based on operation type
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  // order matters ws before http.
  wsLink,
  uploadLink,
)

// order matters, httpLink needs to read headers from auth
const link = ApolloLink.from([authLink, terminatingLink])

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link,
  cache,
})
