import React from "react";
import { SearchElementContainer } from "./styles";
import { Box, Typography } from "@mui/material";
import WalletIcon from "src/presentation/theme/assets/icons/wallet.svg";
import { shortenAddress } from "src/common/utils";
import { CustomizedButton } from "src/presentation/components/button/styles";

const SearchElement = () => {
  const creatorData = {
    name: "Donald Trump",
    posts: 100,
    creditScore: 50,
    address: "0x0bc68d7a06259006ae4cb3B8eFF737a46bF5912e",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png",
    isSubcribed: false,
  };
  return (
    <SearchElementContainer>
      <Box>
        <img
          src={creatorData.avatar}
          className="search__element-avatar"
          alt="avatar"
        />
        <Box className="search__element-info">
          <Box>
            <Typography className="search__element-name">
              {creatorData.name}
            </Typography>
            <Typography className="search__element-post">
              {creatorData.posts} posts
            </Typography>
            <Typography className="search__element-credit">
              Credit score: {creatorData.creditScore}
            </Typography>
          </Box>
          <Box>
            <img src={WalletIcon} alt="wallet" />
            <Typography>{shortenAddress(creatorData.address)}</Typography>
          </Box>
        </Box>
      </Box>
      <CustomizedButton>Subcribe</CustomizedButton>
    </SearchElementContainer>
  );
};

export default SearchElement;
