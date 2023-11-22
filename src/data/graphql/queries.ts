import { gql } from "@apollo/client";

const GET_NEW_POSTS = gql`
  query GetNewPosts($address: String!, $isPaid: Boolean!) {
    contentEntities(where: { isPaid: $isPaid }) {
      id
      hash
      totalUpvote
      totalDownvote
      totalSupply
      startedPrice
    }
    postVoteEntities(where: { account: $address }) {
      post
      type
      account
    }
    userPostEntities(where: { account: $address }) {
      account
      isOwner
      post
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
    userPostEntities(where: { isOwner: false, account: $account }) {
      post
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
      post
    }
  }
`;

const GET_CREDIT_SCORE = gql`
  query GetCreditScore($address: String!) {
    creatorEntities(where: { address: $address }) {
      creditScore
    }
  }
`;

const GET_VOTES = gql`
  query GetVotes($timestamp: String!) {
    votedEntities(where: { timestamp_gte: $timestamp }) {
      timestamp
      hash
    }
  }
`;

export {
  GET_NEW_POSTS,
  GET_MY_POSTS,
  GET_PURCHASED_POSTS,
  GET_FREE_POSTS,
  GET_PAID_POSTS,
  GET_CREDIT_SCORE,
  GET_VOTES,
};
