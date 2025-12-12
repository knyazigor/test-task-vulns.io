export const nameValidator = (value: string) =>
  !value
    ? "Name is required"
    : value.length < 7
    ? "Name should be at least 7 characters long."
    : "";
