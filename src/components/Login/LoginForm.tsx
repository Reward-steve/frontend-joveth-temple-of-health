import React from "react";
import { NavLink } from "react-router-dom";
import FormInput from "../form/FormInputs";
import Form from "../form/Form";
import { RiLoginBoxLine } from "react-icons/ri";
import { FormHeader } from "../form/FormHeader";
import { useForm } from "react-hook-form";
import { FormContent } from "../form/FormContent";
import { Button } from "../Button";
import { FormHeaderSection } from "../form/FormHeaderSection";
import { type LoginFormValues, type LoginFormProps } from "../../types/auth";

export const LoginForm = ({ isLoading, onLogin }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  return (
    <Form handleOnSubmit={handleSubmit(onLogin)}>
      <FormHeader title="Log in" />
      <FormHeaderSection
        icon={<RiLoginBoxLine className="text-4xl text-green-500" />}
        message="Welcome back! Please log in to your account."
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
            error={errors.password}
          />
        </label>
        <Button type="submit" loading={isLoading} className="w-full">
          Login
        </Button>
      </FormContent>
      <div className="w-[95%] my-4 flex justify-center">
        <NavLink
          to="/auth/forgotten-password"
          className="text-blue-700 w-[95%] p-2.5 flex justify-end cursor-pointer"
        >
          Forgotten password?
        </NavLink>
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
