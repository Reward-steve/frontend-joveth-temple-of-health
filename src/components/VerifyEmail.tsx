import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import "../styles/VerifyEmail.module.css"; // Add this line for styling
import { toast } from "react-toastify";

export default function VerifyEmail() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { api } = useApi();

  useEffect(() => {
    const token = searchParams.get("token");

    const verifyEmail = async () => {
      if (!token) {
        toast.error("error");
        toast.error("Verification token is missing.");
        return;
      }

      const response = await api("GET", `/auth/verify-email/${token}`);

      if (response) {
        setStatus("success");
        toast.success("✅ Your email has been successfully verified!");
        setTimeout(() => navigate("/auth/login"), 3000);
      } else {
        setStatus("error");
        toast.error("❌ Email verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [searchParams, navigate, api]);

  return (
    <div className="verify-container">
      <div className="verify-box">
        {status === "verifying" && (
          <div className="verifying">
            <div className="loader animte-rotate"></div>
            {status === "verifying" && (
              <p>Verifying your email. Please wait...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
