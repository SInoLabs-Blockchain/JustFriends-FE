import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/data/redux/Hooks";
import { ProfileRepository } from "src/data/repositories/ProfileRepository";
import { setProfile } from "src/data/redux/auth/AuthReducer";
import { toast } from "react-toastify";
import { ROUTE } from "src/common/constants/route";
import { GET_MY_POSTS, GET_PURCHASED_POSTS } from "src/data/graphql/queries";
import { useQuery } from "@apollo/client";
import { readContract } from "@wagmi/core";
import JustFriendsABI from "src/common/abis/JustFriends.json";

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
  const [avatarUrl, setAvatarUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
  );
  const [coverUrl, setCoverUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
  );
  const [myPosts, setMyPosts] = useState<any>([]);
  const [purchasedPosts, setPurchasedPosts] = useState<any>([]);

  const { loading: loadingContentMyPosts, data: contentMyPosts } = useQuery(
    GET_MY_POSTS,
    {
      variables: { creator: profile?.walletAddress.toLocaleLowerCase() },
    }
  );
  const { loading: loadinContentPurchasedPosts, data: contentPurchasedPosts } =
    useQuery(GET_PURCHASED_POSTS, {
      variables: { account: profile?.walletAddress.toLocaleLowerCase() },
    });

  const [tab, setTab] = useState<TabState>({
    id: TABS[0].id,
    name: TABS[0].name,
  });

  const onChangeTab = (data: TabState) => {
    setTab(data);
  };

  const navigateToEditProfile = () => {
    navigate(ROUTE.EDIT_PROFILE);
  };

  const onChangeUsername = (event: any) => {
    setUsername(event.target.value);
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
      dispatch(setProfile(res));
      toast.success("Your profile has been saved successfully!");
    } catch (error) {
      console.log({ error });
    }
  };

  const getContentPosts = async (hashes: any) => {
    const profileRepository = ProfileRepository.create();

    try {
      const res = await profileRepository.getPosts(accessToken, hashes);

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

      return posts;
    } catch (error) {
      console.log({ error });
    }
  };

  const getPosts = async () => {
    if (tab.id === 0) {
      if (!loadingContentMyPosts && contentMyPosts?.contentEntities) {
        const contentPosts = await getContentPosts(
          contentMyPosts?.contentEntities.map((content: any) => content.hash)
        );
        setMyPosts(contentPosts);
      }
    } else if (tab.id === 1) {
      if (
        !loadinContentPurchasedPosts &&
        contentPurchasedPosts?.userPostEntities
      ) {
        const contentPosts = await getContentPosts(
          contentPurchasedPosts?.userPostEntities.map(
            (content: any) => content.content
          )
        );
        setPurchasedPosts(contentPosts);
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, [tab, contentMyPosts, contentPurchasedPosts]);

  return {
    tab,
    TABS,
    username,
    myPosts,
    purchasedPosts,
    loadingContentMyPosts,
    loadinContentPurchasedPosts,
    onChangeTab,
    navigateToEditProfile,
    onEditProfile,
    onChangeUsername,
    getPosts,
  };
};

export default useProfile;
