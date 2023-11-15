import { useState, useEffect } from "react";
import { GET_FREE_POSTS, GET_PAID_POSTS } from "src/data/graphql/queries";
import { useLazyQuery } from "@apollo/client";

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

  const walletAddress = "0x0bc68d7a06259006ae4cb3b8eff737a46bf5912e";
  const userAddress = "0xc97db9086e854f727db2b2c1462401eaf1eb9028";

  const [getContentFreePosts, { data: contentFreePosts }] =
    useLazyQuery(GET_FREE_POSTS);

  const [getContentPaidPosts, { data: contentPaidPosts }] =
    useLazyQuery(GET_PAID_POSTS);

  const getPosts = async () => {
    if (tab.id === 0) {
      getContentPaidPosts({
        variables: {
          creator: walletAddress.toLocaleLowerCase(),
          account: userAddress,
        },
      });
      const posts = contentPaidPosts?.contentEntities.filter((paidPost: any) =>
        contentPaidPosts?.userPostEntities.some(
          (purchasedPost: any) => paidPost.hash === purchasedPost.hash
        )
      );
      setPurchasedPosts(posts);
    } else if (tab.id === 1) {
      getContentPaidPosts({
        variables: {
          creator: walletAddress.toLocaleLowerCase(),
          account: userAddress,
        },
      });
      const posts = contentPaidPosts?.contentEntities.filter(
        (paidPost: any) =>
          !contentPaidPosts?.userPostEntities.some(
            (purchasedPost: any) => paidPost.hash === purchasedPost.hash
          )
      );
      setUnpurchasedPosts(posts);
    } else if (tab.id === 2) {
      getContentFreePosts({
        variables: { creator: walletAddress.toLocaleLowerCase() },
      });
      setFreePosts(contentFreePosts?.contentEntities);
    }
  };

  const onChangeTab = (data: TabState) => {
    setTab(data);
  };

  useEffect(() => {
    getPosts();
  }, [tab]);

  return {
    tab,
    TABS,
    purchasedPosts,
    unpurchasedPosts,
    freePosts,
    onChangeTab,
    getPosts,
  };
};

export default useCreatorProfile;
