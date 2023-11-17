import { CustomizedButton } from "./styles";

const CustomButton = ({
  title,
  disabled,
  sm,
  backgroundColor,
  ...props
}: any) => {
  return (
    <CustomizedButton
      sm={sm}
      disabled={disabled}
      backgroundColor={backgroundColor}
      {...props}
    >
      {title}
    </CustomizedButton>
  );
};

export default CustomButton;
