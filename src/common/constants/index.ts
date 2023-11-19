// Generic constants can be used many places in the application
const POST_OPTIONS = [
  {
    id: 1,
    title: "Post for free",
    value: "free",
  },
  {
    id: 0,
    title: "Post for paid-zone",
    value: "paid",
  },
];

const LOGIN_STEPS = {
  CREATE_WALLET: 1,
  CREATE_PASSWORD: 2,
};

const FREE_POSTS = "free";
const PAID_POSTS = "paid";

const VOTE_TYPES = {
  DOWNVOTE: 1,
  UPVOTE: 2,
};

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export {
  POST_OPTIONS,
  FREE_POSTS,
  PAID_POSTS,
  LOGIN_STEPS,
  VOTE_TYPES,
  ZERO_ADDRESS,
};
