import { gql } from "@apollo/client";

const GET_UPVOTES = gql`
  query GetPosts($timestamp_gte: String!) {
    votedEntities(where: { type: true, timestamp_gte: $timestamp_gte }) {
      id
      hash
    }
  }
`;

export { GET_UPVOTES };
