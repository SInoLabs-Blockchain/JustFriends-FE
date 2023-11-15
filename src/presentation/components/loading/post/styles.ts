import styled from "@emotion/styled";
import COLOR from "src/presentation/theme/Color";

const PostSection = styled("div")(() => ({
  borderRadius: 16,
  backgroundColor: COLOR.white,
  boxShadow: "0 5px 40px -8px rgba(86, 107, 135, 0.08)",
}));

const PostContainer = styled("div")(({ theme, type }: any) => ({
  padding: "0 30px",
  height: "fit-content",

  ".MuiPaper-root": {
    borderRadius: "16px",
    height: "fit-content",
  },

  ".MuiAvatar-root": {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    img: {
      width: "44px",
      height: "44px",
    },
  },

  ".MuiCardHeader-root": {
    padding: "30px 0 0 0",
  },

  ".MuiCardContent-root": {
    padding: "0 0 16px 0",
  },

  ".MuiCardHeader-content": {
    ".MuiCardHeader-title": {
      color: COLOR.neutral.neutral_1,
      fontSize: 16,
      fontFamily: "Bold",
      lineHeight: "20px",
      width: "30%",
    },
    ".MuiCardHeader-subheader": {
      fontFamily: "Regular",
      lineHeight: "18px",
      color: COLOR.neutral.neutral_2,
      marginTop: 4,
      width: "20%",
    },
  },

  ".content": {
    fontFamily: "Gilroy",
    lineHeight: "24px",
    fontSize: 14,
    color: COLOR.neutral.neutral_4,
  },

  [theme.breakpoints.down("xl")]: {
    padding: "0 20px",

    ".MuiCardActions-root": {
      div: {
        gap: 0,
      },

      ".post__interactions-container": {
        gap: 24,
      },
    },
  },
}));

export { PostSection, PostContainer };
