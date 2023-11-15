import { gql } from "@apollo/client";

const GET_NEW_POSTS = gql`
  query GetNewPosts {
    contentEntities {
      id
      hash
    }
  }
`;

const GET_MY_POSTS = gql`
  query GetMyPosts($creator: String!) {
    contentEntities(where: { creator: $creator }) {
      hash
      startedPrice
    }
  }
`;

const GET_PURCHASED_POSTS = gql`
  query GetMyPosts($buyer: String!) {
    accessPurchasedEntities(where: { buyer: $buyer }) {
      hash
    }
  }
`;

export { GET_NEW_POSTS, GET_MY_POSTS, GET_PURCHASED_POSTS };
