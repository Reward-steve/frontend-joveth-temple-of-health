import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/useApi";

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};
export function useResetPasswordLogic() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { api, message, error } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<ResetPasswordForm>();

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      toast.error(error || "Invalid or missing reset token.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match." });
      return;
    }
    try {
      setIsLoading(true);
      // Replace with your API call:
      const res = await api("PATCH", `auth/reset-password/${token}`, {
        password: data.password,
      });
      if (!res) {
        toast.error(error || "Failed to reset password");
      }
      await new Promise((res) => setTimeout(res, 1200)); // Simulate API
      if (res) {
        toast.success(
          message || "Password reset successful! You can now log in."
        );
        navigate("/auth/login");
      }
    } catch {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, register, handleSubmit, errors, watch, onSubmit };
}
