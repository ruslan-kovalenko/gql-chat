import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { API_URL, API_WS } from '../constants';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { store } from '../store';
import { setContext } from 'apollo-link-context';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

const getToken = () => store.getState().auth.token;

const httpLink = new HttpLink({
  uri: API_URL,
});
const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  };
});
export const wsLink = new WebSocketLink({
  uri: API_WS,
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: getToken(), // todo: use same approach as in authLink to pass token
    }),
  },
});

const link = authLink.concat(
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  )
);

let apiClient;

export const initApiClient = async () => {
  // ? retrieve all types to handle union types correctly, because of an cache issue with unions
  let data;
  if (process.env.NODE_ENV === 'production') {
    data = (await import('./schema.json')).data;
  } else {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variables: {},
        query: `
          {
            __schema {
              types {
                kind
                name
                possibleTypes {
                  name
                }
              }
            }
          }
        `,
      }),
    });
    data = (await res.json()).data;
  }

  data.__schema.types = data.__schema.types.filter(type => type.possibleTypes !== null);
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: data,
  });

  apiClient = new ApolloClient({
    link,
    cache: new InMemoryCache({ fragmentMatcher }),
  });
};

export const getApiClient = () => apiClient;
