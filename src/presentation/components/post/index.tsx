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
import usePost from "./usePost";
import { VOTE } from "src/common/constants";

interface PropTypes {
  data: any;
}

const Post = ({ data }: PropTypes) => {
  const isConnectedWallet = true;
  const isFreeZone = false;
  const { handleVote, handleBuyAccess } = usePost();

  const renderRightContent = () => {
    if (isConnectedWallet) {
      return (
        <PriceContainer>
          <Typography>100 KLAY</Typography>
        </PriceContainer>
      );
    }
    return (
      <IconButton>
        <MoreIcon />
      </IconButton>
    );
  };

  const renderCommentAction = () => {
    if (isFreeZone)
      return (
        <IconButton>
          <CommentIcon />
          <Typography className="post__interactions-votes">
            {data.downvote} downvotes
          </Typography>
        </IconButton>
      );
  };

  const renderPaidPostActions = () => {
    if (!isFreeZone) {
      return (
        <Box className="post__interactions-container">
          <Typography className="post__interactions-holders">
            {data.holder} holders
          </Typography>
          <CustomButton
            sm
            title="Buy Share"
            variant={"contained"}
            onClick={handleBuyAccess}
            startIcon={<ShareIcon />}
          />
        </Box>
      );
    }
  };

  return (
    <PostSection>
      <PostContainer>
        <CardHeader
          avatar={
            <Avatar>
              <img src={data.creator.avatar} alt="avatar" />
            </Avatar>
          }
          title={data.creator.name}
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
          <Box>
            <IconButton
              onClick={() =>
                handleVote({
                  contentHash: data.contentHash,
                  voteType: VOTE.DOWNVOTE,
                  periodTimestamp: 10000000000,
                })
              }
            >
              <UpvoteIcon />
              <Typography className="post__interactions-votes">
                {data.upvote} upvotes
              </Typography>
            </IconButton>
            <IconButton
              onClick={() =>
                handleVote({
                  contentHash: data.contentHash,
                  voteType: VOTE.DOWNVOTE,
                  periodTimestamp: 10000000000,
                })
              }
            >
              <DownvoteIcon />
              <Typography className="post__interactions-votes">
                {data.downvote} downvotes
              </Typography>
            </IconButton>
            {renderCommentAction()}
          </Box>
          {renderPaidPostActions()}
        </CardActions>
      </PostContainer>
    </PostSection>
  );
};

export default Post;
