import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormInput from "../form/FormInputs";
import Form from "../form/Form";
import { Button } from "../Button";
import { FormHeader } from "../form/FormHeader";
import { FormHeaderSection } from "../form/FormHeaderSection";
import { MdHelpOutline } from "react-icons/md";
import { FormContent } from "../form/FormContent";
import {
  type ForgottenPasswordFormValues,
  type ForgottenPasswordProps,
} from "../../types/auth";

const ForgottenPasswordForm: React.FC<ForgottenPasswordProps> = ({
  isLoading,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgottenPasswordFormValues>();

  return (
    <Form handleOnSubmit={handleSubmit(onSubmit)}>
      <FormHeader title="Forgotten Password" />
      <FormHeaderSection
        icon={<MdHelpOutline className="text-4xl text-green-500" />}
        message="Enter your email address and we'll send you instructions to reset your password."
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
        <Button type="submit" loading={isLoading} className="w-full">
          Reset Password
        </Button>
      </FormContent>
      <div className="w-[95%] my-4 flex justify-center">
        <NavLink
          to="/auth/login"
          className="text-blue-700 w-[95%] p-2.5 flex justify-end cursor-pointer"
        >
          Back to Login
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

export default ForgottenPasswordForm;
