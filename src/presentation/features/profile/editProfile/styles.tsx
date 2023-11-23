import styled from "@emotion/styled";
import COLOR from "src/presentation/theme/Color";
import Menu from "@mui/material/Menu";

const Container = styled("div")({
  padding: "80px 0 150px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  ".MuiAvatar-root": {
    width: 130,
    height: 130,
    borderRadius: "50%",
    fontSize: "48px",
    cursor: "pointer",
  },

  ".edit-profile-container": {
    display: "flex",
    width: "60%",
    flexDirection: "column",
    gap: "30px",
  },

  ".edit-profile__title": {
    fontFamily: "Bold",
    fontSize: 24,
    lineHeight: "32px",
    color: COLOR.neutral.neutral_1,
  },

  ".flex-center": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  ".user-information-container": {
    display: "flex",
    justifyContent: "space-between",
    gap: "45px",
  },

  ".user-information__left-content": {
    display: "flex",
    flexDirection: "column",
    gap: 16,

    ".user-information__avatar-container": {
      display: "flex",
      flexDirection: "column",
      padding: "20px 81px",
      borderRadius: 12,
      gap: 10,
      textAlign: "center",
      border: `1px solid ${COLOR.neutral.neutral_3}`,
    },

    ".user-information__backwall-container": {
      display: "flex",
      flexDirection: "column",
      padding: "20px 30px",
      borderRadius: 12,
      gap: 10,
      border: `1px solid ${COLOR.neutral.neutral_3}`,
      justifyContent: "center",
      textAlign: "center",
    },

    ".user-information__avatar": {
      width: 130,
      height: 130,
      borderRadius: 130,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },

    ".user-information__backwall": {
      height: 90,
      alignSelf: "stretch",
      borderRadius: 8,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      paddingTop: 42,
      backgroundPosition: "center",

      svg: {
        cursor: "pointer",
      },
    },
  },

  ".user-information__right-content": {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",

    button: { width: 150 },

    "& .MuiTextField-root": {
      width: "100%",
      marginTop: 6,
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: 10,
      //   border: `1px solid #D8DEE8`,
      backgroundColor: COLOR.white,

      input: {
        // color: COLOR.neutral.neutral_1,
        // fontFamily: "Regular",
        // fontSize: 16,
        // lineHeight: "20px",
        padding: "15px 16px",
        "&::placeholder": {
          //   color: COLOR.neutral.neutral_2,
        },
      },
    },

    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#7E5BE3",
    },

    ".user-information__description": {
      input: {
        height: 156,
      },
    },
  },

  ".user-information____title": {
    fontFamily: "Semibold",
    fontSize: 16,
    lineHeight: "20px",
    color: COLOR.neutral.neutral_1,
  },
});

const StyledMenu = styled((props: any) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(() => ({
  "& .MuiPaper-root": {
    width: 300,
    borderRadius: 10,
    marginTop: 10,
    boxShadow:
      " 0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",

    "& .MuiMenu-list": {
      padding: 8,
    },

    "& .MuiMenuItem-root": {
      padding: "0",
      cursor: "default",
      background: "#fff",
      display: "flex",
      justifyContent: "space-between",

      "&:active, &:hover": {
        background: "none",
      },

      "& .MuiTextField-root": {
        width: "100%",
      },

      "& .MuiOutlinedInput-root": {
        borderRadius: 10,
        backgroundColor: COLOR.white,

        input: {
          padding: "8px 16px",
        },
      },
    },
  },
}));

export { Container, StyledMenu };
