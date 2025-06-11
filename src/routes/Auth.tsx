import { Routes, Route } from "react-router-dom";
import { SignUp } from "../pages/register";
import { Login } from "../pages/login/index";
import { VerifyEmail } from "../pages/verify-email/index";
import { ResetPasswordPage } from "../pages/reset-password";
import Logout from "../components/Logout";
import NotFound from "../pages/NotFound";
import Forbidden from "../pages/Forbidden";
import RegistrationSuccess from "../pages/RegistrationSuccessful";
export default function AuthRoutes() {
  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/logout" element={<Logout />} />
      {/*4.. pages */}
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/page-not-found" element={<NotFound />} />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/registration-success" element={<RegistrationSuccess />} />
    </Routes>
  );
}
