import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
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
import { FREE_POSTS, PAID_POSTS, VOTE_TYPES } from "src/common/constants";
import usePost from "./usePost";
import { formatEther } from "viem";

interface PropTypes {
  data: any;
  open?: any;
  isFreePosts?: boolean;
  handleToggleModal?: any;
  handleRemoveText?: any;
  setPosts?: any;
}

const Post = ({
  data,
  open,
  handleToggleModal,
  handleRemoveText,
  isFreePosts,
  setPosts,
}: PropTypes) => {
  const isConnectedWallet = true;
  const { handleVotePost, isUpvoting, isDownvoting } = usePost({
    open,
    handleToggleModal,
    handleRemoveText,
    setPosts,
  });

  const renderRightContent = () => {
    if (isConnectedWallet && !isFreePosts) {
      return (
        <PriceContainer>
          <Typography>{formatEther(data.startedPrice)} KLAY</Typography>
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
    if (isFreePosts) {
      let upvoteLabel, downvoteLabel;
      const isUpvoted = data?.isVoted && data?.voteType ? true : false;
      const isDownvoted = data?.isVoted && !data?.voteType ? true : false;

      if (data?.isVoted) {
        if (data?.voteType) {
          const otherVoteCount = Number(data.totalUpvote) - 1;
          switch (otherVoteCount) {
            case -1:
              upvoteLabel = `0 upvote`;
              break;
            case 0:
              upvoteLabel = `You upvoted`;
              break;
            default:
              upvoteLabel = `You and ${otherVoteCount} people upvoted`;
              break;
          }
          downvoteLabel = `${Number(data.totalDownvote)} ${
            Number(data.totalDownvote) === 0 ? "downvote" : "downvotes"
          }`;
        } else {
          const otherVoteCount = Number(data.totalDownvote) - 1;
          switch (otherVoteCount) {
            case -1:
              downvoteLabel = `0 downvote`;
              break;
            case 0:
              downvoteLabel = `You downvoted`;
              break;
            default:
              downvoteLabel = `You and ${otherVoteCount} people downvoted`;
              break;
          }
          upvoteLabel = `${Number(data.totalUpvote)} ${
            Number(data.totalUpvote) === 0 ? "upvote" : "upvotes"
          }`;
        }
      } else {
        upvoteLabel = `${Number(data.totalUpvote)} ${
          Number(data.totalUpvote) === 0 ? "upvote" : "upvotes"
        }`;
        downvoteLabel = `${Number(data.totalDownvote)} ${
          Number(data.totalUpvote) === 0 ? "downvote" : "downvotes"
        }`;
      }
      return (
        <Box>
          <IconButton
            className={`post__interactions-button ${
              isUpvoted ? "post__interactions_button-upvoted" : ""
            }`}
            onClick={() =>
              !isUpvoted && handleVotePost(data?.contentHash, VOTE_TYPES.UPVOTE)
            }
          >
            {isUpvoting ? <CircularProgress size={12} /> : <UpvoteIcon />}
            <Typography className="post__interactions-votes">
              {upvoteLabel}
            </Typography>
          </IconButton>
          <IconButton
            className={`post__interactions-button ${
              isDownvoted ? "post__interactions_button-downvoted" : ""
            }`}
            onClick={() =>
              !isDownvoted &&
              handleVotePost(data?.contentHash, VOTE_TYPES.DOWNVOTE)
            }
          >
            {isDownvoting ? <CircularProgress size={12} /> : <DownvoteIcon />}
            <Typography className="post__interactions-votes">
              {downvoteLabel}
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
    }
  };

  const renderPaidPostActions = () => {
    if (!isFreePosts) {
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
      <PostContainer type={isFreePosts}>
        <CardHeader
          avatar={
            data?.user?.avatarUrl ? (
              <img src={data?.user?.avatarUrl} alt="avatar" />
            ) : (
              <Avatar {...stringAvatar(data?.user?.username)} />
            )
          }
          title={data?.user.username}
          subheader={timeAgo(data.createdAt)}
          action={renderRightContent()}
        />
        <CardContent>
          <Typography className="content">
            {data?.type === FREE_POSTS || data?.isOwner
              ? data?.content
              : `${data?.preview}...`}
          </Typography>
          {data?.type === FREE_POSTS ||
          (data?.isOwner && data?.type === PAID_POSTS) ? null : (
            <Typography className="viewmore">View Detail</Typography>
          )}
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
