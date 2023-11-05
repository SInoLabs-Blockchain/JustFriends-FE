// Define functions/classes that perform common or generic operations that are not tied to any specific part of the program
// Example: String manipulation functions, math libraries

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

const shortenAddress = (address: string) => {
  const prefix = '0x';
  const [, content] = address.split(prefix);

  return `${prefix}${content.substring(0, 7)}...${content.substring(
    content.length - 8,
    content.length - 1
  )}`;
};

const formatDate = (timestamp: number) => {
  const isoDate = new Date(timestamp * 1e3);
  const month = getMonthInText(isoDate.getMonth());
  const date = isoDate.getDate();
  const year = isoDate.getFullYear();
  return `${month} ${date} ${year}`;
};

export { shortenAddress, formatDate };
