import { Avatar, Box, IconButton, Skeleton, Typography } from "@mui/material";
import {
  AttachIcon,
  PhotoIcon,
  TagIcon,
} from "src/presentation/theme/assets/icons";
import { PostInputContainer } from "./styles";
import { useAppSelector } from "src/data/redux/Hooks";
import { stringAvatar } from "src/common/utils";

interface IProps {
  onToggleModal: () => void;
}

const PostInput = (props: IProps) => {
  const { onToggleModal } = props;
  const { accessToken, profile } = useAppSelector((state) => state.auth);

  const renderAvatar = () =>
    profile?.avatarUrl ? (
      <img src={profile?.avatarUrl} alt="avatar" />
    ) : (
      <Avatar {...stringAvatar(profile?.username)} />
    );

  return (
    <PostInputContainer>
      <Box className="post__input-main">
        {profile?.loading ? (
          <Skeleton variant="rectangular" width={"44px"} height={"44px"} />
        ) : (
          renderAvatar()
        )}
        <Typography onClick={onToggleModal}>
          {accessToken
            ? "What's on your mind?"
            : "Connect to share your content"}
        </Typography>
      </Box>
      <Box className="post__input-extra">
        <IconButton>
          <PhotoIcon />
          <Typography className="post__input-extra-text">Image</Typography>
        </IconButton>
        <IconButton>
          <AttachIcon />
          <Typography className="post__input-extra-text">Attachment</Typography>
        </IconButton>
        <IconButton>
          <TagIcon />
          <Typography className="post__input-extra-text">Hashtag</Typography>
        </IconButton>
      </Box>
    </PostInputContainer>
  );
};

export default PostInput;
