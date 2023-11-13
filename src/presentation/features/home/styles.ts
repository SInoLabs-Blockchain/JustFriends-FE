import styled from "@emotion/styled";
import { Box, Paper } from "@mui/material";
import COLOR from "src/presentation/theme/Color";

const HomeContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "30px 30px 200px",
});

const ProfileContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  padding: "30px",
  height: "fit-content",
  boxShadow: "0 0 10px rgba(86, 107, 135, 0.08)",
  borderRadius: 16,
  backgroundColor: COLOR.white,

  ".profile__card-avatar": {
    width: "120px",
    aspectRatio: 1 / 1,
    borderRadius: "12px",
    cursor: "pointer",
  },
  ".profile__info": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  ".profile__card-name": {
    fontSize: "18px",
    lineHeight: "24px",
    fontFamily: "Bold",
    color: COLOR.neutral.neutral_1,
  },

  ".profile__card-address": {
    marginTop: 8,
    display: "flex",
    gap: "8px",
    alignItems: "center",

    svg: {
      cursor: "pointer",
    },

    p: {
      fontSize: "14px",
      fontFamily: "Regular",
      lineHeight: "18px",
      color: COLOR.neutral.neutral_4,
    },
  },
  ".profile__statistic": {
    display: "flex",
    gap: "20px",
    marginTop: 16,
  },
  ".profile__statistic-item": {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    alignItems: "center",

    ".profile__card-value": {
      fontSize: "18px",
      fontFamily: "Bold",
      lineHeight: "24px",
      color: COLOR.neutral.neutral_1,
    },
    ".profile__card-label": {
      fontSize: 12,
      fontFamily: "SemiBold",
      lineHeight: "16px",
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

const PostInputContainer = styled("div")(() => ({
  padding: "30px 30px 25px",
  backgroundColor: COLOR.white,
  borderRadius: 16,
  boxShadow: "0 0 10px rgba(86, 107, 135, 0.08)",

  ".post__input-main": {
    display: "flex",
    gap: "16px",
    alignItems: "center",

    p: {
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "36px",
      letterSpacing: "0px",
      color: COLOR.neutral.neutral_2,
      cursor: "text",
      width: "60%",
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
      padding: 0,
    },

    ".post__input-extra-text": {
      fontFamily: "Semibold",
      fontSize: 14,
    },
  },
}));

export {
  HomeContainer,
  TopAuthorHeaderContainer,
  TopAuthorListContainer,
  ProfileContainer,
  PostInputContainer,
};
