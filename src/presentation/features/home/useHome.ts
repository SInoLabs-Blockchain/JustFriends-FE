import { useState, useEffect } from "react";
import {
  ERROR_MESSAGE,
  FREE_POSTS,
  PAID_POSTS,
  POST_OPTIONS,
  VOTE_TYPES,
} from "src/common/constants";
import { writeContract, readContract } from "@wagmi/core";
import { HomeRepository } from "src/data/repositories/HomeRepository";
import { useAppDispatch, useAppSelector } from "src/data/redux/Hooks";
import { parseEther } from "viem";
import { useWeb3Modal } from "@web3modal/react";
import { ROUTE } from "src/common/constants/route";
import {
  useNavigate,
  useLocation,
  useNavigationType,
  NavigationType,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GET_NEW_POSTS,
  GET_PURCHASES,
  GET_VOTES,
} from "src/data/graphql/queries";
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
import JustFriendsABI from "src/common/abis/JustFriends.json";
import { setProfile } from "src/data/redux/auth/AuthReducer";

const useHome = () => {
  const { open } = useWeb3Modal();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();

  const [isFreePosts, setIsFreePosts] = useState<boolean>(true);
  const [isTrendingPosts, setIsTrendingPosts] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState<OptionState>({
    id: POST_OPTIONS[0].id,
    title: POST_OPTIONS[0].title,
    value: POST_OPTIONS[0].value,
  });
  const [openOptionSelect, setOpenOptionSelect] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [textareaHeight, setTextareaHeight] = useState<number>(160);
  const [basePrice, setBasePrice] = useState<string>("0");
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [topCreators, setTopCreators] = useState<Array<Profile>>([]);
  const [trendingPosts, setTrendingPosts] = useState<Array<Post>>([]);

  const homeRepository = HomeRepository.create();
  const profileRepository = ProfileRepository.create();

  const { accessToken, profile } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);

  const [getVotes, { loading: loadingVotes, data: votes }] =
    useLazyQuery(GET_VOTES);
  const [getPurchases, { loading: loadingPurchases, data: purchases }] =
    useLazyQuery(GET_PURCHASES);

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
      return
    }

    try {
      setLoading(true);
      const content = await homeRepository.createPost({
        content: textareaValue,
        type: option.value,
        accessToken,
      });

      if (option.id === POST_OPTIONS[1].id) setIsFreePosts(false);
      else setIsFreePosts(true);

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
          localStorage.getItem("passcode") || ""
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
          type: FREE_POSTS,
        });
        return temp;
      });
      dispatch(
        setProfile({ ...profile, totalPost: (profile?.totalPost || 0) + 1 })
      );
      toast.success("Your post has been created successfully!");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message || ERROR_MESSAGE);
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
        const [detailContentList, detailTopCreatorsList] = await Promise.all([
          homeRepository.getPosts({ contentHashes, accessToken }),
          profileRepository.getUsers(
            accessToken,
            topCreators.map((creator: any) => creator.address)
          ),
        ]);
        const validTopCreatorsList = topCreators
          ?.map((creator: any) => {
            const detailCreator = detailTopCreatorsList.find(
              (item) =>
                item.walletAddress.toLowerCase() ===
                creator.address.toLowerCase()
            );

            return detailCreator
              ? { ...detailCreator, creditScore: creator.creditScore }
              : null;
          })
          .filter((item: any) => parseInt(item?.creditScore) > 0);

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

            return {
              ...content,
              ...detailContent,
              isVoted: isVoted ? true : false,
              voteType: isVoted?.type ? VOTE_TYPES.UPVOTE : VOTE_TYPES.DOWNVOTE,
              isOwner: !!post,
              oldPrice: post?.price,
            };
          })
          ?.filter((content: any) => !!content);

        const orderedPosts = orderByTimeCreated(validContentList);
        const orderedPostsWithPrices = await getPrices(orderedPosts);
        setPosts(orderedPostsWithPrices);

        setLoading(false);
      } catch (error) {
        console.log({ error });
        setLoading(false);
      }
    }
  };

  const { data, refetch } = useQuery(GET_NEW_POSTS, {
    variables: {
      address: profile?.walletAddress?.toLowerCase() || "",
      isPaid: !isFreePosts,
    },
    onCompleted: getListOfPostsByType,
    skip: false && profile && !isTrendingPosts,
  });

  const handleSwitchZone = () => {
    setPosts([]);
    setIsFreePosts((prev) => !prev);
  };

  const getPrices = async (contents: any[]) => {
    if (isFreePosts) return contents;
    let ownedContentHashes = <any>[],
      unpurchasedContentHashes = <any>[];

    for (const content of contents) {
      if (content.isOwner) {
        ownedContentHashes.push(content.hash);
      } else {
        unpurchasedContentHashes.push(content.hash);
      }
    }

    const ownedAmounts = new Array(ownedContentHashes.length).fill(1);
    const unpurchasedAmounts = new Array(unpurchasedContentHashes.length).fill(
      1
    );
    const [sellPrices, buyPrices]: Array<any> = await Promise.all([
      readContract({
        address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
        abi: justFriendAbi.abi,
        functionName: "getSellPrice",
        args: [ownedContentHashes, ownedAmounts],
      }),
      readContract({
        address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
        abi: justFriendAbi.abi,
        functionName: "getBuyPrice",
        args: [unpurchasedContentHashes, unpurchasedAmounts],
      }),
    ]);

    const res = contents.map((content: any) => {
      if (content.isOwner) {
        const index = ownedContentHashes.indexOf(content.hash);
        const price = sellPrices[index];
        return {
          ...content,
          price: BigInt(price),
        };
      } else {
        const index = unpurchasedContentHashes.indexOf(content.hash);
        const price = buyPrices[index];
        return {
          ...content,
          price: BigInt(price),
        };
      }
    });

    return res;
  };

  const getDetailPostList = async (hashes: any) => {
    try {
      const data = await readContract({
        address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}` || "",
        abi: JustFriendsABI.abi,
        functionName: "getContentsInfo",
        args: [hashes],
      });
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  async function getTrendingPosts() {
    setLoading(true);
    const timestamp = Math.floor(
      (Date.now() - 1000 * 24 * 60 * 60) / 1000
    ).toString();
    if (isFreePosts) {
      getVotes({ variables: { timestamp } });
      if (votes && !loadingVotes) {
        const { votedEntities } = votes;
        const frequencyMap = votedEntities.reduce((map: any, obj: any) => {
          const hash = obj.hash;
          map.set(hash, (map.get(hash) || 0) + 1);
          return map;
        }, new Map());
        const sortedHashes = Array.from(frequencyMap.entries()).sort(
          (a: any, b: any) => b[1] - a[1]
        );
        const contentHashes = sortedHashes.map((hash: any) => hash[0]);

        const { postVoteEntities: myVotes, userPostEntities: myPosts } = data;
        try {
          const [detailContentList, detailPostList] = await Promise.all([
            homeRepository.getPosts({ contentHashes, accessToken }),
            getDetailPostList(contentHashes),
          ]);
          const validContentList = contentHashes
            .map((contentHash: any, index) => {
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
              return {
                // @ts-ignore
                ...detailPostList[index],
                ...detailContent,
                isVoted: isVoted ? true : false,
                voteType: isVoted?.type
                  ? VOTE_TYPES.UPVOTE
                  : VOTE_TYPES.DOWNVOTE,
                isOwner: !!post,
              };
            })
            ?.filter((content: any) => !!content);
          // @ts-ignore
          setTrendingPosts(validContentList);
          setLoading(false);
        } catch (error) {
          console.log({ error });
          setLoading(false);
        }
      }
    } else {
      getPurchases({ variables: { timestamp } });
      if (purchases && !loadingPurchases) {
        const { accessPurchasedEntities } = purchases;
        const frequencyMap = accessPurchasedEntities.reduce(
          (map: any, obj: any) => {
            const hash = obj.hash;
            map.set(hash, (map.get(hash) || 0) + 1);
            return map;
          },
          new Map()
        );
        const sortedHashes = Array.from(frequencyMap.entries()).sort(
          (a: any, b: any) => b[1] - a[1]
        );
        const contentHashes = sortedHashes.map((hash: any) => hash[0]);
        const { userPostEntities: myPosts } = data;
        try {
          const [detailContentList, detailPostList] = await Promise.all([
            homeRepository.getPosts({ contentHashes, accessToken }),
            getDetailPostList(contentHashes),
          ]);

          const validContentList = contentHashes
            .map((contentHash: any, index) => {
              const detailContent = detailContentList.find(
                (detail) => `0x${detail.contentHash}` === contentHash
              );

              const post = myPosts?.find(
                (post: any) =>
                  post.account.toLowerCase() ===
                  profile?.walletAddress?.toLowerCase() &&
                  post.post === contentHash
              );
              return {
                // @ts-ignore
                ...detailPostList[index],
                ...detailContent,
                hash: contentHash,
                isOwner: !!post,
              };
            })
            ?.filter((content: any) => !!content);

          const validContentListWithPrice = await getPrices(validContentList);
          console.log({ validContentListWithPrice });

          // @ts-ignore
          setTrendingPosts(validContentListWithPrice);
          setLoading(false);
        } catch (error) {
          console.log({ error });
          setLoading(false);
        }
      }
    }
  }

  useEffect(() => {
    if (isTrendingPosts) {
      getTrendingPosts();
    }
  }, [isTrendingPosts, isFreePosts, votes, purchases]);

  useEffect(() => {
    if (navigationType === NavigationType.Pop) {
      setIsFreePosts(false);
    }
  }, [location, navigationType]);

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
    isTrendingPosts,
    trendingPosts,
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
    setIsTrendingPosts,
  };
};

export default useHome;
