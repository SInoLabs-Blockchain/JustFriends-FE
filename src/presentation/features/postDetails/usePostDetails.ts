import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_POST_DETAIL_DATA } from "src/data/graphql/queries";
import { useAppSelector } from "src/data/redux/Hooks";
import { HomeRepository } from "src/data/repositories/HomeRepository";
import { ProfileRepository } from "src/data/repositories/ProfileRepository";
import { Profile } from "src/domain/models/auth";
import { Post } from "src/domain/models/home/Post";
import { readContract } from "@wagmi/core";
import justFriendAbi from "src/common/abis/JustFriends.json";
import { ROUTE } from "src/common/constants/route";
import { parseEther } from "viem";

const usePostDetails = () => {
  let { id } = useParams();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [post, setPost] = useState<Post | null>(null);
  const [topCreators, setTopCreators] = useState<Array<Profile> | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const profileRepository = ProfileRepository.create();
  const homeRepository = HomeRepository.create();
  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    try {
      if (data) {
        const { creatorEntities, contentEntities } = data;
        const [detailPost, creatorDetails, prices]: [Post[], Profile[], any] =
          await Promise.all([
            homeRepository.getPosts({
              contentHashes: [id],
              accessToken,
            }),
            profileRepository.getUsers(
              accessToken,
              creatorEntities.map((creator: any) => creator.address)
            ),
            readContract({
              address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
              abi: justFriendAbi.abi,
              functionName: "getSellPrice",
              args: [[id], [1]],
            }),
          ]);

        setPost({
          ...detailPost[0],
          ...contentEntities[0],
          isOwner: true,
          price: prices[0],
          oldPrice: parseEther("0.02"),
          isPaid: true,
        });

        const validTopCreatorsList = creatorDetails
          ?.map((creator: any) => {
            const detailCreator = creatorEntities.find(
              (item: any) =>
                item.address.toLowerCase() ===
                creator.walletAddress.toLowerCase()
            );
            if (detailCreator) {
              return { ...creator, creditScore: detailCreator.creditScore };
            }
            return null;
          })
          ?.filter((item: any) => item !== null);
        setTopCreators(validTopCreatorsList);
      }
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  const navigateToProfile = () => {
    navigate(ROUTE.PROFILE);
  };

  const { data } = useQuery(GET_POST_DETAIL_DATA, {
    variables: {
      contentHash: id,
    },
    skip: !accessToken || !id,
    onCompleted: getData,
  });

  return { topCreators, post, loading, navigateToProfile };
};

export default usePostDetails;
