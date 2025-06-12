import { AuthHolder } from "../AuthHolder";
import { useResetPasswordLogic } from "./useResetPasswordLogic";
import { ResetPasswordForm } from "./ResetPasswordForm";
export default function ResetPassword() {
  const { isLoading, onSubmit } = useResetPasswordLogic();

  return (
    <AuthHolder>
      <ResetPasswordForm isLoading={isLoading} onSubmit={onSubmit} />
    </AuthHolder>
  );
}
