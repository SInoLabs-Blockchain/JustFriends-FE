import { styled } from "@mui/material/styles";
import COLOR from "src/presentation/theme/Color";

const HeaderContainer = styled("div")({
  width: "100%",
  padding: "25px 30px",
  borderBottom: `1px solid ${COLOR.border}`,
  display: "flex",
  alignItems: "center",
});

const LogoWrapper = styled("div")({
  cursor: "pointer",
});

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

export { HeaderContainer, LogoWrapper, SearchContainer, ButtonContainer };
