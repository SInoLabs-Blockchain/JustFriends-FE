import { useState } from "react";
import {
  FREE_POSTS,
  PAID_POSTS,
  POST_OPTIONS,
  VOTE_TYPES,
} from "src/common/constants";
import { writeContract, readContract } from "@wagmi/core";
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
import { ProfileRepository } from "src/data/repositories/ProfileRepository";
import { Profile } from "src/domain/models/auth";

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
  const [creatingPost, setCreatingPost] = useState<Post | null>(null);
  const [basePrice, setBasePrice] = useState<string>("0");
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [topCreators, setTopCreators] = useState<Array<Profile>>([]);

  const homeRepository = HomeRepository.create();
  const profileRepository = ProfileRepository.create();

  const { accessToken, profile } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);

  const copyAddress = async () => {
    if (profile?.walletAddress) {
      await navigator.clipboard.writeText(profile.walletAddress);
    }
  };

  const handleToggleModal = () => {
    if (!accessToken) return;
    setOpenModal(!openModal);
  };

  const onToggleSelect = () => {
    setOpenOptionSelect(!openOptionSelect);
  };

  const onSelectMenu = (data: OptionState) => {
    setOption(data);
    setBasePrice("");
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
        setLoading(true);
        const content = await homeRepository.createPost({
          content: textareaValue,
          type: option.value,
          accessToken,
        });

        const { contentHash } = content;
        if (!profile?.isFriend) {
          await writeContract({
            address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
            abi: justFriendAbi.abi,
            functionName: "postContent",
            args: [
              `0x${contentHash}`,
              parseEther(basePrice),
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
            startedPrice: parseEther(basePrice),
            isPaid: option.id === 0 ? true : false,
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
        setLoading(false);
        if (option.id === POST_OPTIONS[1].id) {
          setIsFreePosts(false);
          setCreatingPost({
            ...content,
            user: {
              username: profile?.username,
              avatarUrl: profile?.avatarUrl,
            },
            totalUpvote: 0,
            totalDownvote: 0,
            totalSupply: 1,
            price: parseEther(basePrice).toString(),
            isOwner: true,
            type: PAID_POSTS,
          });
        } else {
          setPosts((prev) => {
            const temp = prev;
            temp.unshift({
              ...content,
              user: {
                username: profile?.username,
                avatarUrl: profile?.avatarUrl,
              },
              totalUpvote: 0,
              totalDownvote: 0,
              price: basePrice,
              isOwner: true,
              type: PAID_POSTS,
            });
            return temp;
          });
        }
        toast.success("Your post has been created successfully!");
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const navigateToProfile = () => {
    navigate(ROUTE.PROFILE);
  };

  const navigateToCreatorProfile = (id: string) => {
    navigate(`/profile/${id}`);
  };

  const getListOfPostsByType = async () => {
    setLoading(true);
    if (data) {
      const {
        contentEntities: contents,
        postVoteEntities: myVotes,
        userPostEntities: myPosts,
        creatorEntities: topCreators,
      } = data;

      const contentHashes = contents.map((content: any) => content.hash);
      try {
        const [detailContentList, detailTopCreatorsList, contentPriceList] =
          await Promise.all([
            homeRepository.getPosts({ contentHashes, accessToken }),
            profileRepository.getUsers(
              accessToken,
              topCreators.map((creator: any) => creator.address)
            ),
            getPrices(contentHashes),
          ]);
        const validTopCreatorsList = topCreators
          ?.map((creator: any) => {
            const detailCreator = detailTopCreatorsList.find(
              (item: any) =>
                item.walletAddress.toLowerCase() ===
                creator.address.toLowerCase()
            );
            if (detailCreator) {
              return { ...detailCreator, creditScore: creator.creditScore };
            }
            return null;
          })
          ?.filter((item: any) => item !== null);
        setTopCreators(validTopCreatorsList);

        const validContentList = contents
          .map((content: any) => {
            const contentHash = content.hash;
            const detailContent = detailContentList.find(
              (detail) => `0x${detail.contentHash}` === contentHash
            );
            if (!detailContent) return;
            const isVoted = myVotes.find(
              (vote: any) => contentHash === vote.post
            );
            const post = myPosts?.find(
              (post: any) =>
                post.account.toLowerCase() ===
                  profile?.walletAddress?.toLowerCase() &&
                post.post === contentHash
            );
            const price = contentPriceList.find(
              (contentPrice: any) => contentPrice.contentHash === contentHash
            );
            return {
              ...content,
              ...detailContent,
              isVoted: isVoted ? true : false,
              voteType: isVoted?.type ? VOTE_TYPES.UPVOTE : VOTE_TYPES.DOWNVOTE,
              price: price?.price,
              isOwner: !!post,
            };
          })
          ?.filter((content: any) => !!content);
        const orderedPosts = orderByTimeCreated(validContentList);
        if (creatingPost) {
          orderedPosts.unshift(creatingPost);
          setCreatingPost(null);
        }
        setPosts(orderedPosts);
        setLoading(false);
      } catch (error) {
        console.log({ error });
        setLoading(false);
      }
    }
  };

  const { data } = useQuery(GET_NEW_POSTS, {
    variables: {
      address: profile?.walletAddress?.toLowerCase() || "",
      isPaid: !isFreePosts,
    },
    onCompleted: getListOfPostsByType,
    skip: false && profile,
  });

  const handleSwitchZone = () => {
    setPosts([]);
    setIsFreePosts((prev) => !prev);
  };

  const getPrices = async (contentHashes: any[]) => {
    if (isFreePosts) return [];
    const hashes = contentHashes.map((contentHash) => contentHash);
    const amounts = new Array(contentHashes.length).fill(1);
    const buyPrices = (await readContract({
      address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
      abi: justFriendAbi.abi,
      functionName: "getBuyPrice",
      args: [hashes, amounts],
    })) as Array<bigint>;
    const res = contentHashes.map((contentHash, index) => ({
      contentHash,
      price: buyPrices[index],
    }));
    return res;
  };

  return {
    posts,
    openModal,
    option,
    openOptionSelect,
    textareaValue,
    textareaHeight,
    basePrice,
    isFreePosts,
    topCreators,
    profile,
    data,
    loading,
    open,
    setBasePrice,
    setPosts,
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
    handleSwitchZone,
    navigateToCreatorProfile,
  };
};

export default useHome;
