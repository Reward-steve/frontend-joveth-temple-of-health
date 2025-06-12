import { AuthHolder } from "../AuthHolder";
import ForgottenPasswordForm from "./ForgottenPaswordForm";
import { useForgottenPasswordLogic } from "./useForgottenPasswordLogic";

export default function ForgottenPassword() {
  const { isLoading, onSubmit } = useForgottenPasswordLogic();
  return (
    <AuthHolder>
      <ForgottenPasswordForm isLoading={isLoading} onSubmit={onSubmit} />
    </AuthHolder>
  );
}
