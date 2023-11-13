import { writeContract } from "@wagmi/core";
import JustFriendsABI from "src/common/abis/JustFriends.json";

interface votePropTypes {
  contentHash: string;
  voteType: number;
  periodTimestamp: number;
}

interface exchangePropTypes {
  contentHash: string;
  amount: number;
}

function usePost() {
  const handleVote = async ({
    contentHash,
    voteType,
    periodTimestamp,
  }: votePropTypes) => {
    try {
      await writeContract({
        address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
        abi: JustFriendsABI,
        functionName: "vote",
        args: [contentHash, voteType, periodTimestamp],
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleBuyAccess = async ({
    contentHash,
    amount,
  }: exchangePropTypes) => {
    try {
      await writeContract({
        address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
        abi: JustFriendsABI,
        functionName: "buyContentAccess",
        args: [contentHash, amount],
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSellAccess = async ({
    contentHash,
    amount,
  }: exchangePropTypes) => {
    try {
      await writeContract({
        address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
        abi: JustFriendsABI,
        functionName: "sellContentAccess",
        args: [contentHash, amount],
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    handleVote,
    handleBuyAccess,
    handleSellAccess,
  };
}

export default usePost;
