import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "http://127.0.0.1:8000/subgraphs/name/example",
  cache: new InMemoryCache(),
});
