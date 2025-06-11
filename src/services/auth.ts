// services/auth.ts
import apiClient from "../utils/apiClient";

export const verifyAuth = async () => {
  const res = await apiClient.get("/auth/check-auth");
  return res.data.user; // assuming { user: { ... } }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await apiClient.post("/auth/login", credentials);
  return res.data.user;
};

export const logoutUser = async (userId: string) => {
  return await apiClient.post(`/auth/logout/${userId}`);
};
