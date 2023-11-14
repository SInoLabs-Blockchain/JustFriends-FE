import Menu from "src/presentation/components/layout/menu";
import Post from "src/presentation/components/post";
import ModalCreatePost from "./components/ModalCreatePost";
import PostInput from "./PostInput";
import TopAuthor from "./TopAuthor";
import { HomeContainer, PostsContainer } from "./styles";
import useHome from "./useHome";

const Home = () => {
  const { posts, openModal, handleToggleModal, handleRemoveText } = useHome();

  return (
    <HomeContainer>
      <Menu />
      <PostsContainer>
        <PostInput onToggleModal={handleToggleModal} />
        {posts?.map((post: any) => (
          <Post key={post.contentHash} data={post} />
        ))}
      </PostsContainer>
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
