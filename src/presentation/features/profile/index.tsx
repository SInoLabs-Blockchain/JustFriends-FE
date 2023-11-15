import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "src/presentation/components/button";
import COLOR from "src/presentation/theme/Color";
import { DollarIcon, EducationIcon } from "src/presentation/theme/assets/icons";
import Post from "src/presentation/components/post";
import { useQuery } from "@apollo/client";
import { GET_MY_POSTS, GET_PURCHASED_POSTS } from "src/data/graphql/queries";
import { useAppSelector } from "src/data/redux/Hooks";

import useProfile from "./useProfile";
import {
  BackgroundProfileImg,
  Container,
  LeftContent,
  RightContent,
  TabMenuContainer,
  TabMenuItem,
  PostsContainer,
} from "./styles";

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

const Profile = () => {
  const { profile } = useAppSelector((state) => state.auth);
  const { tab, TABS, onChangeTab, navigateToEditProfile, getPosts } =
    useProfile();

  const { data: contentMyPosts } = useQuery(GET_MY_POSTS, {
    variables: { creator: profile?.walletAddress.toLocaleLowerCase() },
  });

  const { data: contentpurchasedPosts } = useQuery(GET_PURCHASED_POSTS, {
    variables: { buyer: profile?.walletAddress.toLocaleLowerCase() },
  });

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
      <Post data={data} />
      <Post data={data} />
      <Post data={data} />
      <Post data={data} />
    </PostsContainer>
  );

  const renderPurchasedPost = () => (
    <PostsContainer>
      <Post data={data} />
      <Post data={data} />
      <Post data={data} />
      <Post data={data} />
    </PostsContainer>
  );

  const renderTabContent = () => {
    switch (tab.id) {
      case 0:
        return renderMyPosts();
      case 1:
        return renderPurchasedPost();
      case 2:
        return <></>;
      default:
        return null;
    }
  };

  const renderLeftContent = () => (
    <LeftContent>
      <Box className="user-information-container">
        <Box className="user-information__content">
          <Typography className="user-information__name">Jerry Kane</Typography>
          <Box className="user-information__content-container flex-center">
            <EducationIcon />
            <Typography className="user-information__content-title">
              Credit score: <span>1900</span>
            </Typography>
          </Box>
          <Box className="user-information__content-container flex-center">
            <DollarIcon />
            <Typography className="user-information__content-title">
              Total earn: <span>100 KLAY</span>
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
              11 K
            </Typography>
            <Typography className="user-information__metrics-title">
              Following
            </Typography>
          </Box>
          <Box className="user-information__metrics-item flex-center">
            <Typography className="user-information__metrics-value">
              11 K
            </Typography>
            <Typography className="user-information__metrics-title">
              Follower
            </Typography>
          </Box>
          <Box className="user-information__metrics-item flex-center">
            <Typography className="user-information__metrics-value">
              11
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

  useEffect(() => {
    switch (tab.name) {
      case TABS[0].name:
        getPosts(contentMyPosts);
        break;
      case TABS[1].name:
        getPosts(contentpurchasedPosts);
        break;
      default:
        getPosts(contentMyPosts);
        break;
    }
  }, [tab]);

  return (
    <Container>
      <BackgroundProfileImg>
        <img
          src={require("src/presentation/theme/assets/images/background.png")}
          alt=""
        />
        <Box className="profile__avatar-container">
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
            }
            alt=""
          />
        </Box>
      </BackgroundProfileImg>

      {renderContent()}
    </Container>
  );
};

export default Profile;
