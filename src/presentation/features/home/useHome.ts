import { useEffect, useState } from "react";
import { FREE_POSTS, PAID_POSTS, POST_OPTIONS } from "src/common/constants";
import { writeContract } from "@wagmi/core";
import JustFriendsABI from "src/common/abis/JustFriends.json";
import { HomeRepository } from "src/data/repositories/HomeRepository";
import { useAppSelector } from "src/data/redux/Hooks";
import { parseEther } from "viem";
import { useWeb3Modal } from "@web3modal/react";
import { ROUTE } from "src/common/constants/route";
import { useNavigate } from "react-router-dom";

import { OptionState } from "./types";

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
  const [posts, setPosts] = useState([]);

  const homeRepository = HomeRepository.create();

  const { accessToken } = useAppSelector((state) => state.auth);

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
        await writeContract({
          address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
          abi: JustFriendsABI,
          functionName: "postContent",
          args: [`0x${contentHash}`, parseEther(option.id ? "0" : "0.01")],
        });
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const navigateToProfile = () => {
    navigate(ROUTE.PROFILE);
  };

  const getListOfPostsByType = async () => {
    const response = await homeRepository.getPosts({
      type: isFreePosts ? FREE_POSTS : PAID_POSTS,
      page: 1,
      limit: 10,
    });
    console.log(response);
  };

  useEffect(() => {
    // getListOfPostsByType()
  }, [isFreePosts]);

  return {
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
  };
};

export default useHome;
