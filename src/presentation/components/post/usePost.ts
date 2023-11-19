import { useAppSelector } from "src/data/redux/Hooks";
import { useAccount } from "wagmi";
import { writeContract } from "@wagmi/core";
import { parseEther } from "viem";
import { toast } from "react-toastify";
import Web3 from "web3";

import useHome from "src/presentation/features/home/useHome";
import {
  getCallDataVotePost,
  getCallDataEntryPoint,
  fillUserOp,
  signUserOp,
  getCallDataPurchasePost,
  getCallDataSellPost,
} from "src/common/utils/wallet";
import { requestToRelayer } from "src/presentation/services";

import { BAOBAB_CONFIG } from "src/data/config/chains";
import entryPointAbi from "src/common/abis/IEntryPoint.json";
import justFriendAbi from "src/common/abis/JustFriends.json";

function usePost() {
  const { accessToken, profile } = useAppSelector((state) => state.auth);
  const { isConnected } = useAccount();
  const { handleToggleModal, handleRemoveText, open } = useHome();

  async function handleVotePost(contentHash: string, voteType: number) {
    if (!accessToken) {
      open();
    } else {
      try {
        if (isConnected) {
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
        handleToggleModal();
        handleRemoveText();
        toast.success("Vote Post Successfully!");
      } catch (error) {
        console.log({ error });
      }
    }
  }

  async function handlePurchasePostAccess(
    contentHash: string,
    amount: number,
    price: number
  ) {
    if (!accessToken) {
      open();
    } else {
      try {
        if (isConnected) {
          await writeContract({
            address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            abi: justFriendAbi.abi,
            functionName: "buyContentAccess",
            args: [`0x${contentHash}`, amount],
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
          const msgCallData = getCallDataPurchasePost({
            contentHash: `0x${contentHash}`,
            amount,
          });
          const callData = getCallDataEntryPoint({
            value: parseEther(price.toString()),
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
        handleToggleModal();
        handleRemoveText();
        toast.success("Buy Post Access Successfully");
      } catch (error) {
        console.log({ error });
      }
    }
  }

  async function handleSellPostAccess(contentHash: string, amount: number) {
    if (!accessToken) {
      open();
    } else {
      try {
        if (isConnected) {
          await writeContract({
            address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            abi: justFriendAbi.abi,
            functionName: "sellContentAccess",
            args: [`0x${contentHash}`, amount],
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
            contentHash: `0x${contentHash}`,
            amount,
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
        handleToggleModal();
        handleRemoveText();
        toast.success("Sell Post Access Successfully");
      } catch (error) {
        console.log({ error });
      }
    }
  }

  return { handleVotePost, handlePurchasePostAccess, handleSellPostAccess };
}

export default usePost;
