import styled from "@emotion/styled";
import { Box, Paper } from "@mui/material";
import COLOR from "src/presentation/theme/Color";

const ProfileContainer = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  padding: "30px",
  height: "fit-content",

  ".profile__card-avatar": {
    width: "120px",
    aspectRatio: 1 / 1,
    borderRadius: "12px",
  },
  ".profile__info": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  ".profile__card-name": {
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "24px",
    letterSpacing: "0px",
    color: COLOR.neutral.neutral_1,
  },
  ".profile__card-address": {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    img: {
      width: "18px",
      aspectRatio: 1 / 1,
    },
    p: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "18px",
      letterSpacing: "0px",
      color: COLOR.neutral.neutral_4,
    },
  },
  ".profile__statistic": {
    display: "flex",
    gap: "20px",
    marginTop: "8px",
  },
  ".profile__statistic-item": {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    alignItems: "center",
    ".profile__card-value": {
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "24px",
      letterSpacing: "0px",
      color: COLOR.neutral.neutral_1,
    },
    ".profile__card-label": {
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: "16px",
      letterSpacing: "0px",
      color: COLOR.neutral.neutral_2,
    },
  },
}));

const TopAuthorHeaderContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  ".author__list-label": {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0px",
    color: COLOR.neutral.neutral_4,
  },

  ".author__list-pagination": {
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "16px",
    letterSpacing: "0px",
    backgroundColor: COLOR.neutral.neutral_2,
    padding: "2px 12px",
    color: COLOR.white,
    borderRadius: "10px",
  },
}));

const TopAuthorListContainer = styled(Paper)(() => ({
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  ".author__list-item": {
    display: "flex",
    justifyContent: "space-between",
  },
  ".author__container": {
    display: "flex",
    gap: "18px",
    alignItems: "center",
  },
  ".author__container-avatar": {
    width: "44px",
    aspectRatio: 1 / 1,
    borderRadius: "12px",
  },
  ".author__container-info": {
    display: "flex",
    flexDirection: "column",
  },
  ".author__container-name": {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "0px",
    color: COLOR.neutral.neutral_1,
  },
  ".author__container-upvotes": {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0px",
    color: COLOR.neutral.neutral_4,
  },
}));

const PostInputContainer = styled(Paper)(() => ({
  padding: "30px",
  ".post__input-main": {
    display: "flex",
    justifyContent: "space-between",
    div: {
      display: "flex",
      gap: "16px",
      alignItems: "center",
      p: {
        fontSize: "16px",
        fontWeight: 700,
        lineHeight: "20px",
        letterSpacing: "0px",
        color: COLOR.neutral.neutral_2,
        cursor: "pointer",
      },
    },
    img: {
      width: "44px",
      aspectRatio: 1 / 1,
      borderRadius: "10px",
    },
  },
  ".post__input-extra": {
    flexDirection: "row",
    display: "flex",
    gap: "30px",
    borderTop: `1px solid ${COLOR.neutral.neutral_3}`,
    paddingTop: "16px",
    marginTop: "20px",
    button: {
      display: "flex",
      gap: "8px",
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "18px",
      letterSpacing: "0px",
      color: COLOR.neutral.neutral_1,
      borderRadius: 0,
    },
  },
}));

export {
  TopAuthorHeaderContainer,
  TopAuthorListContainer,
  ProfileContainer,
  PostInputContainer,
};
