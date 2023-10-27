import styled from "@emotion/styled";
import { Button } from "@mui/material";
import COLOR from "src/presentation/theme/Color";

export const CustomizedButton = styled(Button)(() => ({
  padding: "8px 20px",
  borderRadius: "8px !important",
  textTransform: "none",
  gap: "0 !important",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "18px",
  letterSpacing: 0,
  background: "linear-gradient(95.5deg, #A07AF7 0%, #55A0F0 100.09%)",
  color: COLOR.white
}));
