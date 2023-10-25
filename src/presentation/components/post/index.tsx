import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import CustomButton from "../button";
import { PostContainer } from "./styles";
import UpvoteIcon from "src/presentation/assets/icons/upvote.svg";
import DownvoteIcon from "src/presentation/assets/icons/downvote.svg";
import ShareIcon from "src/presentation/assets/icons/share.svg";
import MoreIcon from "src/presentation/assets/icons/more.svg";

interface PropTypes {
  data: any;
  width?: string;
}

const Post = ({ data, width }: PropTypes) => {
  return (
    <Card sx={{ width, height: "fit-content" }}>
      <PostContainer>
        <CardHeader
          avatar={
            <Avatar>
              <img src={data.creator.avatar} alt="avatar" />
            </Avatar>
          }
          title={data.creator.name}
          subheader="September 14, 2016"
          action={
            <IconButton>
              <img src={MoreIcon} alt="more" />
            </IconButton>
          }
        />
        <CardContent>
          <Typography>{data.content}</Typography>
        </CardContent>
        <Box className="separator">
          <hr />
        </Box>
        <CardActions>
          <Box>
            <IconButton>
              <img src={UpvoteIcon} alt={"icons"} />
              <Typography className="post__interactions-votes">
                {data.upvote} upvotes
              </Typography>
            </IconButton>
            <IconButton>
              <img src={DownvoteIcon} alt={"icons"} />
              <Typography className="post__interactions-votes">
                {data.downvote} downvotes
              </Typography>
            </IconButton>
          </Box>
          <Box>
            <Box>
              <Typography className="post__interactions-holders">
                {data.holder} holders
              </Typography>
              <CustomButton
                title="Buy Share"
                variant={"contained"}
                startIcon={<img src={ShareIcon} alt="share" />}
              />
            </Box>
          </Box>
        </CardActions>
      </PostContainer>
    </Card>
  );
};

export default Post;
