import styled, { css } from "styled-components";

export type DisplayType = "block" | "none" | "flex" | "inline-flex";

export const StypedParagraph = styled.p<{
  displayMsg?: DisplayType;
}>(({ displayMsg }) => {
  return css`
    margin: auto;
    display: ${displayMsg};
  `;
});
