import styled from "@emotion/styled";
import { Button } from "@mui/material";
import COLOR from "src/presentation/theme/Color";

type InputProps = {
  sm?: boolean;
};

export const CustomizedButton = styled(Button)<InputProps>(({ sm }) => ({
  padding: "11px 24px",
  borderRadius: "10px !important",
  textTransform: "none",
  gap: "0 !important",
  fontFamily: "Semibold",
  fontSize: sm ? 14 : 16,
  lineHeight: "20px",
  background: COLOR.linear,
  color: COLOR.white,
  boxShadow: "none",

  ".MuiCircularProgress-root": {
    color: COLOR.white,
  },
}));
