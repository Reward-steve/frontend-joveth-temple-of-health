import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContent from "./components/Main/MainContent";
import routerObject from "./components/Admin/AdminData";
import { ApiProvider } from "./context/ApiProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { SignUp } from "./pages/register";
import { Login } from "./pages/login/index";
import { VerifyEmail } from "./pages/verify-email/index";
import Logout from "./components/Logout";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import RegistrationSuccess from "./pages/RegistrationSuccessful";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApiProvider>
          <ThemeProvider>
            <Routes>
              {/* ✅ Public Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/auth/logout" element={<Logout />} />

              {/*4.. pages */}
              <Route path="/page-not-found" element={<NotFound />} />
              <Route path="/forbidden" element={<Forbidden />} />
              <Route
                path="/registration-success"
                element={<RegistrationSuccess />}
              />

              {/* ✅ Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/*" element={<MainContent />}>
                  {routerObject.map((route, id) => (
                    <Route
                      key={id}
                      path={route.path}
                      element={<route.element {...route.props} />}
                    />
                  ))}
                </Route>
              </Route>
            </Routes>
          </ThemeProvider>
        </ApiProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
