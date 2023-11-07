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

    img: {
        width: "100%",
        height: "100%",
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

export {
    Container,
    BackgroundProfileImg,
    LeftContent,
    RightContent,
    TabMenuContainer,
    TabMenuItem,
    PostsContainer,
};
