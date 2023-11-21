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
    cursor: "pointer",
  },

  img: {
    width: "44px",
    height: "44px",
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
      fontSize: 16,
      fontFamily: "Bold",
      lineHeight: "20px",
    },
    ".MuiCardHeader-subheader": {
      fontFamily: "Regular",
      lineHeight: "18px",
      color: COLOR.neutral.neutral_2,
      marginTop: 4,
    },
  },

  ".content": {
    fontFamily: "Gilroy",
    lineHeight: "24px",
    fontSize: 14,
    color: COLOR.neutral.neutral_4,
  },

  ".viewmore": {
    fontFamily: "Gilroy",
    lineHeight: "24px",
    fontSize: 14,
    fontWeight: 700,
    color: COLOR.link,
    cursor: "pointer",
  },

  ".MuiCardActions-root": {
    display: "flex",
    justifyContent: type ? "space-between" : "right",
    padding: "14px 0 28px 0",

    div: {
      display: "flex",
      alignItems: "center",
      gap: 15,
    },

    ".post__interactions-container": {
      gap: 27,
    },

    ".post__interactions-votes": {
      fontSize: 14,
      fontFamily: "Semibold",
      lineHeight: "18px",
      color: COLOR.neutral.neutral_4,
    },

    ".post__interactions_button-downvoted": {
      p: {
        color: COLOR.error,
      },
      svg: {
        path: {
          fill: COLOR.error,
        },
      },
    },

    ".post__interactions_button-upvoted": {
      p: {
        color: COLOR.success,
      },
      svg: {
        path: {
          fill: COLOR.success,
        },
      },
    },

    ".post__interactions-holders": {
      fontSize: "14px",
      fontFamily: "Semibold",
      lineHeight: "18px",
      color: COLOR.neutral.neutral_4,
    },

    ".MuiButtonBase-root": {
      borderRadius: 0,
      display: "flex",
      gap: "8px",
      padding: "9px 12px",
      "&.MuiIconButton-root:hover": {
        backgroundColor: COLOR.border,
        borderRadius: 6,
      },
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

const PriceContainer = styled("div")(() => ({
  backgroundColor: COLOR.white,
  border: `1px solid ${COLOR.neutral.neutral_3}`,
  borderRadius: 8,
  padding: "6px 12px",

  p: {
    color: COLOR.neutral.neutral_4,
    fontFamily: "Semibold",
    lineHeight: "18px",
    fontSize: 14,
    marginTop: 2,
  },
}));

export { PostSection, PostContainer, PriceContainer };
