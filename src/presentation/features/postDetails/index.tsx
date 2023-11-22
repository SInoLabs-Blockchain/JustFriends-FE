import { Box } from "@mui/material";
import Menu from "src/presentation/components/layout/menu";
import Post from "src/presentation/components/post";
import TopAuthor from "../home/TopAuthor";
import { Container } from "./styles";
import usePostDetails from "./usePostDetails";
import PostLoading from "src/presentation/components/loading/post";

const PostDetails = () => {
  const { topCreators, post, loading } = usePostDetails();

  return (
    <Container>
      <Menu
        isFreePosts={false}
        handleSwitchZone={null}
        setIsTrendingPosts={null}
      />
      <Box display={"flex"} flexDirection={"column"} width={"50%"} gap={"24px"}>
        {loading ? <PostLoading /> : <Post data={post} loading={loading} />}
      </Box>
      <TopAuthor data={topCreators} loading={loading} />
    </Container>
  );
};

export default PostDetails;
