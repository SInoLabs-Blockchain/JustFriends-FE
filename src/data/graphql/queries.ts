import { gql } from "@apollo/client";

const GET_NEW_POSTS = gql`
  query GetNewPosts($address: String!, $isPaid: Boolean!) {
    contentEntities(first: 50, orderBy: timestamp, orderDirection: desc, where: { isPaid: $isPaid }) {
      id
      hash
      totalUpvote
      totalDownvote
      totalSupply
      startedPrice
      isPaid
      creator
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
      price
    }
    creatorEntities(orderBy: creditScore, orderDirection: desc) {
      address
      creditScore
    }
  }
`;

const GET_MY_PROFILE = gql`
  query GetMyProfile($address: String!) {
    creatorEntities(where: { address: $address }) {
      address
      creditScore
      totalDownVote
      totalUpVote
    }
    userPostEntities(where: { account: $address, isOwner: true }) {
      id
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
      price
    }
  }
`;

const GET_FREE_POSTS = gql`
  query GetFreePosts($creator: String!, $address: String!) {
    contentEntities(where: { creator: $creator, isPaid: false }) {
      hash
    }
    postVoteEntities(where: { account: $address }) {
      post
      type
      account
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
      price
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

const GET_POST_DETAIL_DATA = gql`
  query GetPostDetailData($contentHash: String!, $address: String!) {
    creatorEntities(orderBy: creditScore, orderDirection: desc) {
      address
      creditScore
    }
    contentEntities(where: { hash: $contentHash }) {
      id
      hash
      totalUpvote
      totalDownvote
      totalSupply
      startedPrice
    }
    userPostEntities(where: { account: $address, post: $contentHash }) {
      account
      isOwner
      post
      price
    }
  }
`;

const GET_VOTES = gql`
  query GetVotes($timestamp: String!) {
    votedEntities(first: 50, where: { timestamp_gte: $timestamp }) {
      timestamp
      hash
    }
  }
`;

const GET_PURCHASES = gql`
  query GetPurchases($timestamp: String!) {
    accessPurchasedEntities(first: 50, where: { timestamp_gte: $timestamp }) {
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
  GET_POST_DETAIL_DATA,
  GET_VOTES,
  GET_PURCHASES,
  GET_MY_PROFILE,
};
