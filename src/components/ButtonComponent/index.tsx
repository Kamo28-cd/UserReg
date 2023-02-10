import React from "react";
import { StyledButton, StyledButtonProps } from "./styles";
import { ButtonProps } from "@mui/material";

const ButtonComponent: React.FC<ButtonProps & StyledButtonProps> = ({
  children,
  ...props
}) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default ButtonComponent;
