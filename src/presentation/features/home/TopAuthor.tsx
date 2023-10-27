import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { TopAuthorHeaderContainer, TopAuthorListContainer } from "./styles";
import MoreIcon from "src/presentation/assets/icons/more.svg";

const TopAuthor = () => {
  const authors = [
    {
      id: 1,
      avatar: "",
      name: "Ronald Smith",
      upvotes: 1203,
    },
    {
      id: 2,
      avatar: "",
      name: "Ronald Smith",
      upvotes: 1203,
    },
    {
      id: 2,
      avatar: "",
      name: "Ronald Smith",
      upvotes: 1203,
    },
    {
      id: 4,
      avatar: "",
      name: "Ronald Smith",
      upvotes: 1203,
    },
    {
      id: 5,
      avatar: "",
      name: "Ronald Smith",
      upvotes: 1203,
    },
    {
      id: 6,
      avatar: "",
      name: "Ronald Smith",
      upvotes: 1203,
    },
    {
      id: 7,
      avatar: "",
      name: "Ronald Smith",
      upvotes: 1203,
    },
    {
      id: 8,
      avatar: "",
      name: "Ronald Smith",
      upvotes: 1203,
    },
    {
      id: 9,
      avatar: "",
      name: "Ronald Smith",
      upvotes: 1203,
    },
    {
      id: 10,
      avatar: "",
      name: "Ronald Smith",
      upvotes: 1203,
    },
  ];
  return (
    <Box
      sx={{
        width: "25%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <TopAuthorHeaderContainer>
        <Typography className="author__list-label">TOP AUTHOR</Typography>
        <Typography className="author__list-pagination">10</Typography>
      </TopAuthorHeaderContainer>
      <TopAuthorListContainer>
        {authors.map((author) => (
          <Box className="author__list-item">
            <Box className="author__container">
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
                }
                alt="avatar"
                className="author__container-avatar"
              />
              <Box className="author__container-info">
                <Typography className="author__container-name">
                  {author.name}
                </Typography>
                <Typography className="author__container-upvotes">
                  {author.upvotes} upvotes
                </Typography>
              </Box>
            </Box>
            <IconButton>
              <img src={MoreIcon} alt="more" />
            </IconButton>
          </Box>
        ))}
      </TopAuthorListContainer>
    </Box>
  );
};

export default TopAuthor;
