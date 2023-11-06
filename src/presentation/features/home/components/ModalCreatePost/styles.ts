import { styled } from "@mui/material/styles";
import COLOR from "src/presentation/theme/Color";

const ModalContainer = styled("div")({
    position: "absolute",
    top: "31%",
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
        },

        ".modal-information__name": {
            color: COLOR.neutral.neutral_1,
            fontSize: 24,
            fontFamily: "Bold",
            lineHeight: "32px",
            marginBottom: 6,
        },
    },
});

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
    border: "none",
    outline: "none",
    color: COLOR.neutral.neutral_1,
    fontSize: 14,
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

export {
    ModalContainer,
    StyledSelect,
    StyledSelectMenu,
    StyledSelectItem,
    StyledTextArea,
};
