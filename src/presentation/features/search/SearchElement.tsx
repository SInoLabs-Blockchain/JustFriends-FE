import React from "react";
import { SearchElementContainer } from "./styles";
import { Avatar, Box, Typography } from "@mui/material";
import WalletIcon from "src/presentation/theme/assets/icons/wallet.svg";
import { shortenAddress, stringAvatar } from "src/common/utils";
import { CustomizedButton } from "src/presentation/components/button/styles";
import useSearch from "./useSearch";

const SearchElement = ({ data }: any) => {
  const { navigateUserProfile } = useSearch();

  if (!data) return null;

  return (
    <SearchElementContainer>
      <Box>
        {data.avatarUrl ? (
          <img
            src={data.avatarUrl}
            className="search__element-avatar"
            alt="avatar"
          />
        ) : (
          <Avatar {...stringAvatar(data.username)} />
        )}
        <Box className="search__element-info">
          <Box>
            <Typography
              className="search__element-name"
              onClick={() => navigateUserProfile(data.walletAddress)}
            >
              {data.username}
            </Typography>
            <Typography className="search__element-post">
              {data?.posts || 0} posts
            </Typography>
            <Typography className="search__element-credit">
              Credit score: {data?.creditScore || 0}
            </Typography>
          </Box>
          <Box>
            <img src={WalletIcon} alt="wallet" />
            <Typography>{shortenAddress(data.walletAddress)}</Typography>
          </Box>
        </Box>
      </Box>
      <CustomizedButton>Subcribe</CustomizedButton>
    </SearchElementContainer>
  );
};

export default SearchElement;
