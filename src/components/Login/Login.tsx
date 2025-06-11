import { AuthHolder } from "../AuthHolder";
import { LoginForm } from "./LoginForm";
import { useLoginLogic } from "./useLoginLogic";

export default function Login(): JSX.Element {
  const { next, isLoading, handleUserLogin, handleForgottenPassword, setNext } =
    useLoginLogic();

  return (
    <AuthHolder>
      <LoginForm
        next={next}
        isLoading={isLoading}
        onLogin={handleUserLogin}
        handleForgottenPassword={handleForgottenPassword}
        setNext={setNext}
      />
    </AuthHolder>
  );
}
