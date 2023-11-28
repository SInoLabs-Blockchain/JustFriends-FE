import { Avatar, Box, Skeleton, Tooltip, Typography } from "@mui/material";
import { shortenAddress, stringAvatar } from "src/common/utils";
import { WalletIcon } from "src/presentation/theme/assets/icons";
import { ProfileContainer } from "./styles";
import { useAppSelector } from "src/data/redux/Hooks";

const ProfileCard = ({
  navigateToProfile,
  copyAddress,
  isFullSize
}: any) => {
  const { profile } = useAppSelector((state) => state.auth);

  if (profile?.loading) {
    return (
      <ProfileContainer>
        <Skeleton variant="rectangular" width={120} height={120} />
        <Box className="profile__info">
          <Skeleton variant="rectangular" width={160} height={18} />
          <Box className="profile__card-address">
            <Skeleton variant="rectangular" width={160} height={18} />
          </Box>
          <Box className="profile__statistic" sx={{ marginTop: "16px" }}>
            <Box className="profile__statistic-item">
              <Skeleton variant="rectangular" width={24} height={18} />
              <Typography className="profile__card-label">Upvotes</Typography>
            </Box>
            <Box className="profile__statistic-item">
              <Skeleton variant="rectangular" width={24} height={18} />
              <Typography className="profile__card-label">Downvotes</Typography>
            </Box>
            <Box className="profile__statistic-item">
              <Skeleton variant="rectangular" width={24} height={18} />
              <Typography className="profile__card-label">Posts</Typography>
            </Box>
          </Box>
        </Box>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer isFullSize={isFullSize}>
      {profile?.avatarUrl ? (
        <img
          src={profile?.avatarUrl}
          alt="avatar"
          className="profile__card-avatar"
          onClick={navigateToProfile}
        />
      ) : (
        <Avatar
          {...stringAvatar(profile?.username)}
          onClick={navigateToProfile}
        />
      )}
      <Box className="profile__info">
        <Typography className="profile__card-name" onClick={navigateToProfile}>
          {profile?.username}
        </Typography>
        <Box className="profile__card-address">
          <Tooltip title="Copy to clipboard">
            <WalletIcon onClick={copyAddress} />
          </Tooltip>
          <Typography>
            {shortenAddress(profile?.walletAddress || null)}
          </Typography>
        </Box>
      </Box>
      <Box className="profile__statistic">
        <Box className="profile__statistic-item">
          <Typography className="profile__card-value">
            {profile?.totalUpvote}
          </Typography>
          <Typography className="profile__card-label">Upvotes</Typography>
        </Box>
        <Box className="profile__statistic-item">
          <Typography className="profile__card-value">
            {profile?.totalDownvote}
          </Typography>
          <Typography className="profile__card-label">Downvotes</Typography>
        </Box>
        <Box className="profile__statistic-item">
          <Typography className="profile__card-value">
            {profile?.totalPost}
          </Typography>
          <Typography className="profile__card-label">Posts</Typography>
        </Box>
      </Box>
    </ProfileContainer>
  );
};

export default ProfileCard;
