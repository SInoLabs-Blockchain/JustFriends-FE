import Menu from "src/presentation/components/layout/menu";
import Post from "src/presentation/components/post";
import ModalCreatePost from "./components/ModalCreatePost";
import PostInput from "./PostInput";
import TopAuthor from "./TopAuthor";
import { HomeContainer, PostsContainer } from "./styles";
import useHome from "./useHome";
import PostLoading from "src/presentation/components/loading/post";

const Home = () => {
  const {
    posts,
    openModal,
    loading,
    isFreePosts,
    option,
    openOptionSelect,
    textareaValue,
    textareaHeight,
    basePrice,
    topCreators,
    navigateToProfile,
    navigateToCreatorProfile,
    copyAddress,
    open,
    handleToggleModal,
    handleRemoveText,
    setPosts,
    onToggleSelect,
    onSelectMenu,
    handleTextareaChange,
    setBasePrice,
    handleSharePost,
    handleSwitchZone,
    setIsTrendingPosts,
  } = useHome();

  const renderPostSection = () => (
    <PostsContainer>
      <PostInput onToggleModal={handleToggleModal} />
      {loading ? (
        <>
          <PostLoading />
          <PostLoading />
        </>
      ) : (
        posts.map((post: any) => {
          if (!post) return null;
          return (
            <Post
              key={post.contentHash}
              data={post}
              open={open}
              isFreePosts={isFreePosts}
              handleToggleModal={handleToggleModal}
              handleRemoveText={handleRemoveText}
              setPosts={setPosts}
            />
          );
        })
      )}
    </PostsContainer>
  );

  return (
    <HomeContainer>
      <Menu
        isFreePosts={isFreePosts}
        handleSwitchZone={handleSwitchZone}
        navigateToProfile={navigateToProfile}
        copyAddress={copyAddress}
        setIsTrendingPosts={setIsTrendingPosts}
      />
      {renderPostSection()}
      <TopAuthor
        data={topCreators}
        viewProfile={navigateToCreatorProfile}
        loading={loading}
      />
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
