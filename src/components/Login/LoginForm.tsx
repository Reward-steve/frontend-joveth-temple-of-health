import React from "react";
import { NavLink } from "react-router-dom";
import FormInput from "../form/FormInputs";
import Form from "../form/Form";
import { RiLoginBoxLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";
import { FormHeader } from "../form/FormHeader";
import { useForm } from "react-hook-form";
import { FormContent } from "../form/FormContent";
import { Button } from "../Button";
import { FormHeaderSection } from "../form/FormHeaderSection";

type LoginFormValues = {
  email: string;
  password: string;
};

interface Props {
  next: boolean;
  error?: string | null;
  isLoading: boolean;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  handleForgottenPassword: (data: { email: string }) => void;
  onLogin: (data: LoginFormValues) => void;
}

export const LoginForm = ({
  next,
  isLoading,
  setNext,
  handleForgottenPassword,
  onLogin,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  return (
    <Form
      handleOnSubmit={handleSubmit(next ? handleForgottenPassword : onLogin)}
    >
      <FormHeader title={next ? "Forgotten Password" : "Log in"} />
      <FormHeaderSection
        icon={
          next ? (
            <MdHelpOutline className="text-4xl text-green-500" />
          ) : (
            <RiLoginBoxLine className="text-4xl text-green-500" />
          )
        }
        message={
          next
            ? "Enter your email address and we'll send you instructions to reset your password."
            : "Welcome back! Please log in to your account."
        }
      />
      <FormContent>
        <label className="w-full flex items-center pt-2.5">
          <FormInput
            label="Email Address"
            type="email"
            placeholder="ayojackson@example.com"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format.",
              },
            })}
            error={errors.email}
          />
        </label>
        {!next && (
          <label className="w-full flex items-center pt-2.5">
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="********"
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
              })}
              error={errors?.password}
            />
          </label>
        )}
        <Button type="submit" loading={isLoading} className="w-full">
          {next ? "Reset Password" : "Login"}
        </Button>
      </FormContent>

      <div className="w-[95%] my-4 flex justify-center">
        <p
          onClick={() => setNext(!next)}
          className="text-blue-700 w-[95%] p-2.5 flex justify-end cursor-pointer"
        >
          {next ? "Back to Login" : "Forgotten password?"}
        </p>
      </div>

      <label className="text-center text-base text-[#555] my-4 flex justify-center gap-2.5">
        <p>Need an account?</p>
        <NavLink className="text-blue-600" to="/auth/signup">
          Sign up
        </NavLink>
      </label>
    </Form>
  );
};
