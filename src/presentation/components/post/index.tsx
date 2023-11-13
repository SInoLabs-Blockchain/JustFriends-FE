import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import {
  CommentIcon,
  DownvoteIcon,
  MoreIcon,
  ShareIcon,
  UpvoteIcon,
} from "src/presentation/theme/assets/icons";
import CustomButton from "../button";
import { PostContainer, PostSection, PriceContainer } from "./styles";
import { useAppSelector } from "src/data/redux/Hooks";

interface PropTypes {
  data: any;
}

const Post = ({ data }: PropTypes) => {
  const isConnectedWallet = true;
  const isFreeZone = true;
  const { profile } = useAppSelector((state) => state.auth);

  const renderRightContent = () => {
    if (isConnectedWallet && !isFreeZone) {
      return (
        <PriceContainer>
          <Typography>{Number(data.startedPrice)} KLAY</Typography>
        </PriceContainer>
      );
    }
    return (
      <IconButton>
        <MoreIcon />
      </IconButton>
    );
  };

  const renderFreePostAction = () => {
    if (isFreeZone)
      return (
        <Box>
          <IconButton>
            <UpvoteIcon />
            <Typography className="post__interactions-votes">
              {Number(data.totalUpvote)} upvotes
            </Typography>
          </IconButton>
          <IconButton>
            <DownvoteIcon />
            <Typography className="post__interactions-votes">
              {Number(data.totalDownvote)} downvotes
            </Typography>
          </IconButton>
          <IconButton>
            <CommentIcon />
            <Typography className="post__interactions-votes">
              {Number(data.comments) || 0} comments
            </Typography>
          </IconButton>
        </Box>
      );
  };

  const renderPaidPostActions = () => {
    if (!isFreeZone) {
      return (
        <Box className="post__interactions-container">
          <Typography className="post__interactions-holders">
            {Number(data.totalSupply)} holders
          </Typography>
          <CustomButton
            sm
            title="Buy Share"
            variant={"contained"}
            startIcon={<ShareIcon />}
          />
        </Box>
      );
    }
  };

  if (!data) return null;

  return (
    <PostSection>
      <PostContainer type={isFreeZone}>
        <CardHeader
          avatar={
            <Avatar>
              <img src={profile?.avatarUrl} alt="avatar" />
            </Avatar>
          }
          title={profile?.username}
          subheader="8 hours ago"
          action={renderRightContent()}
        />
        <CardContent>
          <Typography className="content">{data.content}</Typography>
        </CardContent>
        <Box className="separator">
          <hr />
        </Box>
        <CardActions>
          {renderFreePostAction()}
          {renderPaidPostActions()}
        </CardActions>
      </PostContainer>
    </PostSection>
  );
};

export default Post;
