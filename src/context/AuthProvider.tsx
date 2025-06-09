import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";
import { userType } from "../types/User";
import apiClient from "../utils/apiClient";
import { RiLoader2Fill } from "react-icons/ri";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface AuthContextType {
  user: userType | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const verifyAuthWithProtectedEndpoint = async () => {
    setLoading(true);
    try {
      const { status, data } = await apiClient.get("auth/check-auth");
      if (status === 200 && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error: unknown) {
      const err = error as AxiosError;
      setUser(null);
      setIsAuthenticated(false);
      if (err?.response?.status?.toString().startsWith("4")) {
        navigate("/auth/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", { email, password });

      // if (response.status != 200) {
      //   toast.error("Failed to Login");
      //   console.log("errrir...");
      //   return;
      // }
      console.log(response);

      if (response.status === 200 && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success("Login successfull");
        console.log("🚀 User logged in:", response.data.user.role);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (!user?._id) throw new Error("User ID is missing.");
      await apiClient.post(`/auth/logout/${user._id}`);
    } catch (error) {
      console.warn("Logout request failed:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => await verifyAuthWithProtectedEndpoint())();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <RiLoader2Fill size={50} className="spin text-white" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
