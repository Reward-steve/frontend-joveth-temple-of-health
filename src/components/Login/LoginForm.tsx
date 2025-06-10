import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import FormInput from "../form/FormInputs";
import { RiLoader2Line } from "react-icons/ri";
import Form from "../form/Form";
import { FormHeader } from "../form/FormHeader";
import { useForm } from "react-hook-form";
import { FormContent } from "../form/FormContent";

type LoginFormValues = {
  email: string;
  password: string;
};

interface Props {
  next: boolean;
  error?: string | null;
  isLoading: boolean;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  handlePasswordReset: (data: LoginFormValues) => void;
  onLogin: (data: LoginFormValues) => void;
}

export const LoginForm = ({
  next,
  isLoading,
  setNext,
  handlePasswordReset,
  onLogin,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  return (
    <Form handleOnSubmit={handleSubmit(next ? handlePasswordReset : onLogin)}>
      <FormHeader title={next ? "Forgotten Password" : "Log in"} />
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
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className={`font-normal text-white text-center cursor-pointer  transition-colors duration-300 no-underline w-full py-3 px-12 rounded-[10px] my-2 ${
            isLoading ? "bg-[#1e9eb2]" : "bg-[#1e9ef4]"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <RiLoader2Line size={30} />
          ) : next ? (
            "Reset Password"
          ) : (
            "Login"
          )}
        </motion.button>
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
