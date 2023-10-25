import styled from "@emotion/styled";
import COLOR from "src/presentation/theme/Color";

const PostContainer = styled("div")(() => ({
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
    padding: "30px 0 12px 0",
  },

  ".MuiCardContent-root": {
    padding: "12px 0 16px 0",
  },

  ".MuiCardHeader-content": {
    ".MuiCardHeader-title": {
      color: COLOR.neutral.neutral_1,
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "20px",
      letterSpacing: "0px",
    },
    ".MuiCardHeader-subheader": {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "18px",
      letterSpacing: "0px",
      color: COLOR.neutral.neutral_2,
    },
  },

  ".MuiCardActions-root": {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0 28px 0",
    div: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    ".post__interactions-votes": {
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "18px",
      letterSpacing: "0px",
      color: COLOR.neutral.neutral_2,
    },
    ".post__interactions-holders": {
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "18px",
      letterSpacing: "0px",
      color: COLOR.neutral.neutral_4,
    },
    ".MuiButtonBase-root": {
      borderRadius: 0,
      display: "flex",
      gap: "8px",
    },
  },

  ".MuiCardHeader-action": {
    margin: 0,
    height: "inherit",
    ".MuiButtonBase-root": {
      borderRadius: "6px",
      padding: 0,
    },
  },

  ".separator": {
    hr: {
      backgroundColor: COLOR.neutral.neutral_3,
      border: "none",
      height: "1px",
      margin: 0,
    },
  },
}));

export { PostContainer };
