import { Avatar, Box, TextField, Typography } from "@mui/material";
import CustomButton from "src/presentation/components/button";
import COLOR from "src/presentation/theme/Color";
import Backwall from "src/presentation/theme/assets/images/background.png";
import { InfoIcon, UploadIcon } from "src/presentation/theme/assets/icons";
import { stringAvatar } from "src/common/utils";
import { useAppSelector } from "src/data/redux/Hooks";

import useProfile from "../useProfile";
import { Container } from "./styles";

const EditProfile = () => {
  const { username, onChangeUsername, onEditProfile } = useProfile();

  const { profile } = useAppSelector((state) => state.auth);

  const renderContent = () => (
    <Box className="edit-profile-container">
      <Typography className="edit-profile__title">Edit Profile</Typography>
      <Box className="user-information-container">
        <Box className="user-information__left-content">
          <Box className="user-information__avatar-container">
            <Typography className="user-information____title flex-center">
              Profile Image <InfoIcon />
            </Typography>
            {profile?.avatarUrl ? (
              <Box
                className="user-information__avatar"
                sx={{
                  backgroundImage: profile?.avatarUrl,
                }}
              />
            ) : (
              <Avatar {...stringAvatar(profile?.username)} />
            )}
          </Box>
          <Box className="user-information__backwall-container">
            <Typography className="user-information____title flex-center">
              Backwall <InfoIcon />
            </Typography>
            <Box
              className="user-information__backwall"
              sx={{
                backgroundImage: `url(${Backwall})`,
              }}
            >
              <UploadIcon />
            </Box>
          </Box>
        </Box>
        <Box className="user-information__right-content">
          <Box className="user-information__name">
            <Typography className="user-information____title">Name</Typography>
            <TextField
              value={username}
              placeholder="Enter your name"
              onChange={onChangeUsername}
            />
          </Box>
          <Box className="user-information__description">
            <Typography className="user-information____title">
              Description
            </Typography>
            <TextField multiline rows={6} placeholder="Enter description..." />
          </Box>
          <CustomButton
            title="Save"
            backgroundColor={COLOR.linear}
            onClick={onEditProfile}
          />
        </Box>
      </Box>
    </Box>
  );

  return <Container>{renderContent()}</Container>;
};

export default EditProfile;
