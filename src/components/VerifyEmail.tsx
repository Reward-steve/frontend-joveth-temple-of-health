import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import StatusCard from "./StatusCard";
import { useApi } from "../hooks/useApi";
import "../styles/VerifyEmail.module.css"; // Add this line for styling

export default function VerifyEmail() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [msg, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { api } = useApi();

  useEffect(() => {
    const token = searchParams.get("token");

    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing.");
        return;
      }

      const response = await api("GET", `/auth/verify-email/${token}`);

      if (response) {
        setStatus("success");
        setMessage("✅ Your email has been successfully verified!");
        setTimeout(() => navigate("/auth/login"), 3000);
      } else {
        setStatus("error");
        setMessage("❌ Email verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [searchParams, navigate, api]);

  return (
    <div className="verify-container">
      <div className="verify-box">
        {status === "verifying" && (
          <div className="verifying">
            <div className="loader"></div>
            <p>Verifying your email. Please wait...</p>
          </div>
        )}

        {status === "success" && (
          <StatusCard
            type="success"
            message={msg}
            onClose={() => {
              setStatus("verifying");
              setMessage("");
            }}
          />
        )}

        {status === "error" && (
          <StatusCard
            type="error"
            message={msg}
            onClose={() => {
              setStatus("verifying");
              setMessage("");
            }}
          />
        )}
      </div>
    </div>
  );
}
