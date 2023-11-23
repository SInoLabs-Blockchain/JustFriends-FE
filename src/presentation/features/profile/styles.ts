import styled from "@emotion/styled";
import COLOR from "src/presentation/theme/Color";

type InputProps = {
  isSelected: boolean;
};

const Container = styled("div")({
  padding: "30px 30px 100px",

  ".profile__content-container": {
    display: "flex",
    padding: "70px 0 0 50px",
    width: "100%",
    justifyContent: "space-between",
  },

  ".flex-center": {
    display: "flex",
    alignItems: "center",
  },
});

const BackgroundProfileImg = styled("div")({
  width: "100%",
  height: 300,
  borderRadius: 20,
  position: "relative",
  cursor: "pointer",

  ".profile__cover-container": {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  ".profile__avatar-container": {
    position: "absolute",
    top: 205,
    left: 50,

    img: {
      width: 140,
      height: 140,
      borderRadius: "50%",
      border: `4px solid ${COLOR.neutral.neutral_5}`,
    },

    ".MuiAvatar-root": {
      width: "140px",
      height: "140px",
      aspectRatio: 1 / 1,
      borderRadius: "50%",
      cursor: "pointer",
      fontSize: "48px",
      border: `4px solid ${COLOR.neutral.neutral_5}`,
    },
  },
});

const LeftContent = styled("div")({
  width: "25%",

  ".user-information-container": {
    display: "flex",
    flexDirection: "column",
    gap: 24,

    ".user-information__content": {
      display: "flex",
      flexDirection: "column",
      gap: 10,

      ".user-information__name": {
        fontFamily: "Bold",
        fontSize: 24,
        lineHeight: "32px",
        color: COLOR.neutral.neutral_1,
      },

      ".user-information__content-container": {
        gap: 8,

        ".user-information__content-title": {
          fontFamily: "Bold",
          fontSize: 14,
          color: COLOR.neutral.neutral_4,
          lineHeight: "18px",

          span: {
            fontFamily: "Semibold",
            color: COLOR.neutral.neutral_1,
          },
        },
      },
    },

    ".user-information__description": {
      fontFamily: "Gilroy",
      fontSize: 14,
      lineHeight: "24px",
      color: COLOR.neutral.neutral_4,
    },

    ".user-information__metrics-container": {
      padding: 16,
      justifyContent: "space-between",
      borderTop: `1px solid ${COLOR.neutral.neutral_3}`,
      borderBottom: `1px solid ${COLOR.neutral.neutral_3}`,

      ".user-information__metrics-item": {
        flexDirection: "column",
        gap: 5,

        ".user-information__metrics-value": {
          fontFamily: "Bold",
          fontSize: 18,
          lineHeight: "24px",
          color: COLOR.neutral.neutral_1,
        },

        ".user-information__metrics-title": {
          fontFamily: "Semibold",
          fontSize: 14,
          lineHeight: "18px",
          color: COLOR.neutral.neutral_2,
        },
      },
    },
  },

  ".user-information__button": {
    marginTop: 30,
    width: "100%",

    button: {
      width: "100%",
      padding: "11px 24px",
      fontSize: 16,
      lineHeight: "20px",
    },
  },
});

const RightContent = styled("div")({
  width: "70%",

  ".no-data-container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    img: {
      width: 200,
    },

    p: {
      fontFamily: "Semibold",
      fontSize: 18,
      lineHeight: "24px",
      color: COLOR.neutral.neutral_4,
    },
  },
});

const TabMenuContainer = styled("div")({
  width: "100%",
  borderBottom: `1px solid ${COLOR.neutral.neutral_3}`,
  display: "flex",
  gap: 40,
  marginBottom: 40,
});

const TabMenuItem = styled("div")<InputProps>(({ isSelected }) => ({
  cursor: "pointer",

  p: {
    fontFamily: "Semibold",
    fontSize: 16,
    color: isSelected ? COLOR.neutral.neutral_1 : COLOR.neutral.neutral_2,
    lineHeight: "20px",
  },

  ".tab-menu__divider": {
    marginTop: 20,
    width: "100%",
    height: 3,
    borderRadius: 6,
    background: isSelected ? COLOR.linear : "transparent",
  },
}));

const PostsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

const RevenueContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 40,

  ".revenue-box": {
    borderRadius: 12,
    padding: 30,
    display: "flex",
    flexDirection: "column",
    gap: 24,
    height: "100%",
  },

  ".profit-container": {
    background: "linear-gradient(138deg, #A07AF7 13.97%, #55A0F0 91.27%)",
    ".profit__title": {
      fontFamily: "Gilroy",
      fontSize: 18,
      fontWeight: 600,
      lineHeight: "24px",
      color: COLOR.white,
      opacity: 0.8,
    },
    ".profit__value": {
      fontFamily: "Gilroy",
      fontSize: 30,
      fontWeight: 400,
      lineHeight: "38px",
      color: COLOR.white,
    },

    ".profit__content": {
      display: "flex",
      justifyContent: "space-between",
    },

    ".profit__content-item": {
      display: "flex",
      flexDirection: "column",
      gap: 24,
    },

    ".profit__content-value": {
      fontFamily: "Gilroy",
      fontSize: 18,
      fontWeight: 400,
      lineHeight: "24px",
      color: COLOR.white,
    },

    ".profit__content-title": {
      fontFamily: "Gilroy",
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "18px",
      color: COLOR.white,
      opacity: 0.7,
    },
  },

  ".active-income-container": {
    background: "#F0EAFF",
    ".active-income__title": {
      fontFamily: "Gilroy",
      fontSize: 18,
      fontWeight: 600,
      lineHeight: "24px",
      color: COLOR.neutral.neutral_4,
    },
    ".active-income__value": {
      fontFamily: "Gilroy",
      fontSize: 30,
      fontWeight: 400,
      lineHeight: "38px",
      color: COLOR.neutral.neutral_1,
    },

    ".active-income__content": {
      display: "flex",
      justifyContent: "space-between",
    },

    ".active-income__content-value": {
      fontFamily: "Gilroy",
      fontSize: 18,
      fontWeight: 400,
      lineHeight: "24px",
      color: COLOR.neutral.neutral_1,
    },

    ".active-income__content-title": {
      fontFamily: "Gilroy",
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "18px",
      color: COLOR.neutral.neutral_4,
    },
  },

  ".passive-income-container": {
    background: "#DEF6FF",
    ".passive-income__title": {
      fontFamily: "Gilroy",
      fontSize: 18,
      fontWeight: 600,
      lineHeight: "24px",
      color: COLOR.neutral.neutral_4,
    },
    ".passive-income__value": {
      fontFamily: "Gilroy",
      fontSize: 30,
      fontWeight: 400,
      lineHeight: "38px",
      color: COLOR.neutral.neutral_1,
    },

    ".passive-income__content": {
      display: "flex",
      justifyContent: "space-between",
    },

    ".passive-income__content-value": {
      fontFamily: "Gilroy",
      fontSize: 18,
      fontWeight: 400,
      lineHeight: "24px",
      color: COLOR.neutral.neutral_1,
    },

    ".passive-income__content-title": {
      fontFamily: "Gilroy",
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "18px",
      color: COLOR.neutral.neutral_4,
    },
  },

  ".profit-chart-container": {
    borderRadius: 12,
    border: "1px solid var(--gray-gray-200, #F1F1F2)",
    background: COLOR.white,
    padding: 30,

    ".chart-title": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,

      p: {
        fontFamily: "Gilroy",
        fontSize: 24,
        fontWeight: 400,
        lineHeight: "32px",
        color: COLOR.neutral.neutral_1,
      },

      ".time-unit-container": {
        display: "flex",
        gap: 10,
      },
    },
  },

  ".flex-center": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const TimeUnitItem = styled("div")<InputProps>(({ isSelected }) => ({
  cursor: "pointer",
  borderRadius: 6,
  background: isSelected ? "#F3F4F6" : COLOR.white,
  padding: "5px 12px",

  p: {
    fontFamily: "Semibold",
    fontSize: 16,
    color: isSelected ? COLOR.neutral.neutral_1 : COLOR.neutral.neutral_4,
    lineHeight: "20px",
  },
}));

export {
  Container,
  BackgroundProfileImg,
  LeftContent,
  RightContent,
  TabMenuContainer,
  TabMenuItem,
  PostsContainer,
  RevenueContainer,
  TimeUnitItem,
};
