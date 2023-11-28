import { Box, Typography, Avatar } from "@mui/material";
import CustomButton from "src/presentation/components/button";
import Post from "src/presentation/components/post";
import COLOR from "src/presentation/theme/Color";
import {
  Share2Icon,
  FanIcon,
  WalletIcon,
} from "src/presentation/theme/assets/icons";
import { shortenAddress } from "src/common/utils";
import PostLoading from "src/presentation/components/loading/post";
import { useParams } from "react-router-dom";
import { stringAvatar } from "src/common/utils";
import NotFound from "src/presentation/theme/assets/icons/not-found.svg";
import { isEmpty } from "lodash";
import Backwall from "src/presentation/theme/assets/images/background.png";

import useCreatorProfile from "./useCreatorProfile";
import {
  BackgroundProfileImg,
  Container,
  LeftContent,
  RightContent,
  TabMenuContainer,
  TabMenuItem,
  PostsContainer,
} from "./styles";
import { useAppSelector } from "src/data/redux/Hooks";

const CreatorProfile = () => {
  const {
    tab,
    TABS,
    purchasedPosts,
    unpurchasedPosts,
    freePosts,
    creatorInfo,
    loading,
    onChangeTab,
    setFreePosts,
  } = useCreatorProfile();

  const { id } = useParams();
  const { profile } = useAppSelector((state) => state.auth);

  const renderNoData = () => (
    <Box className="no-data-container">
      <img src={NotFound} alt="not-found" />
      <Typography>No posts</Typography>
    </Box>
  );

  const renderTabMenu = () => (
    <TabMenuContainer>
      {TABS.map((item, index) => (
        <TabMenuItem
          isSelected={tab.id === index}
          onClick={() => onChangeTab(item)}
        >
          <Typography>{item.name}</Typography>
          <Box className="tab-menu__divider" />
        </TabMenuItem>
      ))}
    </TabMenuContainer>
  );

  const renderPurchasedPosts = () => (
    <PostsContainer>
      {loading ? (
        <PostLoading />
      ) : isEmpty(purchasedPosts) ? (
        renderNoData()
      ) : (
        purchasedPosts?.map((post: any) => (
          <Post key={post.contentHash} data={post} />
        ))
      )}
    </PostsContainer>
  );

  const renderUnpurchasedPost = () => (
    <PostsContainer>
      {loading ? (
        <PostLoading />
      ) : isEmpty(unpurchasedPosts) ? (
        renderNoData()
      ) : (
        unpurchasedPosts?.map((post: any) => (
          <Post key={post.contentHash} data={post} />
        ))
      )}
    </PostsContainer>
  );

  const renderFreePosts = () => (
    <PostsContainer>
      {loading ? (
        <PostLoading />
      ) : isEmpty(freePosts) ? (
        renderNoData()
      ) : (
        freePosts?.map((post: any) => (
          <Post key={post.contentHash} data={post} setPosts={setFreePosts} />
        ))
      )}
    </PostsContainer>
  );

  const renderTabContent = () => {
    switch (tab.id) {
      case 0:
        return renderPurchasedPosts();
      case 1:
        return renderUnpurchasedPost();
      case 2:
        return renderFreePosts();
      default:
        return null;
    }
  };

  const renderLeftContent = () => (
    <LeftContent>
      <Box className="user-information-container">
        <Box className="user-information__content">
          {creatorInfo.username && (
            <Typography className="user-information__name">
              {creatorInfo.username} {creatorInfo.loyalFan && <FanIcon />}
            </Typography>
          )}
          <Box className="user-information__content-container flex-center">
            <WalletIcon />
            <Typography className="user-information__content-title">
              {shortenAddress(`0x${id}`)}
            </Typography>
          </Box>
          <Box className="user-information__content-container flex-center">
            <Share2Icon />
            <Typography className="user-information__content-title">
              Number of share: <span> 151825</span>
            </Typography>
          </Box>
        </Box>
        <Typography className="user-information__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Box className="user-information__metrics-container flex-center">
          <Box className="user-information__metrics-item flex-center">
            <Typography className="user-information__metrics-value">
              {profile?.totalUpvote}
            </Typography>
            <Typography className="user-information__metrics-title">
              Upvotes
            </Typography>
          </Box>
          <Box className="user-information__metrics-item flex-center">
            <Typography className="user-information__metrics-value">
              {profile?.totalDownvote}
            </Typography>
            <Typography className="user-information__metrics-title">
              Downvotes
            </Typography>
          </Box>
          <Box className="user-information__metrics-item flex-center">
            <Typography className="user-information__metrics-value">
              {profile?.totalPost}
            </Typography>
            <Typography className="user-information__metrics-title">
              Posts
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="user-information__button">
        <CustomButton title="Subscribe" backgroundColor={COLOR.linear} />
      </Box>
    </LeftContent>
  );

  const renderRightContent = () => (
    <RightContent>
      {renderTabMenu()}
      {renderTabContent()}
    </RightContent>
  );

  const renderContent = () => (
    <Box className="profile__content-container">
      {renderLeftContent()}
      {renderRightContent()}
    </Box>
  );

  return (
    <Container>
      <BackgroundProfileImg>
        <Box
          className="profile__cover-container"
          style={{
            backgroundImage: `url(${creatorInfo?.coverUrl || Backwall})`,
          }}
        />
        <Box className="profile__avatar-container">
          {creatorInfo.avatarUrl ? (
            <img src={creatorInfo.avatarUrl} alt="avatar" />
          ) : (
            creatorInfo.username && (
              <Avatar {...stringAvatar(creatorInfo.username)} />
            )
          )}
        </Box>
      </BackgroundProfileImg>

      {renderContent()}
    </Container>
  );
};

export default CreatorProfile;
