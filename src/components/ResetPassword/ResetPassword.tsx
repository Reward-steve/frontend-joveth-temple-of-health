import FormInput from "../../components/form/FormInputs";
import { FaLock } from "react-icons/fa";
import { useResetPasswordLogic } from "./useResetPasswordLogic";
import Form from "../form/Form";
import { FormContent } from "../form/FormContent";
import { AuthHolder } from "../AuthHolder";
import { FormHeader } from "../form/FormHeader";
import { Button } from "../Button";
import { FormHeaderSection } from "../form/FormHeaderSection";

export default function ResetPasswordPage() {
  const { isLoading, register, handleSubmit, errors, onSubmit } =
    useResetPasswordLogic();

  return (
    <AuthHolder>
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
            register={register.password}
            error={errors.password}
          />
          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter new password"
            register={register.confirmPassword}
            error={errors.confirmPassword}
          />
          <Button type="submit" className="w-full" loading={isLoading}>
            Reset Password
          </Button>
        </FormContent>
      </Form>
    </AuthHolder>
  );
}
