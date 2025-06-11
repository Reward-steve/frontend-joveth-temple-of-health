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
  const { api } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
  } = useForm<ResetPasswordForm>();

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match." });
      return;
    }

    try {
      setIsLoading(true);
      const res = await api("POST", `auth/reset-password/${token}`, {
        password: data.password,
      });

      if (!res || res.status !== "success") {
        toast.error(res?.message || "Something went wrong.");
        return;
      }

      toast.success(
        res?.message || "Password reset successful! You can now log in."
      );
      reset(); // Clear form
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    register: {
      password: register("password", {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      }),
      confirmPassword: register("confirmPassword", {
        required: "Please confirm your password",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
        validate: (value) =>
          value === watch("password") || "Passwords do not match.",
      }),
    },
    handleSubmit,
    errors,
    onSubmit,
    reset,
  };
}
