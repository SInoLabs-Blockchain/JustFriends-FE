// Define functions/classes that perform common or generic operations that are not tied to any specific part of the program
// Example: String manipulation functions, math libraries

import BigNumber from "bignumber.js";
import { Post } from "src/domain/models/home/Post";

const getMonthInText = (month: number) => {
  switch (month) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return null;
  }
};

const shortenAddress = (address: string | null) => {
  if (!address) return "";
  const prefix = "0x";
  const [, content] = address.split(prefix);

  return `${prefix}${content.substring(0, 7)}...${content.substring(
    content.length - 7,
    content.length
  )}`;
};

const formatDate = (timestamp: number) => {
  const isoDate = new Date(timestamp * 1e3);
  const month = getMonthInText(isoDate.getMonth());
  const date = isoDate.getDate();
  const year = isoDate.getFullYear();
  return `${month} ${date} ${year}`;
};

const formatBalance = (balance: string) => {
  if (!balance) return "0";
  return new BigNumber(balance).toFixed(6);
};

const randomNumber = () => {
  // Define the range
  const min = new BigNumber(10000000);
  const max = new BigNumber(99999999999999);

  // Generate a random value between 0 and 1
  const randomValue = Math.random();

  // Scale the random value to the desired range
  const scaledValue = min.plus(max.minus(min).times(randomValue));

  // Convert the scaled value to a BigNumber
  return scaledValue.integerValue(BigNumber.ROUND_FLOOR).toString();
};

const timeAgo = (input: any) => {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = [
    ["years", 3600 * 24 * 365],
    ["months", 3600 * 24 * 30],
    ["weeks", 3600 * 24 * 7],
    ["days", 3600 * 24],
    ["hours", 3600],
    ["minutes", 60],
    ["seconds", 1],
  ] as const;
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  for (const [rangeType, rangeVal] of ranges) {
    if (rangeVal < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / rangeVal;
      return formatter.format(Math.round(delta), rangeType);
    }
  }
};

const orderByTimeCreated = (posts: Array<Post>) => {
  if (posts.length === 0) return [];

  return posts.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    // @ts-ignore
    return dateB - dateA;
  });
};

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name?: string) => {
  console.log('name', name);

  if (!name) name = "default-name-1";
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name.includes('-')
      ? `${name.split("-")[0][0].toUpperCase()}${name
        .split("-")[1][0]
        .toUpperCase()}`
      : name.substring(0, 1).toUpperCase(),
  };
};

export {
  shortenAddress,
  formatDate,
  formatBalance,
  randomNumber,
  timeAgo,
  orderByTimeCreated,
  stringAvatar,
};
