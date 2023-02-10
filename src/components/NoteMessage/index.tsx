import React, { ReactNode } from "react";
import { DisplayType, StypedParagraph } from "./styles";

interface INoteMessage {
  id?: string;
  children: ReactNode;
  displayMsg: DisplayType;
}

const NoteMessage: React.FC<INoteMessage> = ({ id, children, displayMsg }) => {
  return (
    <StypedParagraph id={id} displayMsg={displayMsg}>
      {children}
    </StypedParagraph>
  );
};

export default NoteMessage;
