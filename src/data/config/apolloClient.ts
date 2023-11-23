import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_THE_GRAPH_URL,
  cache: new InMemoryCache(),
});
