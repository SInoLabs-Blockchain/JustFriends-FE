import { Box } from "@mui/material";
import Menu from "src/presentation/components/layout/menu";
import Post from "src/presentation/components/post";
import PostInput from "./PostInput";
import TopAuthor from "./TopAuthor";
import { HomeContainer, PostsContainer } from "./styles";
import useHome from "./useHome";
import ModalCreatePost from "./components/ModalCreatePost";

const Home = () => {
  const { openModal, handleToggleModal } = useHome();

  const data = {
    creator: {
      name: "Donald Trump",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    upvote: 125,
    downvote: 18,
    holder: 312,
  };

  return (
    <HomeContainer>
      <Menu />
      <PostsContainer>
        <PostInput onToggleModal={handleToggleModal} />
        <Post data={data} />
        <Post data={data} />
        <Post data={data} />
        <Post data={data} />
      </PostsContainer>
      <TopAuthor />
      <ModalCreatePost open={openModal} onToggleModal={handleToggleModal} />
    </HomeContainer>
  );
};

export default Home;
