import { Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import COLOR from "src/presentation/theme/Color";

type InputProps = {
    isSelected: boolean;
};

const Container = styled("div")(({ theme }: any) => ({
    padding: 30,
    backgroundColor: COLOR.white,
    boxShadow: "0 0 10px rgba(86, 107, 135, 0.08)",
    borderRadius: 16,

    [theme.breakpoints.down('xl')]: {
        padding: 20,
    },
}));

const StyledSwitch = styled(Switch)({
    width: 202,
    height: 44,
    padding: 0,
    fontFamily: "Semibold",

    "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(158px)",

        "& .MuiSwitch-thumb:before": {
            content: "'F'",
            color: COLOR.neutral.neutral_1,
            marginTop: 2,
        },
    },

    "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
        backgroundColor: "#E8F4FF",
        opacity: 1,

        "&:before": {
            content: '"Free zone"',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: 26,
            fontSize: 18,
            lineHeight: "24px",
            color: COLOR.neutral.neutral_1,
        },

        "&:after": {
            content: '""',
        },
    },

    "& .MuiSwitch-track": {
        backgroundColor: "rgba(160, 122, 247, 0.12)",
        opacity: 1,
        borderRadius: 10,

        "&:after": {
            content: '"Paid zone"',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: 26,
            fontSize: 18,
            lineHeight: "24px",
            color: COLOR.primary,
        },
    },

    "& .MuiSwitch-thumb": {
        boxShadow: "none",
        width: 26,
        height: 26,
        borderRadius: 40,
        backgroundColor: COLOR.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "&:before": {
            content: "'P'",
            color: COLOR.primary,
            marginTop: 2,
        },
    },
});

const MenuSection = styled("div")({
    display: "flex",
    flexDirection: "column",
    marginTop: 8,
});

const MenuWrapper = styled("div")<InputProps>(({ isSelected }) => ({
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: "16px 0",
    cursor: "pointer",
    borderBottom: `1px solid ${COLOR.border}`,

    "&:last-child": {
        borderBottom: "none",
    },

    path: {
        fill: COLOR.primary,
    },
}));

const MenuTitle = styled(Typography)<InputProps>(({ isSelected }) => ({
    fontFamily: "Bold",
    color: isSelected ? COLOR.primary : COLOR.neutral.neutral_4,
}));

export { Container, StyledSwitch, MenuSection, MenuWrapper, MenuTitle };
