import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ErrorType } from "./types";
import { validateLoginForm, validateEmail } from "../../utils/validateForm";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/useApi";

type LoginData = { email: string; password: string };
type ResetData = { email: string };

export const useLoginLogic = () => {
  const [next, setNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { api, message, error } = useApi();

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
        default:
          navigate("/");
      }
    }
  }, [user, navigate]);

  // Login handler
  const handleUserLogin = async (data: LoginData): Promise<void> => {
    const errors = validateLoginForm(data, next);

    if (errors && Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before continuing.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api("POST", "/auth/login", data);
      if (error) {
        toast.error(error);
      } else if (!res) {
        toast.error("Login failed. Please try again.");
      } else {
        toast.success(message || "Login successful!");
        // Navigation will be handled by the user effect above
      }
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

  // Password reset handler
  const handleForgottenPassword = async (data: ResetData): Promise<void> => {
    const errors = validateEmail(data);

    if (errors && Object.keys(errors).length > 0) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const forgottenPassword = await api("POST", "/auth/forgotpassword", {
        email: data.email,
      });
      if (!forgottenPassword) {
        toast.error(error || "Failed to send reset email.");
      } else {
        toast.success(message || "Reset instructions sent to your email.");
      }
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
    handleUserLogin,
    handleForgottenPassword,
  };
};
