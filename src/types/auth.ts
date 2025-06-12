import {
  UseFormRegister,
  FieldErrors,
  UseFormRegisterReturn,
} from "react-hook-form";
import type { IconType } from "react-icons";

// All signup form fields
export type SignupFormValues = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  state: string;
  city: string;
  street: string;
  emergencyName: string;
  emergencyPhone: string;
  relationship: string;
};

// Props for the basic info form step
export type BasicInfoProps = {
  register: UseFormRegister<SignupFormValues>;
  errors?: FieldErrors<SignupFormValues>;
  step: () => void;
  value: SignupFormValues; // for radio checked state
};

// Props for the details form step
export type DetailsFormProps = {
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  step: () => void;
  isLoading: boolean;
  value: SignupFormValues;
};

// Props for a reusable form input
export type FormInputProps = {
  maxLength?: number;
  id?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  icon?: IconType;
  register: UseFormRegisterReturn;
  error?: FieldErrors<SignupFormValues>;
  required?: boolean;
};

export type ForgottenPasswordFormValues = {
  email: string;
};

export interface ForgottenPasswordProps {
  isLoading: boolean;
  onSubmit: (data: { email: string }) => void;
}

export type LoginFormValues = {
  email: string;
  password: string;
};

export interface LoginFormProps {
  isLoading: boolean;
  onLogin: (data: LoginFormValues) => void;
}

export type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

export interface ResetPasswordFormProps {
  isLoading: boolean;
  onSubmit: (data: ResetPasswordForm) => Promise<void>;
}

export interface ErrorType {
  response: { data: { message: string } };
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}
