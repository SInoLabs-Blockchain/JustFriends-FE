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
    editor,
    posts,
    openModal,
    loading,
    isFreePosts,
    option,
    openOptionSelect,
    basePrice,
    topCreators,
    isTrendingPosts,
    trendingPosts,
    navigateToProfile,
    navigateToCreatorProfile,
    copyAddress,
    open,
    handleToggleModal,
    setPosts,
    onToggleSelect,
    onSelectMenu,
    setBasePrice,
    handleSharePost,
    handleSwitchZone,
    setIsTrendingPosts,
    setEditor,
  } = useHome();

  const renderPostSection = () => (
    <PostsContainer>
      <PostInput onToggleModal={handleToggleModal} />
      {loading ? (
        <>
          <PostLoading />
          <PostLoading />
        </>
      ) : isTrendingPosts ? (
        trendingPosts.map((post: any) => {
          if (!post) return null;
          if (isFreePosts === post.isPaid) return null;
          return (
            <Post
              key={post.contentHash}
              data={post}
              open={open}
              isFreePosts={isFreePosts}
              handleToggleModal={handleToggleModal}
            />
          );
        })
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
        editorRef={editor}
        loading={loading}
        open={openModal}
        onToggleModal={handleToggleModal}
        option={option}
        openOptionSelect={openOptionSelect}
        basePrice={basePrice}
        onToggleSelect={onToggleSelect}
        onSelectMenu={onSelectMenu}
        setBasePrice={setBasePrice}
        handleSharePost={handleSharePost}
        setEditor={setEditor}
      />
    </HomeContainer>
  );
};

export default Home;
