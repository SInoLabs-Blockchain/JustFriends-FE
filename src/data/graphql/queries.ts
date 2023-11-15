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
    }
  }
`;

const GET_PURCHASED_POSTS = gql`
  query GetPurchasedPosts($account: String!) {
    userPostEntities(where: { account: $account }) {
      content
    }
  }
`;

const GET_FREE_POSTS = gql`
  query GetFreePosts($creator: String!) {
    contentEntities(where: { creator: $creator, isPaid: false }) {
      hash
    }
  }
`;

const GET_PAID_POSTS = gql`
  query GetPaidPosts($creator: String!, $account: String!) {
    contentEntities(where: { creator: $creator, isPaid: true }) {
      hash
    }
    userPostEntities(where: { account: $account }) {
      content
    }
  }
`;

export {
  GET_UPVOTES,
  GET_MY_POSTS,
  GET_PURCHASED_POSTS,
  GET_FREE_POSTS,
  GET_PAID_POSTS,
};
