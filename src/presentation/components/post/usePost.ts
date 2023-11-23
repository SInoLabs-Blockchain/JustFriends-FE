import { useAppSelector } from "src/data/redux/Hooks";
import { writeContract, readContract } from "@wagmi/core";
import { parseEther } from "viem";
import { toast } from "react-toastify";
import {
  getCallDataVotePost,
  getCallDataEntryPoint,
  fillUserOp,
  signUserOp,
  getCallDataPurchasePost,
  getCallDataSellPost,
} from "src/common/utils/wallet";
import { requestToRelayer } from "src/presentation/services";
import { useNavigate } from "react-router-dom";
import { BAOBAB_CONFIG } from "src/data/config/chains";
import entryPointAbi from "src/common/abis/IEntryPoint.json";
import justFriendAbi from "src/common/abis/JustFriends.json";
import { useState } from "react";
import { VOTE_TYPES } from "src/common/constants";
import Web3 from "web3";
import { ROUTE } from "src/common/constants/route";

function usePost({ open, setPosts }: any) {
  const { accessToken, profile } = useAppSelector((state) => state.auth);
  const [isPurchasing, setPurchasing] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isUpvoting, setUpvoting] = useState(false);
  const [isDownvoting, setDownvoting] = useState(false);
  const navigate = useNavigate();
  const [selectingPost, setSelectingPost] = useState({
    contentHash: "",
    price: -1,
    supply: -1,
    startPrice: -1,
    accessTokenId: -1,
  });
  const [type, setType] = useState(0);

  async function handleVotePost(contentHash: string, voteType: number) {
    if (!accessToken) {
      return;
    } else {
      if (voteType === VOTE_TYPES.DOWNVOTE) {
        setDownvoting(true);
      } else {
        setUpvoting(true);
      }
      try {
        if (!profile?.isFriend) {
          await writeContract({
            address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            abi: justFriendAbi.abi,
            functionName: "vote",
            args: [`0x${contentHash}`, voteType],
            account: profile?.walletAddress,
          });
        } else {
          const account = JSON.parse(localStorage.getItem("account") || "{}");
          const sessionAccount = JSON.parse(
            localStorage.getItem("sessionAccount") || "{}"
          );
          const web3 = new Web3(process.env.REACT_APP_RPC);
          const entryPointContract = new web3.eth.Contract(
            entryPointAbi.abi,
            `0x${process.env.REACT_APP_ENTRY_POINT_ADDRESS}`
          );
          const msgCallData = getCallDataVotePost({
            contentHash: `0x${contentHash}`,
            voteType,
          });
          const callData = getCallDataEntryPoint({
            value: parseEther("0"),
            target: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            msgDataEncode: msgCallData,
          });
          const op = await fillUserOp(
            {
              sender: account.contractAddress,
              callData,
              nonce: 1000,
              maxFeePerGas: 0,
              maxPriorityFeePerGas: 0,
              callGasLimit: 400000,
            },
            entryPointContract
          );
          const decryptedSessionData = await web3.eth.accounts.decrypt(
            sessionAccount.encryptedPrivateKey,
            "111111"
          );
          if (!decryptedSessionData) {
            throw new Error("Decrypt private key failed");
          }
          const signedUserOp = await signUserOp({
            op,
            privateKey: decryptedSessionData.privateKey,
            entryPoint: `0x${process.env.REACT_APP_ENTRY_POINT_ADDRESS}`,
            chainId: BAOBAB_CONFIG.id,
            sessionUser: sessionAccount.address,
          });
          await requestToRelayer(signedUserOp);
        }
        if (voteType === VOTE_TYPES.DOWNVOTE) {
          setDownvoting(false);
          setPosts((prev: any) => {
            const res = prev.map((content: any) => {
              if (content?.contentHash === contentHash) {
                return {
                  ...content,
                  totalDownvote: Number(content?.totalDownvote) + 1,
                  totalUpvote:
                    content?.isVoted && content?.voteType === VOTE_TYPES.UPVOTE
                      ? Number(content?.totalUpvote) - 1
                      : Number(content?.totalUpvote),
                  isVoted: true,
                  voteType,
                };
              } else {
                return content;
              }
            });
            return res;
          });
        } else {
          setUpvoting(false);
          setPosts((prev: any) => {
            return prev.map((content: any) => {
              if (content?.contentHash === contentHash) {
                return {
                  ...content,
                  totalDownvote:
                    content?.isVoted &&
                    content?.voteType === VOTE_TYPES.DOWNVOTE
                      ? Number(content?.totalDownvote) - 1
                      : Number(content?.totalDownvote),
                  totalUpvote: Number(content?.totalUpvote) + 1,
                  isVoted: true,
                  voteType,
                };
              } else {
                return content;
              }
            });
          });
        }
      } catch (error) {
        console.log({ error });
        if (voteType === VOTE_TYPES.DOWNVOTE) {
          setDownvoting(false);
        } else {
          setUpvoting(false);
        }
      }
    }
  }

  async function handlePurchasePostAccess(price: number) {
    if (!accessToken) {
      open();
    } else {
      try {
        setPurchasing(true);
        if (!profile?.isFriend) {
          await writeContract({
            address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            abi: justFriendAbi.abi,
            functionName: "buyContentAccess",
            args: [`${selectingPost.contentHash}`, 1],
            account: profile?.walletAddress,
            value: BigInt(selectingPost.price),
          });
        } else {
          const account = JSON.parse(localStorage.getItem("account") || "{}");
          const sessionAccount = JSON.parse(
            localStorage.getItem("sessionAccount") || "{}"
          );
          const web3 = new Web3(process.env.REACT_APP_RPC);
          const entryPointContract = new web3.eth.Contract(
            entryPointAbi.abi,
            `0x${process.env.REACT_APP_ENTRY_POINT_ADDRESS}`
          );
          const msgCallData = getCallDataPurchasePost({
            contentHash: `${selectingPost.contentHash}`,
            amount: 1,
          });
          const callData = getCallDataEntryPoint({
            value: BigInt(price.toString()),
            target: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            msgDataEncode: msgCallData,
          });
          const op = await fillUserOp(
            {
              sender: account.contractAddress,
              callData,
              nonce: 1000,
              maxFeePerGas: 0,
              maxPriorityFeePerGas: 0,
              callGasLimit: 400000,
            },
            entryPointContract
          );
          const decryptedSessionData = await web3.eth.accounts.decrypt(
            sessionAccount.encryptedPrivateKey,
            "111111"
          );
          if (!decryptedSessionData) {
            throw new Error("Decrypt private key failed");
          }
          const signedUserOp = await signUserOp({
            op,
            privateKey: decryptedSessionData.privateKey,
            entryPoint: `0x${process.env.REACT_APP_ENTRY_POINT_ADDRESS}`,
            chainId: BAOBAB_CONFIG.id,
            sessionUser: sessionAccount.address,
          });
          await requestToRelayer(signedUserOp);
        }
        setTimeout(() => {
          handleToggleConfirmationModal();
          setPurchasing(false);
          navigate(`/post/${selectingPost.contentHash}`);
          toast.success("Buy Post Access Successfully");
        }, 5000);
      } catch (error) {
        setPurchasing(false);
        console.log({ error });
      }
    }
  }

  async function handleSellPostAccess() {
    if (!accessToken) {
      open();
    } else {
      try {
        setPurchasing(true);
        if (selectingPost?.supply === 1) {
          throw new Error("You cannot sell the last content access");
        }
        if (!profile?.isFriend) {
          await writeContract({
            address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            abi: justFriendAbi.abi,
            functionName: "sellContentAccess",
            args: [selectingPost.contentHash, 1],
            account: profile?.walletAddress,
          });
        } else {
          const account = JSON.parse(localStorage.getItem("account") || "{}");
          const sessionAccount = JSON.parse(
            localStorage.getItem("sessionAccount") || "{}"
          );
          const web3 = new Web3(process.env.REACT_APP_RPC);
          const entryPointContract = new web3.eth.Contract(
            entryPointAbi.abi,
            `0x${process.env.REACT_APP_ENTRY_POINT_ADDRESS}`
          );
          const msgCallData = getCallDataSellPost({
            contentHash: selectingPost.contentHash,
            amount: 1,
          });
          const callData = getCallDataEntryPoint({
            value: "0",
            target: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            msgDataEncode: msgCallData,
          });
          const op = await fillUserOp(
            {
              sender: account.contractAddress,
              callData,
              nonce: 1000,
              maxFeePerGas: 0,
              maxPriorityFeePerGas: 0,
              callGasLimit: 400000,
            },
            entryPointContract
          );
          const decryptedSessionData = await web3.eth.accounts.decrypt(
            sessionAccount.encryptedPrivateKey,
            "111111"
          );
          if (!decryptedSessionData) {
            throw new Error("Decrypt private key failed");
          }
          const signedUserOp = await signUserOp({
            op,
            privateKey: decryptedSessionData.privateKey,
            entryPoint: `0x${process.env.REACT_APP_ENTRY_POINT_ADDRESS}`,
            chainId: BAOBAB_CONFIG.id,
            sessionUser: sessionAccount.address,
          });
          await requestToRelayer(signedUserOp);
        }
        setTimeout(async () => {
          handleToggleConfirmationModal();
          setPurchasing(false);
          navigate(`/profile`);
          toast.success("Sell Post Access Successfully");
        }, 5000);
      } catch (error: any) {
        handleToggleConfirmationModal();
        setPurchasing(false);
        toast.error(error.message);
        console.log({ error });
      }
    }
  }

  function navigateUserProfile(walletAddress: string) {
    if (walletAddress === profile?.walletAddress) navigate(ROUTE.PROFILE);
    else navigate(`/profile/${walletAddress.slice(2)}`);
  }

  async function handleToggleConfirmationModal(
    selectingContentHash?: string,
    selectingContentSupply?: number,
    selectingContentPrice?: number,
    modalType?: number,
    accessTokenId?: number
  ) {
    setType(modalType || 0);
    setSelectingPost((prev) => ({
      ...prev,
      contentHash: selectingContentHash ? `0x${selectingContentHash}` : "",
      supply: selectingContentSupply || -1,
      startPrice: selectingContentPrice || -1,
      accessTokenId: accessTokenId || -1,
    }));
    setOpen((prev) => !prev);
  }

  const handleViewDetailPost = (contentHash: string) => {
    if (contentHash.includes("0x")) {
      navigate(`/post/${contentHash}`);
    } else {
      navigate(`/post/0x${contentHash}`);
    }
  };

  return {
    type,
    price: selectingPost.price,
    isOpen,
    isUpvoting,
    isDownvoting,
    isPurchasing,
    handleVotePost,
    handlePurchasePostAccess,
    handleSellPostAccess,
    navigateUserProfile,
    handleToggleConfirmationModal,
    handleViewDetailPost,
  };
}

export default usePost;
