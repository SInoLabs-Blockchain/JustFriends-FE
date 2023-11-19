import { Avatar, Box, IconButton, Typography } from "@mui/material";
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
  const { profile } = useAppSelector((state) => state.auth);

  return (
    <PostInputContainer>
      <Box className="post__input-main">
        {profile?.avatarUrl ? (
          <img src={profile?.avatarUrl} alt="avatar" />
        ) : (
          <Avatar {...stringAvatar(profile?.username)} />
        )}
        <Typography onClick={onToggleModal}>What's on your mind?</Typography>
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
