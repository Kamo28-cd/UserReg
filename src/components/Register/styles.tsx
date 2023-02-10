import styled, { css } from "styled-components";

export const StyledWrapper = styled.div<{ flexDirection?: string }>(
  ({ flexDirection }) => {
    return css`
      width: 600px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: ${flexDirection ? flexDirection : "row"};
    `;
  }
);

export const ErrorMessage = styled.div<{
  displayMsg?: "block" | "none" | "flex";
}>(({ displayMsg }) => {
  return css`
    margin: auto;
    display: ${displayMsg};
  `;
});

export const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  row-gap: 1.5rem;
  background-colour: #f4f4f4;

  && .css-q0jhri-MuiInputBase-root-MuiInput-root {
    width: 600px;
  }
`;

export const InlineLabel = styled.label`
  display: inline-flex;
`;
