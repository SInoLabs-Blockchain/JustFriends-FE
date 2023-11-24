import { CustomizedButton } from "./styles";

const ConnectButton = ({ openModal, address, title, ...props }: any) => (
  <CustomizedButton {...props} onClick={openModal}>
    {title}
  </CustomizedButton>
);

export default ConnectButton;
