import { gql } from "@apollo/client";

const GET_UPVOTES = gql`
  query GetPosts($timestamp_gte: String!) {
    votedEntities(where: { type: true, timestamp_gte: $timestamp_gte }) {
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

export { GET_UPVOTES, GET_MY_POSTS, GET_PURCHASED_POSTS };
