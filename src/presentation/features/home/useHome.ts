import { useEffect, useState } from "react";
import { FREE_POSTS, PAID_POSTS, POST_OPTIONS } from "src/common/constants";
import { writeContract, readContract } from "@wagmi/core";
import { HomeRepository } from "src/data/repositories/HomeRepository";
import { useAppSelector } from "src/data/redux/Hooks";
import { parseEther } from "viem";
import { useWeb3Modal } from "@web3modal/react";
import { ROUTE } from "src/common/constants/route";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OptionState } from "./types";
import { useAccount } from "wagmi";
import Web3 from "web3";
import {
  fillUserOp,
  getCallDataCreatePost,
  getCallDataEntryPoint,
  signUserOp,
} from "src/common/utils/wallet";
import entryPointAbi from "src/common/abis/IEntryPoint.json";
import justFriendAbi from "src/common/abis/JustFriends.json";
import { BAOBAB_CONFIG } from "src/data/config/chains";
import { requestToRelayer } from "src/presentation/services";

const useHome = () => {
  const { open } = useWeb3Modal();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState<OptionState>({
    id: POST_OPTIONS[0].id,
    title: POST_OPTIONS[0].title,
    value: POST_OPTIONS[0].value,
  });
  const [openOptionSelect, setOpenOptionSelect] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [textareaHeight, setTextareaHeight] = useState<number>(160);
  const [baseFee, setBaseFee] = useState<string>("");
  const [isFreePosts, setIsFreePosts] = useState<boolean>(true);
  const [posts, setPosts] = useState<any>([]);

  const homeRepository = HomeRepository.create();

  const { accessToken, profile } = useAppSelector((state) => state.auth);
  const { isConnected } = useAccount();

  const copyAddress = async () => {
    await navigator.clipboard.writeText("This is the text to be");
  };

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const onToggleSelect = () => {
    setOpenOptionSelect(!openOptionSelect);
  };

  const onSelectMenu = (data: OptionState) => {
    setOption(data);
    setBaseFee("");
    onToggleSelect();
  };

  const handleTextareaChange = (event: any) => {
    setTextareaValue(event.target.value);

    if (event.target.value)
      setTextareaHeight(Math.max(event.target.scrollHeight, 160));
    else setTextareaHeight(0);
  };

  const handleRemoveText = () => {
    setTextareaValue("");
    setTextareaHeight(0);
  };

  const handleSharePost = async (onToggleModal: any, onRemoveText: any) => {
    if (!accessToken) {
      open();
    } else {
      try {
        const { contentHash } = await homeRepository.createPost({
          content: textareaValue,
          type: option.value,
          accessToken,
        });
        if (isConnected) {
          await writeContract({
            address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            abi: justFriendAbi.abi,
            functionName: "postContent",
            args: [`0x${contentHash}`, parseEther(option.id ? "0" : "0.01")],
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
          const msgCallData = getCallDataCreatePost({
            contentHash: `0x${contentHash}`,
            startedPrice: parseEther(option.id ? "0" : "0.01"),
          });
          console.log({ msgCallData });
          console.log({
            value: parseEther("0"),
            target: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            msgDataEncode: msgCallData,
          });

          const callData = getCallDataEntryPoint({
            value: parseEther("0"),
            target: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            msgDataEncode: msgCallData,
          });
          console.log({ callData });
          console.log({ sender: account.contractAddress });
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
          console.log({ op });
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
          const res = await requestToRelayer(signedUserOp);
          console.log(res);
        }
        onToggleModal();
        onRemoveText();
        toast.success("Your post has been created successfully!");
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const navigateToProfile = () => {
      navigate(ROUTE.PROFILE);
  };
  
  const getListOfPostsByType = async () => {
    try {
      const res = await homeRepository.getPosts({
        type: isFreePosts ? FREE_POSTS : PAID_POSTS,
        page: 1,
        limit: 10,
      });

      const data = await readContract({
        address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}` || "",
        abi: justFriendAbi.abi,
        functionName: "getContentsInfo",
        args: [res.map((content) => `0x${content.contentHash}`)],
      });

      const posts = res.map((post: object, index: number) => {
        console.log({ index });
        // @ts-ignore
        return { ...post, ...data[index] };
      });

      setPosts(posts);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getListOfPostsByType();
  }, [isFreePosts]);

  return {
    posts,
    openModal,
    option,
    openOptionSelect,
    textareaValue,
    textareaHeight,
    baseFee,
    isFreePosts,
    setBaseFee,
    setIsFreePosts,
    copyAddress,
    onToggleSelect,
    handleToggleModal,
    onSelectMenu,
    handleTextareaChange,
    handleSharePost,
    navigateToProfile,
    handleRemoveText,
  };
};

export default useHome;
