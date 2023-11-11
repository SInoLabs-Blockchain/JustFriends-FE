import { CustomizedButton } from './styles';

const CustomButton = ({ title, sm, backgroundColor, ...props }: any) => {
  return (
    <CustomizedButton sm={sm} backgroundColor={backgroundColor} {...props}>
      {title}
    </CustomizedButton>
  );
};

export default CustomButton;
