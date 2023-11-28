import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/data/redux/Hooks";
import { ProfileRepository } from "src/data/repositories/ProfileRepository";
import { setProfile } from "src/data/redux/auth/AuthReducer";
import { toast } from "react-toastify";
import { ROUTE } from "src/common/constants/route";
import {
  GET_CREDIT_SCORE,
  GET_MY_POSTS,
  GET_PURCHASED_POSTS,
} from "src/data/graphql/queries";
import { useQuery } from "@apollo/client";
import { readContract } from "@wagmi/core";
import JustFriendsABI from "src/common/abis/JustFriends.json";
import { orderByTimeCreated } from "src/common/utils";
import justFriendAbi from "src/common/abis/JustFriends.json";
import { Post } from "src/domain/models/home/Post";
import { parseEther } from "viem";

const TABS = [
  { id: 0, name: "My posts" },
  { id: 1, name: "Purchased post" },
  { id: 2, name: "Revenue" },
];

type TabState = {
  id: number;
  name: string;
};

const useProfile = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { accessToken, profile } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState(profile?.username || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || "");
  const [coverUrl, setCoverUrl] = useState(profile?.coverUrl || "");
  const [myPosts, setMyPosts] = useState<any>([]);
  const [purchasedPosts, setPurchasedPosts] = useState<any>([]);
  const [creditScore, setCreditScore] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const { loading: loadingContentMyPosts, data: contentMyPosts } = useQuery(
    GET_MY_POSTS,
    {
      variables: { creator: profile?.walletAddress?.toLocaleLowerCase() },
      onCompleted: getPosts,
    }
  );
  const { loading: loadingContentPurchasedPosts, data: contentPurchasedPosts } =
    useQuery(GET_PURCHASED_POSTS, {
      variables: { account: profile?.walletAddress?.toLocaleLowerCase() },
      onCompleted: getPosts,
    });
  const { data } = useQuery(GET_CREDIT_SCORE, {
    variables: { address: profile?.walletAddress?.toLocaleLowerCase() },
    onCompleted: onChangeCreditScore,
  });

  const [tab, setTab] = useState<TabState>({
    id: TABS[0].id,
    name: TABS[0].name,
  });

  const onChangeTab = (data: TabState) => {
    setTab(data);
    getPosts(data.id);
  };

  function onChangeCreditScore() {
    if (data?.creatorEntities[0]?.creditScore) {
      const { creatorEntities } = data;
      setCreditScore(creatorEntities[0].creditScore);
    } else setCreditScore("0");
  }

  const navigateToEditProfile = () => {
    navigate(ROUTE.EDIT_PROFILE);
  };

  const onChangeUsername = (event: any) => {
    setUsername(event.target.value);
  };

  const onChangeAvatar = (event: any) => {
    setAvatarUrl(event.target.value);
  };

  const onChangeCover = (event: any) => {
    setCoverUrl(event.target.value);
  };

  const onEditProfile = async () => {
    const profileRepository = ProfileRepository.create();

    try {
      const res = await profileRepository.editProfile(
        accessToken,
        avatarUrl,
        username,
        coverUrl
      );
      dispatch(setProfile({ ...profile, ...res }));
      navigate(ROUTE.PROFILE);
      toast.success("Your profile has been saved successfully!");
    } catch (error) {
      console.log({ error });
    }
  };

  const getContentPosts = async (hashes: string, accessToken: string) => {
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

  async function getPosts(tabId: number) {
    setLoading(true);
    if (tabId || tab.id === 0) {
      if (!loadingContentMyPosts && contentMyPosts?.contentEntities) {
        const contentHashes = contentMyPosts?.contentEntities.map(
          (content: any) => content.hash
        );
        const [contentPosts, contentPrices]: [Post[] | undefined, any] =
          await Promise.all([
            getContentPosts(contentHashes, accessToken),
            readContract({
              address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
              abi: justFriendAbi.abi,
              functionName: "getSellPrice",
              args: [contentHashes, new Array(contentHashes.length).fill(1)],
            }),
          ]);
        setMyPosts(
          contentPosts?.map((content, index) => ({
            ...content,
            price: BigInt(contentPrices[index]),
            oldPrice: parseEther("0.02"),
            isOwner: true,
          }))
        );
      }
    } else if (tabId || tab.id === 1) {
      if (
        !loadingContentPurchasedPosts &&
        contentPurchasedPosts?.userPostEntities
      ) {
        const purchasedList = contentPurchasedPosts?.userPostEntities;
        const [contentPosts, contentPrices]: [Post[] | undefined, any] =
          await Promise.all([
            getContentPosts(
              purchasedList.map((content: any) => content.post),
              accessToken
            ),
            readContract({
              address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
              abi: justFriendAbi.abi,
              functionName: "getSellPrice",
              args: [
                purchasedList.map((content: any) => content.post),
                new Array(purchasedList.length).fill(1),
              ],
            }),
          ]);

        setPurchasedPosts(
          contentPosts?.map((content, index) => ({
            ...content,
            contentHash: content.contentHash?.substring(2),
            isOwner: true,
            price: contentPrices[index],
            oldPrice: parseEther("0.02"),
          }))
        );
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  return {
    tab,
    TABS,
    username,
    myPosts,
    purchasedPosts,
    loadingContentMyPosts,
    loadingContentPurchasedPosts,
    creditScore,
    avatarUrl,
    coverUrl,
    loading,
    onChangeTab,
    navigateToEditProfile,
    onEditProfile,
    onChangeUsername,
    getPosts,
    onChangeAvatar,
    onChangeCover,
  };
};

export default useProfile;
