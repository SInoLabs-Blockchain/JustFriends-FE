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
});

export { HeaderContainer, LogoWrapper, SearchContainer, ButtonContainer };
