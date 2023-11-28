import { Avatar, Box, TextField, Typography, MenuItem } from "@mui/material";
import CustomButton from "src/presentation/components/button";
import COLOR from "src/presentation/theme/Color";
import Backwall from "src/presentation/theme/assets/images/background.png";
import { InfoIcon, UploadIcon } from "src/presentation/theme/assets/icons";
import { stringAvatar } from "src/common/utils";
import { useAppSelector } from "src/data/redux/Hooks";
import { useState } from "react";

import useProfile from "../useProfile";
import { Container, StyledMenu } from "./styles";

const EditProfile = () => {
  const {
    username,
    avatarUrl,
    coverUrl,
    onChangeUsername,
    onEditProfile,
    onChangeAvatar,
    onChangeCover,
  } = useProfile();

  const { profile } = useAppSelector((state) => state.auth);

  const [avatarAnchorEl, setAvatarAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openInputAvatar = Boolean(avatarAnchorEl);

  const [coverAnchorEl, setCoverAnchorEl] = useState<null | HTMLElement>(null);
  const openInputCover = Boolean(coverAnchorEl);

  const handleClickAvatar = (event: any) => {
    setAvatarAnchorEl(event.currentTarget);
  };
  const handleCloseInputAvatar = () => {
    setAvatarAnchorEl(null);
  };

  const handleClickCover = (event: any) => {
    setCoverAnchorEl(event.currentTarget);
  };
  const handleCloseInputCover = () => {
    setCoverAnchorEl(null);
  };

  const renderContent = () => (
    <Box className="edit-profile-container">
      <Typography className="edit-profile__title">Edit Profile</Typography>
      <Box className="user-information-container">
        <Box className="user-information__left-content">
          <Box className="user-information__avatar-container">
            <Typography className="user-information____title flex-center">
              Profile Image <InfoIcon />
            </Typography>
            {avatarUrl ? (
              <Box
                className="user-information__avatar"
                sx={{
                  backgroundImage: `url(${avatarUrl})`,
                  cursor: "pointer",
                }}
                onClick={handleClickAvatar}
              />
            ) : (
              <Avatar
                {...stringAvatar(profile?.username)}
                onClick={handleClickAvatar}
              />
            )}
            <StyledMenu
              id="avatar"
              anchorEl={avatarAnchorEl}
              open={openInputAvatar}
              onClose={handleCloseInputAvatar}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <TextField
                  value={avatarUrl}
                  placeholder="Enter your url"
                  onChange={onChangeAvatar}
                />
              </MenuItem>
            </StyledMenu>
          </Box>
          <Box className="user-information__backwall-container">
            <Typography className="user-information____title flex-center">
              Backwall <InfoIcon />
            </Typography>
            <Box
              className="user-information__backwall"
              sx={{
                backgroundImage: `url(${coverUrl || Backwall})`,
              }}
            >
              <UploadIcon onClick={handleClickCover} />
            </Box>
          </Box>
          <StyledMenu
            id="cover"
            anchorEl={coverAnchorEl}
            open={openInputCover}
            onClose={handleCloseInputCover}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>
              <TextField
                value={coverUrl}
                placeholder="Enter your url"
                onChange={onChangeCover}
              />
            </MenuItem>
          </StyledMenu>
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
