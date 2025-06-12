import React from "react";
import { Routes, Route } from "react-router-dom";
import MainContent from "./components/Main/MainContent";
import routerObject from "./components/Admin/AdminData";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import AuthRoutes from "./routes/Auth";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* ✅ Public Routes */}
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
    </>
  );
};

export default App;
