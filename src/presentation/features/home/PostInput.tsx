import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import CustomButton from "src/presentation/components/button";
import ImageIcon from "src/presentation/assets/icons/photo.svg";
import AttachIcon from "src/presentation/assets/icons/attach.svg";
import TagIcon from "src/presentation/assets/icons/tag.svg";
import { PostInputContainer } from "./styles";

const PostInput = () => {
  return (
    <PostInputContainer>
      <Box className="post__input-main">
        <Box>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
            }
            alt="avatar"
          />
          <Typography>What's on your mind?</Typography>
        </Box>
        <CustomButton title={"Share Post"} />
      </Box>
      <Box className="post__input-extra">
        <IconButton>
          <img src={ImageIcon} alt="image" />
          <Typography>Image</Typography>
        </IconButton>
        <IconButton>
          <img src={AttachIcon} alt="attach" />
          <Typography>Attachment</Typography>
        </IconButton>
        <IconButton>
          <img src={TagIcon} alt="tag" />
          <Typography>Hashtag</Typography>
        </IconButton>
      </Box>
    </PostInputContainer>
  );
};

export default PostInput;
