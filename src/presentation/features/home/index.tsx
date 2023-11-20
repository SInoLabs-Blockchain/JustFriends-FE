import Menu from "src/presentation/components/layout/menu";
import Post from "src/presentation/components/post";
import ModalCreatePost from "./components/ModalCreatePost";
import PostInput from "./PostInput";
import TopAuthor from "./TopAuthor";
import { HomeContainer, PostsContainer } from "./styles";
import useHome from "./useHome";
import Loading from "src/presentation/components/loading/general";

const Home = () => {
  const {
    posts,
    openModal,
    loading,
    isFreePosts,
    setIsFreePosts,
    handleToggleModal,
    handleRemoveText,
    setPosts,
  } = useHome();

  const renderPostSection = () => (
    <PostsContainer>
      <PostInput onToggleModal={handleToggleModal} />
      {loading ? (
        <Loading size={30} thickness={5} />
      ) : (
        posts.map((post: any) => (
          <Post key={post.contentHash} data={post} setPosts={setPosts} />
        ))
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
