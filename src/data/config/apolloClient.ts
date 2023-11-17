import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "http://192.168.10.134:8000/subgraphs/name/example",
  cache: new InMemoryCache(),
});
