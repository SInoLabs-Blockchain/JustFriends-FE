import { CustomizedButton } from './styles';

const CustomButton = ({ title, backgroundColor, ...props }: any) => {
  return (
    <CustomizedButton backgroundColor={backgroundColor} {...props}>
      {title}
    </CustomizedButton>
  );
};

export default CustomButton;
