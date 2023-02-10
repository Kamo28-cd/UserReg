import React from "react";
import NoteMessage from "../NoteMessage";
import { StyledWrapper } from "../Register/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SuccessComponentProps {
  message: string;
  action?: string;
}

const SuccessComponent: React.FC<SuccessComponentProps> = ({
  message,
  action,
}) => {
  return (
    <StyledWrapper flexDirection="column" className="registration">
      <NoteMessage displayMsg={"inline-flex"}>
        <CheckCircleIcon color={"success"} fontSize="large" />
      </NoteMessage>
      <p>{message}</p>
      <p>{action ? <a href="/login">{action}</a> : null}</p>
    </StyledWrapper>
  );
};

export default SuccessComponent;
