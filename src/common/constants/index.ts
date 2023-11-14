// Generic constants can be used many places in the application
const BORDER_RADIUS = 16;

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

const FREE_POSTS = "free";
const PAID_POSTS = "paid";

const LOGIN_STEPS = {
  CREATE_WALLET: 1,
  CREATE_PASSWORD: 2,
};

export { BORDER_RADIUS, POST_OPTIONS, FREE_POSTS, PAID_POSTS, LOGIN_STEPS };
