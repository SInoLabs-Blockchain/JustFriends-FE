import { Avatar, Box, Skeleton, Tooltip, Typography } from "@mui/material";
import { shortenAddress, stringAvatar } from "src/common/utils";
import { WalletIcon } from "src/presentation/theme/assets/icons";
import { ProfileContainer } from "./styles";
import { useAppSelector } from "src/data/redux/Hooks";
import Web3 from "web3";

const ProfileCard = ({ navigateToProfile, copyAddress, isFullSize }: any) => {
  const { profile } = useAppSelector((state) => state.auth);

  const address = Web3.utils.toChecksumAddress(profile?.walletAddress || "");

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
        <Tooltip title="Copy to clipboard">
          <Box className="profile__card-address" onClick={copyAddress}>
            <WalletIcon />
            <Typography>{shortenAddress(address || null)}</Typography>
          </Box>
        </Tooltip>
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
