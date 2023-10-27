// Define functions/classes that perform common or generic operations that are not tied to any specific part of the program
// Example: String manipulation functions, math libraries

const shortenAddress = (address: string) => {
  const prefix = "0x";
  const [, content] = address.split(prefix);

  return `${prefix}${content.substring(0, 7)}...${content.substring(
    content.length - 8,
    content.length - 1
  )}`;
};

export { shortenAddress };
