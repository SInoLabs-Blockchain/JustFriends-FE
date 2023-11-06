import { Box, Tooltip, Typography } from "@mui/material";
import { shortenAddress } from "src/common/utils";
import { WalletIcon } from "src/presentation/theme/assets/icons";
import { ProfileContainer } from "./styles";
import useHome from "./useHome";
import { useAppSelector } from "src/data/redux/Hooks";

const ProfileCard = () => {
  const { copyAddress } = useHome();
  const { profile } = useAppSelector((state) => state.auth);

  const data = {
    name: "Donald J.Trump",
    address: "0x0bc68d7a06259006ae4cb3B8eFF737a46bF5912e",
    following: 12867,
    followers: 123,
    posts: 134,
  };

  return (
    <ProfileContainer>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
        alt="avatar"
        className="profile__card-avatar"
      />
      <Box className="profile__info">
        <Typography className="profile__card-name">
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
            {data.following}
          </Typography>
          <Typography className="profile__card-label">Following</Typography>
        </Box>
        <Box className="profile__statistic-item">
          <Typography className="profile__card-value">
            {data.followers}
          </Typography>
          <Typography className="profile__card-label">Followers</Typography>
        </Box>
        <Box className="profile__statistic-item">
          <Typography className="profile__card-value">{data.posts}</Typography>
          <Typography className="profile__card-label">Posts</Typography>
        </Box>
      </Box>
    </ProfileContainer>
  );
};

export default ProfileCard;
