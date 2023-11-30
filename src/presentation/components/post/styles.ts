import styled from "@emotion/styled";
import { Box } from "@mui/material";
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
    cursor: "pointer",
    borderRadius: "10px",
  },

  ".MuiCardHeader-root": {
    padding: "30px 0 12px 0",

    ".MuiCardHeader-prices": {
      display: "flex",
      gap: "8px",
      ".MuiCardHeader__prices-new": {
        borderColor: COLOR.primary,
        p: {
          color: COLOR.primary,
        },
      },
    },
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
    color: COLOR.neutral.neutral_4,

    ol: {
      margin: 4,
    },
    ul: {
      margin: 4,
    },
    p: {
      margin: 4,
    },
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

const ModalContainer = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: COLOR.white,
  borderRadius: 12,
  border: "1px solid #F1F1F2",
  padding: 30,
  boxShadow: "0px 3px 4px 0px #00000008",
  outline: "none",

  /* Chrome, Safari, Edge, Opera */
  "input::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },

  "input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },

  /* Firefox */
  "input[type=number]": {
    MozAppearance: "textfield",
  },

  ".flex-center": {
    display: "flex",
    alignItems: "center",
  },

  ".modal-header": {
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottom: `1px solid ${COLOR.neutral.neutral_3}`,

    ".modal-header__title": {
      fontFamily: "Bold",
      fontSize: 24,
      lineHeight: "32px",
    },

    ".modal-header__action": {
      width: 34,
      height: 34,
      backgroundColor: COLOR.border,
      borderRadius: 17,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
  },

  ".modal-information": {
    padding: "20px 0",
    gap: 20,
    display: "flex",
    flexDirection: "column",

    ".modal__information-method": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContents: "flex-start",
      cursor: "pointer",
      gap: "8px",
      borderRadius: "10px",
      padding: "8px 16px",
    },

    ".modal__information-method:hover": {
      backgroundColor: COLOR.neutral.neutral_5,
    },

    ".modal__information-method-name": {
      fontFamily: "Bold",
      fontSize: "24px",
      marginTop: "4px",
    },

    ".modal__information-method-icon": {
      height: "36px",
    },
  },

  ".modal-action": {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    borderTop: `1px solid ${COLOR.neutral.neutral_3}`,
    paddingTop: "16px",
  },
}));

export { PostSection, PostContainer, PriceContainer, ModalContainer };
