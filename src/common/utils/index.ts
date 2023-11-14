// Define functions/classes that perform common or generic operations that are not tied to any specific part of the program
// Example: String manipulation functions, math libraries

import BigNumber from "bignumber.js";

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

export { shortenAddress, formatDate, formatBalance, randomNumber };
