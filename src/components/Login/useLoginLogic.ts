import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoginType, ErrorType, ValidationErrors } from "./types";
import { validateLoginForm } from "../../utils/validateForm";
import { toast } from "react-toastify";

export const useLoginLogic = () => {
  const [next, setNext] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [currentUser, setCurrentUser] = useState<LoginType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    document.title = next ? "Auth | Forgotten Password" : "Auth | Login";
  }, [next]);

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
      }
    }
  }, [user, navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserLogin = async (e: FormEvent) => {
    e.preventDefault();
    toast.error(undefined);
    const errors = validateLoginForm(currentUser, next);
    setValidationErrors(errors || {});

    if (errors && Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before continuing.");
      return;
    }

    try {
      setIsLoading(true);

      await login(currentUser);
    } catch (err) {
      const errorMessage =
        (err as ErrorType)?.response?.data?.message ||
        (err as Error).message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
      console.error("Login Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const errors = validateLoginForm(currentUser, next);
    setValidationErrors(errors || {});

    if (errors && Object.keys(errors).length > 0) return;

    try {
      setIsLoading(true);
      // Ideally: await api call here
      toast.success("Reset instructions sent to your email.");
    } catch (err) {
      console.error("Password Reset Error:", err);
      toast.error("Failed to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    next,
    setNext,
    isLoading,
    currentUser,
    handleInputChange,
    handleUserLogin,
    handlePasswordReset,
    validationErrors,
    successMessage,

    setSuccessMessage,
  };
};
