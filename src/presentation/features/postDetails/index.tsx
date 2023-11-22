import { Box } from "@mui/material";
import Menu from "src/presentation/components/layout/menu";
import Post from "src/presentation/components/post";
import TopAuthor from "../home/TopAuthor";
import { Container } from "./styles";
import usePostDetails from "./usePostDetails";
import useHome from "../home/useHome";

const data = {
  creator: {
    name: "Donald Trump",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png",
  },
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  upvote: 125,
  downvote: 18,
  holder: 312,
};

const PostDetails = () => {
  const {} = usePostDetails();
  const { isFreePosts, setIsFreePosts, setIsTrendingPosts } = useHome();

  return (
    <Container>
      <Menu
        isFreePosts={isFreePosts}
        setIsFreePosts={setIsFreePosts}
        setIsTrendingPosts={setIsTrendingPosts}
      />

      <Box display={"flex"} flexDirection={"column"} width={"50%"} gap={"24px"}>
        <Post data={data} />
      </Box>
      <TopAuthor />
    </Container>
  );
};

export default PostDetails;
