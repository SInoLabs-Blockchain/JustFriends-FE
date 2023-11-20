import { useState } from "react";
import { FREE_POSTS, POST_OPTIONS } from "src/common/constants";
import { writeContract } from "@wagmi/core";
import { HomeRepository } from "src/data/repositories/HomeRepository";
import { useAppSelector } from "src/data/redux/Hooks";
import { parseEther } from "viem";
import { useWeb3Modal } from "@web3modal/react";
import { ROUTE } from "src/common/constants/route";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import { GET_NEW_POSTS } from "src/data/graphql/queries";
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
import { orderByTimeCreated } from "src/common/utils";
import { Post } from "src/domain/models/home/Post";

const useHome = () => {
  const { open } = useWeb3Modal();
  const navigate = useNavigate();
  const [isFreePosts, setIsFreePosts] = useState<boolean>(true);

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
  const [posts, setPosts] = useState<Array<Post>>([]);

  const homeRepository = HomeRepository.create();

  const { accessToken, profile } = useAppSelector((state) => state.auth);
  const { isConnected } = useAccount();

  const copyAddress = async () => {
    if (profile?.walletAddress) {
      await navigator.clipboard.writeText(profile.walletAddress);
    }
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

  const handleSharePost = async () => {
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
            args: [
              `0x${contentHash}`,
              parseEther(option.id ? "0" : "0.01"),
              option.value === FREE_POSTS ? false : true,
            ],
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
    if (data && !loading) {
      const { contentEntities: contents, postVoteEntities: myVotes } = data;

      const contentHashes = contents.map((content: any) => content.hash);
      try {
        const result = await homeRepository.getPosts(contentHashes);
        const detailContentList = contents.map((content: any) => {
          const contentHash = content.hash;
          const detailContent = result.find(
            (detail) => `0x${detail.contentHash}` === contentHash
          );
          const isVoted = myVotes.find(
            (vote: any) => contentHash === vote.post
          );

          return {
            ...content,
            ...detailContent,
            isVoted: isVoted ? true : false,
            voteType: isVoted?.type,
          };
        });
        const orderedPosts = orderByTimeCreated(detailContentList);
        setPosts(orderedPosts);
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const { loading, data, refetch } = useQuery(GET_NEW_POSTS, {
    variables: {
      address: profile?.walletAddress?.toLowerCase() || "",
      isPaid: !isFreePosts,
    },
    onCompleted: getListOfPostsByType,
    skip: false && profile,
  });

  return {
    posts,
    openModal,
    option,
    openOptionSelect,
    textareaValue,
    textareaHeight,
    baseFee,
    isFreePosts,
    profile,
    data,
    loading,
    open,
    setBaseFee,
    setPosts,
    refetch,
    setIsFreePosts,
    copyAddress,
    onToggleSelect,
    handleToggleModal,
    onSelectMenu,
    handleTextareaChange,
    handleSharePost,
    navigateToProfile,
    handleRemoveText,
    getListOfPostsByType,
  };
};

export default useHome;
