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
import { stringAvatar, timeAgo } from "src/common/utils";
import { VOTE_TYPES } from "src/common/constants";
import usePost from "./usePost";

interface PropTypes {
  data: any;
}

const Post = ({ data }: PropTypes) => {
  const isConnectedWallet = true;
  const isFreeZone = true;
  const { handleVotePost, navigateUserProfile } = usePost();

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
          <IconButton
            className="post__interactions-button"
            onClick={() => handleVotePost(data.contentHash, VOTE_TYPES.UPVOTE)}
          >
            <UpvoteIcon />
            <Typography className="post__interactions-votes">
              {data?.isVoted && data?.voteType === VOTE_TYPES.UPVOTE
                ? `You and ${data.totalUpvote - 1} upvoted`
                : `${Number(data.totalUpvote)} upvotes`}
            </Typography>
          </IconButton>
          <IconButton
            className="post__interactions-button"
            onClick={() =>
              handleVotePost(data.contentHash, VOTE_TYPES.DOWNVOTE)
            }
          >
            <DownvoteIcon />
            <Typography className="post__interactions-votes">
              {data?.isVoted && data?.voteType === VOTE_TYPES.DOWNVOTE
                ? `You and ${data.totalUpvote - 1} downvoted`
                : `${Number(data.totalDownvote)} downvotes`}
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
      <PostContainer type={isFreeZone} voteType={data.voteType}>
        <CardHeader
          avatar={
            data?.user?.avatarUrl ? (
              <img src={data?.user?.avatarUrl} alt="avatar" />
            ) : (
              <Avatar {...stringAvatar(data?.user?.username)} />
            )
          }
          title={
            <Box
              style={{ cursor: "pointer" }}
              onClick={() => navigateUserProfile(data?.user?.walletAddress)}
            >
              {data?.user?.username}
            </Box>
          }
          subheader={timeAgo(data.createdAt)}
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
