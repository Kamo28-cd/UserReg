export const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//(lower or uppercase letter, followed by anywhere from 3-23 character, digits, hyphens or underscores, overall 4-24 characters)
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//(one lowercase letter, one uppercase letter, one digit, one special character, 8-24 characters)

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
