import styled, { css } from "styled-components";
import { IButtonSize, IButtonWidth, IButtonColours } from "../../types";

export interface StyledButtonProps {
  $buttonSize?: IButtonSize;
  $buttonWidth?: IButtonWidth;
  $color?: IButtonColours;
  $background?: IButtonColours;
}

export const StyledButton = styled.button<StyledButtonProps>(
  ({ $buttonSize, $buttonWidth, $background, $color }) => {
    const isSizeSmall = $buttonSize === "small";
    const isWidthFull = $buttonWidth === "full";
    return css`
      width: ${isWidthFull ? "100%" : "auto"};
      font-size: ${isSizeSmall ? "12px" : "auto"};
      padding: 0.5rem 1.25rem;
      margin: 0.5rem;
      background: ${$background};
      color: ${$color};
      letter-spacing: 0.4px;
      text-transform: capitalize;
    `;
  }
);
