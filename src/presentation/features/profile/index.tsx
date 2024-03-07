import { Box, Typography, Avatar } from "@mui/material";
import CustomButton from "src/presentation/components/button";
import COLOR from "src/presentation/theme/Color";
import { DollarIcon, EducationIcon } from "src/presentation/theme/assets/icons";
import Post from "src/presentation/components/post";
import PostLoading from "src/presentation/components/loading/post";
import { useAppSelector } from "src/data/redux/Hooks";
import { stringAvatar } from "src/common/utils";
import NotFound from "src/presentation/theme/assets/icons/not-found.svg";
import { isEmpty } from "lodash";
import Backwall from "src/presentation/theme/assets/images/background.png";

import useProfile from "./useProfile";
import Revenue from "./revenue";
import {
  BackgroundProfileImg,
  Container,
  LeftContent,
  RightContent,
  TabMenuContainer,
  TabMenuItem,
  PostsContainer,
} from "./styles";

const Profile = () => {
  const {
    tab,
    TABS,
    myPosts,
    purchasedPosts,
    loading,
    creditScore,
    onChangeTab,
    navigateToEditProfile,
  } = useProfile();

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

  const renderMyPosts = () => (
    <PostsContainer>
      {loading ? (
        <PostLoading />
      ) : isEmpty(myPosts) ? (
        renderNoData()
      ) : (
        myPosts?.map((post: any) => <Post key={post.contentHash} data={post} />)
      )}
    </PostsContainer>
  );

  const renderPurchasedPost = () => (
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

  const renderTabContent = () => {
    switch (tab.id) {
      case 0:
        return renderMyPosts();
      case 1:
        return renderPurchasedPost();
      case 2:
        return <Revenue />;
      default:
        return null;
    }
  };

  const renderLeftContent = () => (
    <LeftContent>
      <Box className="user-information-container">
        <Box className="user-information__content">
          <Typography className="user-information__name">
            {profile?.username}
          </Typography>
          {creditScore && (
            <Box className="user-information__content-container flex-center">
              <EducationIcon />
              <Typography className="user-information__content-title">
                Credit score: <span>{creditScore}</span>
              </Typography>
            </Box>
          )}
          <Box className="user-information__content-container flex-center">
            <DollarIcon />
            <Typography className="user-information__content-title">
              Total earn: <span>0 AVAX</span>
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
              {myPosts?.length || 0}
            </Typography>
            <Typography className="user-information__metrics-title">
              Posts
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="user-information__button">
        <CustomButton
          title="Edit Profile"
          backgroundColor={COLOR.linear}
          onClick={navigateToEditProfile}
        />
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
            backgroundImage: `url(${profile?.coverUrl || Backwall})`,
          }}
        />
        <Box className="profile__avatar-container">
          {profile?.avatarUrl ? (
            <img src={profile?.avatarUrl} alt="avatar" />
          ) : (
            <Avatar {...stringAvatar(profile?.username)} />
          )}
        </Box>
      </BackgroundProfileImg>

      {renderContent()}
    </Container>
  );
};

export default Profile;
