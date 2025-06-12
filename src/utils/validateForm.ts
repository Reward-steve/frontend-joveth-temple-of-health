import { type ValidationErrors, type LoginFormValues } from "../types/auth";
export const validateLoginForm = (user: LoginFormValues) => {
  const errors: ValidationErrors = {};

  if (!user.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = "Invalid email format.";
  }

  if (!user.password) {
    errors.password = "Password is required.";
  } else if (user.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};
export const validateEmail = (user: { email: string }) => {
  const errors: ValidationErrors = {};

  if (!user.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = "Invalid email format.";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};
