import { useState, useEffect } from "react";
import {
  GET_FREE_POSTS,
  GET_MY_PROFILE,
  GET_PAID_POSTS,
} from "src/data/graphql/queries";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "src/data/redux/Hooks";
import { readContract } from "@wagmi/core";
import { orderByTimeCreated } from "src/common/utils";
import { ProfileRepository } from "src/data/repositories/ProfileRepository";
import { useParams, useLocation } from "react-router-dom";
import { isEmpty } from "lodash";
import Web3 from "web3";
import JustFriendsABI from "src/common/abis/JustFriends.json";
import { Post } from "src/domain/models/home/Post";
import { VOTE_TYPES } from "src/common/constants";
import { parseEther } from "viem";

const TABS = [
  { id: 0, name: "Purchased posts" },
  { id: 1, name: "Unpurchased posts" },
  { id: 2, name: "Free posts" },
];

type TabState = {
  id: number;
  name: string;
};

const useCreatorProfile = () => {
  const location = useLocation();

  const [tab, setTab] = useState<TabState>({
    id: TABS[0].id,
    name: TABS[0].name,
  });
  const [purchasedPosts, setPurchasedPosts] = useState<any>([]);
  const [unpurchasedPosts, setUnpurchasedPosts] = useState<any>([]);
  const [freePosts, setFreePosts] = useState<any>([]);
  const [creatorInfo, setCreatorInfo] = useState({
    username: "",
    walletAddress: "",
    avatarUrl: "",
    coverUrl: "",
    loyalFan: false,
    numberOfUpVotes: "",
    numberOfDownVotes: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPosts, setTotalPosts] = useState<number>(0);

  const { profile, accessToken } = useAppSelector((state) => state.auth);

  const { id } = useParams();
  const walletAddress = `0x${id}`;

  const { loading: loadingContentFreePosts, data: contentFreePosts } = useQuery(
    GET_FREE_POSTS,
    {
      variables: {
        creator: walletAddress.toLocaleLowerCase(),
        address: profile?.walletAddress?.toLowerCase(),
      },
      onCompleted: getPosts,
    }
  );
  const { loading: loadingContentPaidPosts, data: contentPaidPosts } = useQuery(
    GET_PAID_POSTS,
    {
      variables: {
        creator: walletAddress.toLocaleLowerCase(),
        account: profile?.walletAddress?.toLocaleLowerCase(),
      },
      onCompleted: getPosts,
    }
  );

  const getContentPosts = async (hashes: any) => {
    const profileRepository = ProfileRepository.create();

    try {
      const res = await profileRepository.getPosts(hashes, accessToken);

      const data = await readContract({
        address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}` || "",
        abi: JustFriendsABI.abi,
        functionName: "getContentsInfo",
        args: [hashes],
      });

      const posts = res.map((post: object, index: number) => {
        // @ts-ignore
        return { ...data[index], ...post };
      });

      return orderByTimeCreated(posts);
    } catch (error) {
      console.log({ error });
    }
  };

  async function getPosts() {
    setLoading(true);
    if (tab.id === 0) {
      if (
        !loadingContentPaidPosts &&
        contentPaidPosts?.contentEntities &&
        contentPaidPosts?.userPostEntities
      ) {
        const contentPurchasedPosts = contentPaidPosts?.contentEntities.filter(
          (paidPost: any) =>
            contentPaidPosts?.userPostEntities.some(
              (purchasedPost: any) => paidPost.hash === purchasedPost.post
            )
        );
        const contentHashes = contentPurchasedPosts?.map(
          (content: any) => content.hash
        );
        const [contentPosts, contentPrices]: [Post[] | undefined, any] =
          await Promise.all([
            getContentPosts(contentHashes),
            readContract({
              address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
              abi: JustFriendsABI.abi,
              functionName: "getSellPrice",
              args: [contentHashes, new Array(contentHashes.length).fill(1)],
            }),
          ]);

        setPurchasedPosts(
          contentPosts?.map((content, index) => ({
            ...content,
            price: BigInt(contentPrices[index]),
            oldPrice: contentPaidPosts?.userPostEntities?.find(
              (myPost: any) => myPost.post === `0x${content.contentHash}`
            )?.price,
            isOwner: true,
          }))
        );
      }
    } else if (tab.id === 1) {
      if (
        !loadingContentPaidPosts &&
        contentPaidPosts?.contentEntities &&
        contentPaidPosts?.userPostEntities
      ) {
        const contentUnpurchasedPosts =
          contentPaidPosts?.contentEntities.filter(
            (paidPost: any) =>
              !contentPaidPosts?.userPostEntities.some(
                (purchasedPost: any) => paidPost.hash === purchasedPost.post
              )
          );
        const contentHashes = contentUnpurchasedPosts?.map(
          (content: any) => content.hash
        );

        const [contentPosts, contentPrices]: [Post[] | undefined, any] =
          await Promise.all([
            getContentPosts(contentHashes),
            readContract({
              address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
              abi: JustFriendsABI.abi,
              functionName: "getBuyPrice",
              args: [contentHashes, new Array(contentHashes.length).fill(1)],
            }),
          ]);

        setUnpurchasedPosts(
          contentPosts?.map((content, index) => ({
            ...content,
            price: BigInt(contentPrices[index]),
          }))
        );
      }
    } else if (tab.id === 2) {
      const { contentEntities, postVoteEntities } = contentFreePosts;
      if (!loadingContentFreePosts && contentEntities) {
        const contentPosts = await getContentPosts(
          contentFreePosts?.contentEntities.map((content: any) => content.hash)
        );

        const res = contentPosts?.map((content: any) => {
          const contentHash = `0x${content.contentHash}`;
          const vote = postVoteEntities.find(
            (vote: any) => vote.post === contentHash
          );
          if (!vote) {
            return { ...content, isVoted: false };
          } else {
            return {
              ...content,
              isVoted: true,
              voteType: vote.type ? VOTE_TYPES.UPVOTE : VOTE_TYPES.DOWNVOTE,
            };
          }
        });

        setFreePosts(res);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  const onChangeTab = (data: TabState) => {
    setTab(data);
  };

  const getCreatorInfo = async () => {
    const profileRepository = ProfileRepository.create();
    try {
      const res = await profileRepository.getUsers(accessToken, [
        walletAddress.toLocaleLowerCase(),
      ]);

      const isLoyalFan = await getLoyalFan(walletAddress);

      if (!isEmpty(res) && !loadingProfile) {
        const { creatorEntities, userPostEntities } = profileData;

        setCreatorInfo({
          ...res[0],
          loyalFan: !!isLoyalFan,
          numberOfUpVotes: creatorEntities[0].totalUpVote,
          numberOfDownVotes: creatorEntities[0].totalDownVote,
        });

        setTotalPosts(userPostEntities.length || 0);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const getLoyalFan = async (walletAddress: string) => {
    const web3 = new Web3(process.env.REACT_APP_RPC);

    const blockNumber = await web3.eth.getBlockNumber();

    const data = (await readContract({
      address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}` || "",
      abi: JustFriendsABI.abi,
      functionName: "getListLoyalty",
      args: [walletAddress, blockNumber],
    })) as [];

    const isLoyalFan = data.find((item: string) => item === walletAddress);

    return isLoyalFan;
  };

  const { loading: loadingProfile, data: profileData } = useQuery(
    GET_MY_PROFILE,
    {
      variables: { address: walletAddress },
      onCompleted: getCreatorInfo,
    }
  );

  const getCreatorInfoFromGraphQL = () => {
    if (!loadingProfile) {
      const { creatorEntities, userPostEntities } = profileData;

      setCreatorInfo({
        ...creatorInfo,
        username: location.state.name,
        numberOfUpVotes: creatorEntities[0].totalUpVote,
        numberOfDownVotes: creatorEntities[0].totalDownVote,
      });

      setTotalPosts(userPostEntities.length || 0);
    }
  };

  const copyAddress = async (creatorAddress: string) => {
    if (creatorAddress) {
      await navigator.clipboard.writeText(creatorAddress);
    }
  };

  useEffect(() => {
    getPosts();
  }, [tab]);

  useEffect(() => {
    if (accessToken) getCreatorInfo();
    else getCreatorInfoFromGraphQL();
  }, [accessToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return {
    totalPosts,
    profileData,
    tab,
    TABS,
    purchasedPosts,
    unpurchasedPosts,
    freePosts,
    loadingProfile,
    loadingContentFreePosts,
    loadingContentPaidPosts,
    creatorInfo,
    loading,
    onChangeTab,
    getPosts,
    setFreePosts,
    copyAddress,
  };
};

export default useCreatorProfile;
