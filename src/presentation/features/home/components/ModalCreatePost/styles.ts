import { styled } from "@mui/material/styles";
import COLOR from "src/presentation/theme/Color";

const ModalContainer = styled("div")(({ theme }: any) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "43%",
  backgroundColor: COLOR.white,
  borderRadius: 12,
  border: "1px solid #F1F1F2",
  padding: 30,
  boxShadow: "0px 3px 4px 0px #00000008",
  outline: "none",

  ".flex-center": {
    display: "flex",
    alignItems: "center",
  },

  ".relative": {
    position: "relative",
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
    marginTop: 30,
    gap: 20,

    ".modal-information__avatar": {
      width: 70,
      height: 70,
      borderRadius: 9,
      fontSize: "24px",
    },

    ".post-option__dropdown": {
      display: "flex",
      justifyContent: "space-between",
      width: "140px",
    },

    ".modal-information__name": {
      color: COLOR.neutral.neutral_1,
      fontSize: 24,
      fontFamily: "Bold",
      lineHeight: "32px",
      marginBottom: 6,
    },
  },

  ".action__title": {
    fontFamily: "Semibold",
    fontSize: 16,
    color: COLOR.neutral.neutral_1,
    width: "30%",
  },

  [theme.breakpoints.down("lg")]: {
    width: "60%",
  },

  [theme.breakpoints.down("md")]: {
    width: "76%",
  },
}));
const StyledSelect = styled("div")({
  padding: "3px 6px 3px 10px",
  backgroundColor: COLOR.border,
  gap: 6,
  borderRadius: 6,
  cursor: "pointer",

  ".post-option__name": {
    color: COLOR.neutral.neutral_1,
    fontSize: 12,
    fontFamily: "Semibold",
  },
});

const StyledSelectMenu = styled("div")({
  position: "absolute",
  top: 24,
  left: 0,
  borderRadius: 6,
  backgroundColor: COLOR.border,
});

const StyledSelectItem = styled("div")({
  padding: "5px 22px 5px 10px",
  cursor: "pointer",

  ".post-title__title": {
    color: COLOR.neutral.neutral_1,
    fontSize: 12,
    fontFamily: "Gilroy",
  },

  "&:hover": {
    backgroundColor: COLOR.neutral.neutral_3,
  },

  "&:first-child": {
    borderRadius: "6px 6px 0px 0px",
  },

  "&:last-child": {
    borderRadius: "0px 0px 6px 6px",
  },
});

const StyledTextArea = styled("textarea")({
  marginTop: 30,
  width: "100%",
  maxHeight: "50vh",
  minHeight: "30vh",
  border: "none",
  outline: "none",
  color: COLOR.neutral.neutral_1,
  fontSize: 16,
  lineHeight: "22px",
  fontFamily: "Gilroy",
  resize: "none",

  "&::placeholder": {
    color: COLOR.neutral.neutral_2,
    fontSize: 24,
    lineHeight: "32px",
    fontFamily: "Gilroy",
  },
});

const StyledBottomActions = styled("div")({
  marginTop: 30,
  paddingTop: 30,
  borderTop: `1px solid ${COLOR.neutral.neutral_3}`,

  ".bottom__attachs": {
    gap: 15,

    ".bottom__attach-item": {
      width: 24,
      height: 24,
      cursor: "pointer",
    },
  },
});

const StyledButtonShare = styled("div")({
  marginTop: 30,

  button: {
    width: "100%",
    padding: "11px 0",
    borderRadius: "10px !important",
    fontSize: 16,
  },
});

const StyledBaseFeeContainer = styled("div")({
  marginTop: 20,

  ".action__input-container": {
    gap: 10,

    input: {
      padding: "8px 16px",
      outline: "none",
    },

    fieldset: {
      borderColor: `${COLOR.neutral.neutral_3} !important`,
    },

    ".fee__symbol": {
      color: COLOR.neutral.neutral_4,
      fontSize: 14,
      fontFamily: "Semibold",
    },
  },
});

export {
  ModalContainer,
  StyledSelect,
  StyledSelectMenu,
  StyledSelectItem,
  StyledTextArea,
  StyledBottomActions,
  StyledButtonShare,
  StyledBaseFeeContainer,
};
