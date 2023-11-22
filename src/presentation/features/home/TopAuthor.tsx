import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { MoreIcon } from "src/presentation/theme/assets/icons";
import {
  TopAuthorContainer,
  TopAuthorHeaderContainer,
  TopAuthorListContainer,
} from "./styles";
import { stringAvatar } from "src/common/utils";
import CreditScore from "src/presentation/theme/assets/icons/credit-score.svg";
import Loading from "src/presentation/components/loading/general";

const TopAuthor = ({ data, viewProfile, loading }: any) => {
  if (!data) return null;
  return (
    <TopAuthorContainer>
      <TopAuthorHeaderContainer>
        <Typography className="author__list-label">TOP CREATOR</Typography>
        <Typography className="author__list-pagination">
          {data.length}
        </Typography>
      </TopAuthorHeaderContainer>
      {loading ? (
        <TopAuthorListContainer>
          <Loading size={24} thickness={5} />
        </TopAuthorListContainer>
      ) : (
        <TopAuthorListContainer>
          {data.length === 0 ? (
            <Typography className="author__list-empty">
              Connect to see our top creators
            </Typography>
          ) : (
            data?.map((creator: any) => (
              <Box className="author__list-item" key={creator.address}>
                <Box className="author__container">
                  {creator?.avatarUrl ? (
                    <img
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
                      }
                      alt="avatar"
                      className="author__container-avatar"
                    />
                  ) : (
                    <Avatar {...stringAvatar(creator?.username)} />
                  )}
                  <Box className="author__container-info">
                    <Typography
                      className="author__container-name"
                      onClick={() => {
                        viewProfile(creator?.walletAddress.substring(2));
                      }}
                    >
                      {creator?.username || "Creator"}
                    </Typography>
                    <Box className="author__container-upvotes">
                      <Typography>
                        Credit score: {creator?.creditScore}
                      </Typography>
                      <img src={CreditScore} alt="credit" />
                    </Box>
                  </Box>
                </Box>
                <IconButton>
                  <MoreIcon />
                </IconButton>
              </Box>
            ))
          )}
        </TopAuthorListContainer>
      )}
    </TopAuthorContainer>
  );
};

export default TopAuthor;
