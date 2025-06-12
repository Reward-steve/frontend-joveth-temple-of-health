import FormInput from "../../components/form/FormInputs";
import { FaLock } from "react-icons/fa";
import Form from "../form/Form";
import { FormContent } from "../form/FormContent";
import { FormHeader } from "../form/FormHeader";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { FormHeaderSection } from "../form/FormHeaderSection";
import {
  type ResetPasswordForm,
  type ResetPasswordFormProps,
} from "../../types/auth";
import { NavLink } from "react-router-dom";

export function ResetPasswordForm({
  isLoading,
  onSubmit,
}: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordForm>();

  return (
    <Form handleOnSubmit={handleSubmit(onSubmit)}>
      <FormHeader title="Reset Password" />
      <FormHeaderSection
        icon={<FaLock className="text-4xl text-blue-500" />}
        message="Enter your new password below."
      />
      <FormContent>
        <FormInput
          id="password"
          label="New Password"
          type="password"
          placeholder="Enter new password"
          register={register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.password}
        />
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter new password"
          register={register("confirmPassword", {
            required: "Please confirm your password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            validate: (value) =>
              value === watch("password") || "Passwords do not match.",
          })}
          error={errors.confirmPassword}
        />
        <Button type="submit" className="w-full" loading={isLoading}>
          Reset Password
        </Button>
        <div className="w-[95%] my-4 flex justify-center">
          <NavLink
            to="/auth/login"
            className="text-blue-700 w-[95%] p-2.5 flex justify-end cursor-pointer"
          >
            Back to Login
          </NavLink>
        </div>
      </FormContent>
    </Form>
  );
}
