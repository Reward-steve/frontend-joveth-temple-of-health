import { type ForgottenPasswordFormValues } from "./../../types/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils/validateForm";
import { useApi } from "../../hooks/useApi";

export const useForgottenPasswordLogic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, message, error } = useApi();

  useEffect(() => {
    document.title = "Auth | Forgotten-Password";
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  const onSubmit = async (data: ForgottenPasswordFormValues): Promise<void> => {
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
        return;
      }
    } catch (err) {
      console.error("Password Reset Error:", err);
      toast.error("Failed to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onSubmit,
  };
};
