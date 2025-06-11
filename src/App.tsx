import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContent from "./components/Main/MainContent";
import routerObject from "./components/Admin/AdminData";
import { ApiProvider } from "./context/ApiProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import AuthRoutes from "./routes/Auth";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApiProvider>
          <ThemeProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <AuthRoutes />
            {/* ✅ Protected Routes */}
            <Routes>
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
