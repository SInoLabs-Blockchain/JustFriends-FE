import { useState, useEffect } from "react";
import { GET_FREE_POSTS, GET_PAID_POSTS } from "src/data/graphql/queries";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "src/data/redux/Hooks";
import { readContract } from "@wagmi/core";
import JustFriendsABI from "src/common/abis/JustFriends.json";
import { orderByTimeCreated } from "src/common/utils";
import { ProfileRepository } from "src/data/repositories/ProfileRepository";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";

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
  });

  const { profile, accessToken } = useAppSelector((state) => state.auth);

  const { id } = useParams();
  const walletAddress = `0x${id}`;

  const { loading: loadingContentFreePosts, data: contentFreePosts } = useQuery(
    GET_FREE_POSTS,
    {
      variables: { creator: walletAddress.toLocaleLowerCase() },
    }
  );
  const { loading: loadingContentPaidPosts, data: contentPaidPosts } = useQuery(
    GET_PAID_POSTS,
    {
      variables: {
        creator: walletAddress.toLocaleLowerCase(),
        account: profile?.walletAddress?.toLocaleLowerCase(),
      },
    }
  );

  const getContentPosts = async (hashes: any) => {
    const profileRepository = ProfileRepository.create();

    try {
      const res = await profileRepository.getPosts(hashes);

      const data = await readContract({
        address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}` || "",
        abi: JustFriendsABI.abi,
        functionName: "getContentsInfo",
        args: [hashes],
      });

      const posts = res.map((post: object, index: number) => {
        // @ts-ignore
        return { ...post, ...data[index] };
      });

      return orderByTimeCreated(posts);
    } catch (error) {
      console.log({ error });
    }
  };

  const getPosts = async () => {
    if (tab.id === 0) {
      if (
        !loadingContentPaidPosts &&
        contentPaidPosts?.contentEntities &&
        contentPaidPosts?.userPostEntities
      ) {
        const contentPurchasedPosts = contentPaidPosts?.contentEntities.filter(
          (paidPost: any) =>
            contentPaidPosts?.userPostEntities.some(
              (purchasedPost: any) => paidPost.hash === purchasedPost.hash
            )
        );

        const contentPosts = await getContentPosts(
          contentPurchasedPosts?.map((content: any) => content.hash)
        );
        setPurchasedPosts(contentPosts);
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
                (purchasedPost: any) => paidPost.hash === purchasedPost.hash
              )
          );

        const contentPosts = await getContentPosts(
          contentUnpurchasedPosts?.map((content: any) => content.hash)
        );
        setUnpurchasedPosts(contentPosts);
      }
    } else if (tab.id === 2) {
      if (!loadingContentFreePosts && contentFreePosts?.contentEntities) {
        const contentPosts = await getContentPosts(
          contentFreePosts?.contentEntities.map((content: any) => content.hash)
        );
        setFreePosts(contentPosts);
      }
    }
  };

  const onChangeTab = (data: TabState) => {
    setTab(data);
  };

  const getCreatorInfo = async () => {
    const profileRepository = ProfileRepository.create();
    try {
      const res = await profileRepository.getUsers(accessToken, [
        walletAddress.toLocaleLowerCase(),
      ]);
      if (!isEmpty(res)) setCreatorInfo(res[0]);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getPosts();
  }, [tab]);

  useEffect(() => {
    if (accessToken) getCreatorInfo();
  }, [accessToken]);

  return {
    tab,
    TABS,
    purchasedPosts,
    unpurchasedPosts,
    freePosts,
    loadingContentFreePosts,
    loadingContentPaidPosts,
    creatorInfo,
    onChangeTab,
    getPosts,
  };
};

export default useCreatorProfile;
