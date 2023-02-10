export const ButtonWidth = {
  full: "full",
  standard: "standard",
} as const;
export const ButtonSize = {
  small: "small",
  standard: "standard",
} as const;

export const ButtonColours = {
  black: "black",
  green: "green",
  disabled: "lightgray",
  white: "white",
} as const;
type CustomUnion<T> = T[keyof T];

export type IButtonColours = CustomUnion<typeof ButtonColours>;

export type IButtonSize = CustomUnion<typeof ButtonSize>;

export type IButtonWidth = CustomUnion<typeof ButtonWidth>;
