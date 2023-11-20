import { CircularProgress } from "@mui/material";
import { CustomizedButton } from "./styles";

const CustomButton = ({
  title,
  disabled,
  sm,
  backgroundColor,
  loading,
  ...props
}: any) => {
  return (
    <CustomizedButton
      sm={sm}
      disabled={disabled}
      backgroundColor={backgroundColor}
      {...props}
    >
      {loading ? <CircularProgress size={18} /> : title}
    </CustomizedButton>
  );
};

export default CustomButton;
