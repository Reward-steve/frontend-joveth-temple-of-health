import { AuthHolder } from "../AuthHolder";
import { LoginForm } from "./LoginForm";
import { useLoginLogic } from "./useLoginLogic";

export default function Login(): JSX.Element {
  const { isLoading, handleUserLogin } = useLoginLogic();

  return (
    <AuthHolder>
      <LoginForm isLoading={isLoading} onLogin={handleUserLogin} />
    </AuthHolder>
  );
}
