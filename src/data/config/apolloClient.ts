import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://d003-118-70-67-134.ngrok-free.app/subgraphs/name/example",
  cache: new InMemoryCache(),
});
