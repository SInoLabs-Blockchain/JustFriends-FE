import React from "react";
import { useWeb3Modal } from "@web3modal/react";
import { CustomizedButton } from "./styles";

const ConnectButton = ({ title, ...props }: any) => {
  const { open } = useWeb3Modal();

  return (
    <CustomizedButton {...props} onClick={() => open()}>
      {title}
    </CustomizedButton>
  );
};

export default ConnectButton;
