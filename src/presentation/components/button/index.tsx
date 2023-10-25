import React from "react";
import { CustomizedButton } from "./styles";

const CustomButton = ({ title, ...props }: any) => {
  return <CustomizedButton {...props}>{title}</CustomizedButton>;
};

export default CustomButton;
