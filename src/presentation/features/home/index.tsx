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
    getLoading,
    isFreePosts,
    option,
    openOptionSelect,
    textareaValue,
    textareaHeight,
    basePrice,
    navigateToProfile,
    copyAddress,
    open,
    setIsFreePosts,
    handleToggleModal,
    handleRemoveText,
    setPosts,
    onToggleSelect,
    onSelectMenu,
    handleTextareaChange,
    setBasePrice,
    handleSharePost,
  } = useHome();

  const renderPostSection = () => (
    <PostsContainer>
      <PostInput onToggleModal={handleToggleModal} />
      {getLoading ? (
        <Loading size={30} thickness={5} />
      ) : (
        posts.map((post: any) => (
          <Post
            key={post.contentHash}
            data={post}
            open={open}
            isFreePosts={isFreePosts}
            handleToggleModal={handleToggleModal}
            handleRemoveText={handleRemoveText}
            setPosts={setPosts}
          />
        ))
      )}
    </PostsContainer>
  );

  return (
    <HomeContainer>
      <Menu
        isFreePosts={isFreePosts}
        setIsFreePosts={setIsFreePosts}
        navigateToProfile={navigateToProfile}
        copyAddress={copyAddress}
      />
      {renderPostSection()}
      <TopAuthor />
      <ModalCreatePost
        loading={loading}
        open={openModal}
        onToggleModal={handleToggleModal}
        onRemoveText={handleRemoveText}
        option={option}
        openOptionSelect={openOptionSelect}
        textareaValue={textareaValue}
        textareaHeight={textareaHeight}
        basePrice={basePrice}
        onToggleSelect={onToggleSelect}
        onSelectMenu={onSelectMenu}
        handleTextareaChange={handleTextareaChange}
        setBasePrice={setBasePrice}
        handleSharePost={handleSharePost}
      />
    </HomeContainer>
  );
};

export default Home;
