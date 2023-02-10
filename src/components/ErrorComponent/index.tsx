import React from "react";
import NoteMessage from "../NoteMessage";
import { StyledWrapper } from "../Register/styles";
import ClearIcon from "@mui/icons-material/Clear";

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <StyledWrapper flexDirection="column" className="registration">
      <NoteMessage displayMsg={"inline-flex"}>
        <ClearIcon color={"error"} fontSize="large" />
      </NoteMessage>
      <p>{message}</p>
    </StyledWrapper>
  );
};

export default ErrorComponent;
