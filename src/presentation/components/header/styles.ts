import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import COLOR from "src/presentation/theme/Color";

const HeaderContainer = styled("div")(({ theme }: any) => ({
  width: "100%",
  padding: "25px 30px",
  borderBottom: `1px solid ${COLOR.border}`,
  display: "flex",
  alignItems: "center",

  [theme.breakpoints.down("md")]: {
    padding: "20px 24px",
  },
}));

const LogoWrapper = styled("div")(({ theme }: any) => ({
  cursor: "pointer",

  [theme.breakpoints.down("md")]: {
    svg: {
      height: 34,
    },
  },
}));

const SearchContainer = styled("div")({
  width: 300,
  borderRadius: 10,
  padding: "0 12px",
  display: "flex",
  alignItems: "center",
  gap: 10,
  backgroundColor: COLOR.neutral.neutral_5,
  marginLeft: 40,

  input: {
    height: 0,
    fontFamily: "Regular",
    fontSize: 14,
    padding: "22px 14px",
  },

  fieldset: {
    border: "none",
  },
});

const ButtonContainer = styled("div")({
  marginLeft: "auto",
  display: "flex",
  gap: "16px",
  img: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
  },
  ".MuiAvatar-root": {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
  },
  ".header__account-info": {
    border: `1px solid ${COLOR.neutral.neutral_3}`,
    borderRadius: "10px",
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    img: {
      width: "24px",
      height: "24px",
    },
    p: {
      fontFamily: "Regular",
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "20px",
      marginTop: "4px",
    },
  },
});

const ModalContainer = styled(Box)(({ theme }: any) => ({
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
    marginTop: 20,
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

  ".modal__information-otp-input": {
    height: "52px!important",
    width: "52px!important",
    fontSize: "24px",
    fontWeight: 700,
    textAlign: "center",
    borderTop: "1px solid #000000",
  },

  ".modal__information-otp-seperator": {
    width: "8px",
  },
}));

export {
  HeaderContainer,
  LogoWrapper,
  SearchContainer,
  ButtonContainer,
  ModalContainer,
};
