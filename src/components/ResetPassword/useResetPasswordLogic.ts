import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/useApi";
import { type ResetPasswordForm } from "../../types/auth";
export function useResetPasswordLogic() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { api } = useApi();

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
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
    onSubmit,
  };
}
