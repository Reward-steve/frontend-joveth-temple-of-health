import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";
import { userType } from "../types/User";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { verifyAuth, loginUser, logoutUser } from "../services/auth";
import { toast } from "react-toastify";
import { RiLoader2Fill } from "react-icons/ri";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // Checks if user is authenticated
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<userType | null>({
    queryKey: ["authStatus"],
    queryFn: verifyAuth,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Redirect to login if user is not authenticated and not on a special route
  React.useEffect(() => {
    if (
      isError &&
      !["/reset-password", "/verify-email"].includes(location.pathname)
    ) {
      navigate("/auth/login");
    }
  }, [isError, location.pathname, navigate]);

  // Handles user login
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const loggedInUser = await loginUser(credentials);
      queryClient.setQueryData(["authStatus"], loggedInUser);
      toast.success("Login successful");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  // Handles user logout
  const logout = async () => {
    try {
      if (!user?._id) throw new Error("User ID is missing.");
      await logoutUser(user._id);
    } catch (err) {
      console.warn("Logout failed:", err);
    } finally {
      queryClient.setQueryData(["authStatus"], null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading: isLoading,
      }}
    >
      {isLoading ? (
        // Show loading spinner while verifying auth
        <div className="w-full h-screen flex justify-center items-center">
          <RiLoader2Fill size={50} className="animate-spin text-white" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
