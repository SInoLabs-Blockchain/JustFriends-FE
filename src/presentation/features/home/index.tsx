import CircularProgress from "@mui/material/CircularProgress";
import Menu from "src/presentation/components/layout/menu";
import Post from "src/presentation/components/post";
import ModalCreatePost from "./components/ModalCreatePost";
import PostInput from "./PostInput";
import TopAuthor from "./TopAuthor";
import { HomeContainer, PostsContainer, LoadingWrapper } from "./styles";
import useHome from "./useHome";

const Home = () => {
  const { posts, openModal, loading, isFreePosts, setIsFreePosts, handleToggleModal, handleRemoveText } = useHome();

  const renderPostSection = () => (
    <PostsContainer>
      <PostInput onToggleModal={handleToggleModal} />
      {loading ? (
        <LoadingWrapper>
          <CircularProgress size={30} thickness={5} />
        </LoadingWrapper>
      ) : (
        posts.map((post: any) => <Post key={post.contentHash} data={post} />)
      )}
    </PostsContainer>
  );

  return (
    <HomeContainer>
      <Menu isFreePosts={isFreePosts} setIsFreePosts={setIsFreePosts} />
      {renderPostSection()}
      <TopAuthor />
      <ModalCreatePost
        open={openModal}
        onToggleModal={handleToggleModal}
        onRemoveText={handleRemoveText}
      />
    </HomeContainer>
  );
};

export default Home;
