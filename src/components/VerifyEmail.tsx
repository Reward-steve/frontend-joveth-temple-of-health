import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { toast } from "react-toastify";
import { BsShieldFillX } from "react-icons/bs";
import { RiLoader2Line } from "react-icons/ri";
import { MdVerifiedUser } from "react-icons/md";

export default function VerifyEmail() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { api, message, error } = useApi();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  useEffect(() => {
    const token = searchParams.get("token");

    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      const response = await api("GET", `/auth/verify-email/${token}`);

      if (response) {
        setStatus("success");
        setTimeout(() => navigate("/auth/login"), 20000);
      } else {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams, navigate, api, message]);

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-[#1e3a5f]">
      <div className="max-w-md w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 text-center">
        {status === "verifying" && (
          <>
            <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-blue-700 font-medium">
              Verifying your email. Please wait...
            </p>
          </>
        )}
        {status === "success" && (
          <>
            <MdVerifiedUser className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-green-700">
              Email Verified!
            </h2>
            <p className="text-green-600 mb-2">
              Your email has been successfully verified.
            </p>
            <p className="text-green-600 flex">
              Redirecting to login...{" "}
              <RiLoader2Line className="animate-spin" size={24} />
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <BsShieldFillX className="text-error text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-red-700">
              Verification Failed
            </h2>
            <p className="text-error mb-2">
              Email verification failed. Please try again or contact support.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
