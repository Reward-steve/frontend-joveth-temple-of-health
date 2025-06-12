import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { type ErrorType } from "../../types/auth";
import { validateLoginForm } from "../../utils/validateForm";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/useApi";

type LoginData = { email: string; password: string };

export const useLoginLogic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { error } = useApi();

  useEffect(() => {
    document.title = "Auth | Login";
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Navigate when user logs in
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "Admin":
          navigate("/admin/dashboard");
          break;
        case "Patient":
          navigate("/patient/dashboard");
          break;
        case "Doctor":
          navigate("/doctor/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, navigate]);

  // Login handler
  const handleUserLogin = async (data: LoginData): Promise<void> => {
    const errors = validateLoginForm(data);

    if (errors && Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before continuing.");
      return;
    }

    setIsLoading(true);
    try {
      await login(data);
    } catch (err) {
      const errorMessage =
        (err as ErrorType)?.response?.data?.message ||
        (err as Error).message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleUserLogin,
  };
};
